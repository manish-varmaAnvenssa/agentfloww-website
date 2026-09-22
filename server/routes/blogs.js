const express = require('express');
const path = require('path');
const { body, validationResult } = require('express-validator');
const { getDatabase } = require('../database');

const router = express.Router();

// Helper to generate slug
const slugify = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

// Helper to attach tags & category details to a blog record (Async)
const attachBlogDetails = async (db, blog) => {
  if (!blog) return null;
  
  // Parse gallery images if string
  let galleryImages = [];
  try {
    galleryImages = typeof blog.gallery_images === 'string' ? JSON.parse(blog.gallery_images) : (blog.gallery_images || []);
  } catch (e) {
    galleryImages = [];
  }

  // Get category
  let category = null;
  if (blog.category_id) {
    category = await db.prepare('SELECT id, name, slug, color FROM categories WHERE id = ?').get(blog.category_id);
  }

  // Get tags
  const tags = await db.prepare(`
    SELECT t.id, t.name, t.slug 
    FROM tags t
    JOIN blog_tags bt ON t.id = bt.tag_id
    WHERE bt.blog_id = ?
  `).all(blog.id);

  return {
    ...blog,
    gallery_images: galleryImages,
    category: category || { name: 'General', slug: 'general', color: '#6366F1' },
    tags: tags || []
  };
};

// Helper to calculate estimated read time if not provided
const calculateReadTime = (content) => {
  if (!content) return 3;
  const plainText = content.replace(/<[^>]+>/g, ' ');
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = 200;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
};

// GET featured blogs (Public - Top 3 featured or latest published)
router.get('/featured', async (req, res) => {
  try {
    const db = getDatabase();
    const rows = await db.prepare(`
      SELECT * FROM blogs 
      WHERE status = 'published'
      ORDER BY is_featured DESC, created_at DESC 
      LIMIT 3
    `).all();

    const result = await Promise.all(rows.map(blog => attachBlogDetails(db, blog)));
    res.json(result);
  } catch (error) {
    console.error('Error fetching featured blogs:', error);
    res.status(500).json({ message: 'Failed to fetch featured blogs' });
  }
});

// GET all published blogs (Public - with pagination, search, category, tag, sorting)
router.get('/', async (req, res) => {
  try {
    const db = getDatabase();
    const { 
      page = 1, 
      limit = 9, 
      category, 
      tag, 
      search, 
      sort = 'newest',
      featured 
    } = req.query;

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 9;
    const offset = (pageNum - 1) * limitNum;

    let whereClause = ["b.status = 'published'"];
    let params = [];

    if (category) {
      if (!isNaN(category)) {
        whereClause.push('b.category_id = ?');
        params.push(parseInt(category, 10));
      } else {
        const catObj = await db.prepare('SELECT id FROM categories WHERE slug = ?').get(category);
        if (catObj) {
          whereClause.push('b.category_id = ?');
          params.push(catObj.id);
        } else {
          // Non-existent category filter
          return res.json({ blogs: [], totalPages: 0, currentPage: pageNum, total: 0 });
        }
      }
    }

    if (tag) {
      if (!isNaN(tag)) {
        whereClause.push(`b.id IN (SELECT blog_id FROM blog_tags WHERE tag_id = ?)`);
        params.push(parseInt(tag, 10));
      } else {
        const tagObj = await db.prepare('SELECT id FROM tags WHERE slug = ?').get(tag);
        if (tagObj) {
          whereClause.push(`b.id IN (SELECT blog_id FROM blog_tags WHERE tag_id = ?)`);
          params.push(tagObj.id);
        } else {
          return res.json({ blogs: [], totalPages: 0, currentPage: pageNum, total: 0 });
        }
      }
    }

    if (featured === 'true' || featured === '1') {
      whereClause.push('b.is_featured = 1');
    }

    if (search && search.trim() !== '') {
      const searchTerm = `%${search.trim()}%`;
      whereClause.push(`(
        b.title LIKE ? OR 
        b.excerpt LIKE ? OR 
        b.content LIKE ? OR 
        b.id IN (
          SELECT bt.blog_id FROM blog_tags bt 
          JOIN tags t ON bt.tag_id = t.id 
          WHERE t.name LIKE ? OR t.slug LIKE ?
        )
      )`);
      params.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
    }

    let orderBy = 'b.created_at DESC';
    if (sort === 'oldest') {
      orderBy = 'b.created_at ASC';
    } else if (sort === 'most_viewed') {
      orderBy = 'b.views DESC, b.created_at DESC';
    } else if (sort === 'recently_updated') {
      orderBy = 'b.updated_at DESC';
    } else if (sort === 'newest') {
      orderBy = 'b.created_at DESC';
    }

    const whereString = whereClause.length ? `WHERE ${whereClause.join(' AND ')}` : '';

    // Count total matches
    const countSql = `SELECT COUNT(DISTINCT b.id) as total FROM blogs b ${whereString}`;
    const totalCountRow = await db.prepare(countSql).get(params);
    const totalCount = totalCountRow ? Number(totalCountRow.total) : 0;

    // Fetch pagination items
    const querySql = `
      SELECT DISTINCT b.* 
      FROM blogs b 
      ${whereString} 
      ORDER BY ${orderBy} 
      LIMIT ? OFFSET ?
    `;

    const blogsRaw = await db.prepare(querySql).all([...params, limitNum, offset]);
    const blogs = await Promise.all(blogsRaw.map(b => attachBlogDetails(db, b)));

    res.json({
      blogs,
      totalPages: Math.ceil(totalCount / limitNum) || 1,
      currentPage: pageNum,
      total: totalCount
    });

  } catch (error) {
    console.error('Error listing public blogs:', error);
    res.status(500).json({ message: 'Failed to fetch blogs' });
  }
});

// GET admin blog list (All statuses - for admin panel dashboard table)
router.get('/admin/all', async (req, res) => {
  try {
    const db = getDatabase();
    const { page = 1, limit = 50, status, category, search } = req.query;

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 50;
    const offset = (pageNum - 1) * limitNum;

    let whereClause = [];
    let params = [];

    if (status && status !== 'all') {
      whereClause.push('b.status = ?');
      params.push(status);
    }

    if (category && category !== 'all') {
      whereClause.push('b.category_id = ?');
      params.push(parseInt(category, 10));
    }

    if (search && search.trim() !== '') {
      const searchTerm = `%${search.trim()}%`;
      whereClause.push('(b.title LIKE ? OR b.excerpt LIKE ?)');
      params.push(searchTerm, searchTerm);
    }

    const whereString = whereClause.length ? `WHERE ${whereClause.join(' AND ')}` : '';

    const countSql = `SELECT COUNT(*) as total FROM blogs b ${whereString}`;
    const totalCountRow = await db.prepare(countSql).get(params);
    const totalCount = totalCountRow ? Number(totalCountRow.total) : 0;

    const querySql = `
      SELECT b.* 
      FROM blogs b 
      ${whereString} 
      ORDER BY b.created_at DESC 
      LIMIT ? OFFSET ?
    `;

    const blogsRaw = await db.prepare(querySql).all([...params, limitNum, offset]);
    const blogs = await Promise.all(blogsRaw.map(b => attachBlogDetails(db, b)));

    res.json({
      blogs,
      totalPages: Math.ceil(totalCount / limitNum) || 1,
      currentPage: pageNum,
      total: totalCount
    });
  } catch (error) {
    console.error('Error listing admin blogs:', error);
    res.status(500).json({ message: 'Failed to fetch admin blogs' });
  }
});

// GET single blog by slug (Public)
router.get('/:slug', async (req, res) => {
  try {
    const db = getDatabase();
    const { slug } = req.params;

    const rawBlog = await db.prepare('SELECT * FROM blogs WHERE slug = ?').get(slug);

    if (!rawBlog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Increment views
    await db.prepare('UPDATE blogs SET views = views + 1 WHERE id = ?').run(rawBlog.id);
    rawBlog.views += 1;

    const blog = await attachBlogDetails(db, rawBlog);
    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog detail:', error);
    res.status(500).json({ message: 'Failed to fetch blog post' });
  }
});

// GET related articles for a given post (3 articles)
router.get('/:slug/related', async (req, res) => {
  try {
    const db = getDatabase();
    const { slug } = req.params;

    const currentBlog = await db.prepare('SELECT id, category_id FROM blogs WHERE slug = ?').get(slug);
    if (!currentBlog) {
      return res.json([]);
    }

    let related = [];
    if (currentBlog.category_id) {
      related = await db.prepare(`
        SELECT * FROM blogs 
        WHERE status = 'published' AND id != ? AND category_id = ? 
        ORDER BY created_at DESC 
        LIMIT 3
      `).all(currentBlog.id, currentBlog.category_id);
    }

    // Fallback if less than 3 articles in same category
    if (related.length < 3) {
      const excludeIds = [currentBlog.id, ...related.map(r => r.id)];
      const placeholders = excludeIds.map(() => '?').join(',');
      const needed = 3 - related.length;

      const fallback = await db.prepare(`
        SELECT * FROM blogs 
        WHERE status = 'published' AND id NOT IN (${placeholders})
        ORDER BY created_at DESC 
        LIMIT ${needed}
      `).all(...excludeIds);

      related = [...related, ...fallback];
    }

    const result = await Promise.all(related.map(b => attachBlogDetails(db, b)));
    res.json(result);
  } catch (error) {
    console.error('Error fetching related blogs:', error);
    res.status(500).json({ message: 'Failed to fetch related blogs' });
  }
});

// POST create blog post
router.post('/', [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const db = getDatabase();

    const {
      title,
      excerpt = '',
      content,
      featured_image = '',
      gallery_images = [],
      category_id = null,
      category_name,
      tags = [],
      author_name = 'AgentFlow AI',
      status = 'published',
      publish_date,
      read_time,
      is_featured = 0,
      seo_title = '',
      seo_description = '',
      seo_keywords = '',
      canonical_url = '',
      og_image = ''
    } = req.body;

    let finalSlug = req.body.slug ? slugify(req.body.slug) : slugify(title);
    
    // Ensure slug uniqueness
    const existingSlug = await db.prepare('SELECT id FROM blogs WHERE slug = ?').get(finalSlug);
    if (existingSlug) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    // Resolve category if string provided
    let finalCategoryId = category_id;
    if (!finalCategoryId && category_name) {
      const catSlug = slugify(category_name);
      let cat = await db.prepare('SELECT id FROM categories WHERE slug = ?').get(catSlug);
      if (!cat) {
        const catRes = await db.prepare('INSERT INTO categories (name, slug) VALUES (?, ?)').run(category_name, catSlug);
        finalCategoryId = catRes.lastInsertRowid;
      } else {
        finalCategoryId = cat.id;
      }
    }

    const computedReadTime = read_time || calculateReadTime(content);
    const computedExcerpt = excerpt || content.replace(/<[^>]+>/g, ' ').slice(0, 160) + '...';
    const computedPublishDate = publish_date || new Date().toISOString();

    const stmt = db.prepare(`
      INSERT INTO blogs (
        title, slug, excerpt, content, featured_image, gallery_images,
        category_id, author_name, status, publish_date, read_time,
        is_featured, seo_title, seo_description, seo_keywords,
        canonical_url, og_image
      ) VALUES (
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?
      )
    `);

    const result = await stmt.run(
      title,
      finalSlug,
      computedExcerpt,
      content,
      featured_image,
      JSON.stringify(gallery_images),
      finalCategoryId,
      author_name,
      status,
      computedPublishDate,
      computedReadTime,
      is_featured ? 1 : 0,
      seo_title || title,
      seo_description || computedExcerpt,
      seo_keywords || '',
      canonical_url || '',
      og_image || featured_image
    );

    const blogId = result.lastInsertRowid;

    // Process Tags
    if (Array.isArray(tags) && tags.length > 0) {
      for (const tagItem of tags) {
        let tagId;
        if (typeof tagItem === 'number' || !isNaN(tagItem)) {
          tagId = parseInt(tagItem, 10);
        } else if (typeof tagItem === 'string') {
          const tSlug = slugify(tagItem);
          let tagObj = await db.prepare('SELECT id FROM tags WHERE slug = ?').get(tSlug);
          if (!tagObj) {
            const tagRes = await db.prepare('INSERT INTO tags (name, slug) VALUES (?, ?)').run(tagItem.trim(), tSlug);
            tagId = tagRes.lastInsertRowid;
          } else {
            tagId = tagObj.id;
          }
        }

        if (tagId) {
          await db.prepare('INSERT IGNORE INTO blog_tags (blog_id, tag_id) VALUES (?, ?)').run(blogId, tagId);
        }
      }
    }

    const createdBlog = await db.prepare('SELECT * FROM blogs WHERE id = ?').get(blogId);
    res.status(201).json(await attachBlogDetails(db, createdBlog));
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Failed to create blog post' });
  }
});

// PUT update blog post
router.put('/:id', [
  body('title').trim().notEmpty().withMessage('Title is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const db = getDatabase();

    const existing = await db.prepare('SELECT * FROM blogs WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const {
      title,
      slug,
      excerpt,
      content,
      featured_image,
      gallery_images,
      category_id,
      author_name,
      status,
      publish_date,
      read_time,
      is_featured,
      seo_title,
      seo_description,
      seo_keywords,
      canonical_url,
      og_image,
      tags
    } = req.body;

    let finalSlug = slug ? slugify(slug) : slugify(title);
    // Check duplicate slug
    const duplicate = await db.prepare('SELECT id FROM blogs WHERE slug = ? AND id != ?').get(finalSlug, id);
    if (duplicate) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    const computedReadTime = read_time !== undefined ? read_time : calculateReadTime(content || existing.content);

    const stmt = db.prepare(`
      UPDATE blogs SET
        title = ?,
        slug = ?,
        excerpt = ?,
        content = ?,
        featured_image = ?,
        gallery_images = ?,
        category_id = ?,
        author_name = ?,
        status = ?,
        publish_date = ?,
        read_time = ?,
        is_featured = ?,
        seo_title = ?,
        seo_description = ?,
        seo_keywords = ?,
        canonical_url = ?,
        og_image = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    await stmt.run(
      title,
      finalSlug,
      excerpt !== undefined ? excerpt : existing.excerpt,
      content !== undefined ? content : existing.content,
      featured_image !== undefined ? featured_image : existing.featured_image,
      gallery_images !== undefined ? JSON.stringify(gallery_images) : existing.gallery_images,
      category_id !== undefined ? category_id : existing.category_id,
      author_name !== undefined ? author_name : existing.author_name,
      status !== undefined ? status : existing.status,
      publish_date !== undefined ? publish_date : existing.publish_date,
      computedReadTime,
      is_featured !== undefined ? (is_featured ? 1 : 0) : existing.is_featured,
      seo_title !== undefined ? seo_title : existing.seo_title,
      seo_description !== undefined ? seo_description : existing.seo_description,
      seo_keywords !== undefined ? seo_keywords : existing.seo_keywords,
      canonical_url !== undefined ? canonical_url : existing.canonical_url,
      og_image !== undefined ? og_image : existing.og_image,
      id
    );

    // Update tags if passed
    if (Array.isArray(tags)) {
      await db.prepare('DELETE FROM blog_tags WHERE blog_id = ?').run(id);

      for (const tagItem of tags) {
        let tagId;
        if (typeof tagItem === 'number' || !isNaN(tagItem)) {
          tagId = parseInt(tagItem, 10);
        } else if (typeof tagItem === 'string') {
          const tSlug = slugify(tagItem);
          let tagObj = await db.prepare('SELECT id FROM tags WHERE slug = ?').get(tSlug);
          if (!tagObj) {
            const tagRes = await db.prepare('INSERT INTO tags (name, slug) VALUES (?, ?)').run(tagItem.trim(), tSlug);
            tagId = tagRes.lastInsertRowid;
          } else {
            tagId = tagObj.id;
          }
        }

        if (tagId) {
          await db.prepare('INSERT IGNORE INTO blog_tags (blog_id, tag_id) VALUES (?, ?)').run(id, tagId);
        }
      }
    }

    const updatedBlog = await db.prepare('SELECT * FROM blogs WHERE id = ?').get(id);
    res.json(await attachBlogDetails(db, updatedBlog));
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Failed to update blog post' });
  }
});

// DELETE single blog post
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();

    const existing = await db.prepare('SELECT id FROM blogs WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    await db.prepare('DELETE FROM blogs WHERE id = ?').run(id);
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Failed to delete blog post' });
  }
});

// POST duplicate blog post
router.post('/:id/duplicate', async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();

    const original = await db.prepare('SELECT * FROM blogs WHERE id = ?').get(id);
    if (!original) {
      return res.status(404).json({ message: 'Original blog post not found' });
    }

    const newTitle = `Copy of ${original.title}`;
    const newSlug = slugify(`${original.slug}-copy-${Date.now().toString().slice(-4)}`);

    const stmt = db.prepare(`
      INSERT INTO blogs (
        title, slug, excerpt, content, featured_image, gallery_images,
        category_id, author_name, status, publish_date, read_time,
        is_featured, seo_title, seo_description, seo_keywords,
        canonical_url, og_image
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'draft', CURRENT_TIMESTAMP, ?, 0, ?, ?, ?, ?, ?)
    `);

    const result = await stmt.run(
      newTitle,
      newSlug,
      original.excerpt,
      original.content,
      original.featured_image,
      original.gallery_images,
      original.category_id,
      original.author_name,
      original.read_time,
      newTitle,
      original.seo_description,
      original.seo_keywords,
      original.canonical_url,
      original.og_image
    );

    const newId = result.lastInsertRowid;

    // Copy tags
    const origTags = await db.prepare('SELECT tag_id FROM blog_tags WHERE blog_id = ?').all(id);
    for (const t of origTags) {
      await db.prepare('INSERT INTO blog_tags (blog_id, tag_id) VALUES (?, ?)').run(newId, t.tag_id);
    }

    const newBlog = await db.prepare('SELECT * FROM blogs WHERE id = ?').get(newId);
    res.status(201).json(await attachBlogDetails(db, newBlog));
  } catch (error) {
    console.error('Error duplicating blog:', error);
    res.status(500).json({ message: 'Failed to duplicate blog post' });
  }
});

// PATCH toggle status (published/draft)
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['published', 'draft', 'scheduled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const db = getDatabase();
    const existing = await db.prepare('SELECT id FROM blogs WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    await db.prepare('UPDATE blogs SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(status, id);
    const updated = await db.prepare('SELECT * FROM blogs WHERE id = ?').get(id);

    res.json(await attachBlogDetails(db, updated));
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Failed to update status' });
  }
});

// POST bulk action (bulk delete / publish / unpublish)
router.post('/bulk-action', async (req, res) => {
  try {
    const { action, ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'No blog IDs provided' });
    }

    const db = getDatabase();
    const placeholders = ids.map(() => '?').join(',');

    if (action === 'delete') {
      await db.prepare(`DELETE FROM blogs WHERE id IN (${placeholders})`).run(...ids);
      res.json({ message: `Successfully deleted ${ids.length} posts` });
    } else if (action === 'publish') {
      await db.prepare(`UPDATE blogs SET status = 'published', updated_at = CURRENT_TIMESTAMP WHERE id IN (${placeholders})`).run(...ids);
      res.json({ message: `Successfully published ${ids.length} posts` });
    } else if (action === 'unpublish') {
      await db.prepare(`UPDATE blogs SET status = 'draft', updated_at = CURRENT_TIMESTAMP WHERE id IN (${placeholders})`).run(...ids);
      res.json({ message: `Successfully converted ${ids.length} posts to draft` });
    } else {
      res.status(400).json({ message: 'Invalid bulk action' });
    }
  } catch (error) {
    console.error('Error processing bulk action:', error);
    res.status(500).json({ message: 'Failed to process bulk action' });
  }
});

// Configure Multer storage
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Dynamically resolve uploads directory to permanent public_html/uploads in production
    const currentPath = __dirname;
    let uploadDir;
    if (currentPath.includes('.builds')) {
      const basePath = currentPath.substring(0, currentPath.indexOf('.builds'));
      uploadDir = path.join(basePath, 'public_html', 'uploads');
    } else {
      uploadDir = path.join(__dirname, '..', 'public', 'uploads');
    }
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images (jpg, jpeg, png, webp, gif) are allowed!'));
  }
});

// POST /api/blogs/upload - Local server upload handler
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ success: true, url: fileUrl });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;