const express = require('express');
const { body, validationResult } = require('express-validator');
const Blog = require('../models/Blog');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all published blogs (public)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 50, category, tag, search } = req.query;
    
    let query = { status: 'published' };
    
    if (category) {
      query.category = category;
    }
    
    if (tag) {
      query.tags = { $in: [tag] };
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    const blogs = await Blog.find(query)
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const total = await Blog.countDocuments(query);
    
    res.json({
      blogs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single blog by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, status: 'published' })
      .populate('author', 'username');
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    // Increment views
    blog.views += 1;
    await blog.save();
    
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create blog (admin, blogger)
router.post('/', [
  auth,
  authorize('admin', 'blogger'),
  body('title').notEmpty().withMessage('Title is required'),
  body('excerpt').notEmpty().withMessage('Excerpt is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('featuredImage').notEmpty().withMessage('Featured image is required'),
  body('category').isIn(['Technology', 'Business', 'Design', 'Marketing', 'General']).withMessage('Invalid category')
], async (req, res) => {
  try {
    console.log('=== BLOG CREATION START ===');
    console.log('Received blog data:', JSON.stringify(req.body, null, 2));
    console.log('User ID:', req.user._id);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const blogData = {
      title: req.body.title,
      excerpt: req.body.excerpt,
      content: req.body.content,
      featuredImage: req.body.featuredImage,
      category: req.body.category,
      tags: req.body.tags || [],
      status: req.body.status || 'draft',
      author: req.user._id
    };

    console.log('Creating blog with data:', JSON.stringify(blogData, null, 2));

    const blog = new Blog(blogData);
    console.log('Blog object before save:', {
      title: blog.title,
      slug: blog.slug,
      status: blog.status,
      author: blog.author
    });
    
    console.log('About to save blog...');
    await blog.save();
    console.log('Blog saved successfully!');
    console.log('Blog object after save:', {
      _id: blog._id,
      title: blog.title,
      slug: blog.slug,
      status: blog.status,
      author: blog.author
    });
    
    const populatedBlog = await blog.populate('author', 'username');
    console.log('Blog created successfully:', populatedBlog._id);
    console.log('=== BLOG CREATION END ===');
    res.status(201).json(populatedBlog);
  } catch (error) {
    console.error('=== BLOG CREATION ERROR ===');
    console.error('Blog creation error:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    if (error.errors) {
      console.error('Validation errors:', error.errors);
    }
    console.error('=== END ERROR ===');
    res.status(500).json({ message: 'Server error', details: error.message });
  }
});

// Update blog (admin, blogger - own posts)
router.put('/:id', [
  auth,
  authorize('admin', 'blogger')
], async (req, res) => {
  try {
    console.log('=== BLOG UPDATE START ===');
    console.log('Blog ID:', req.params.id);
    console.log('User ID:', req.user._id);
    console.log('User Role:', req.user.role);
    console.log('Update data:', JSON.stringify(req.body, null, 2));
    
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      console.log('Blog not found with ID:', req.params.id);
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    console.log('Found blog:', {
      id: blog._id,
      title: blog.title,
      author: blog.author,
      status: blog.status
    });
    
    // Check if user can edit this blog
    if (req.user.role !== 'admin' && blog.author.toString() !== req.user._id.toString()) {
      console.log('Authorization failed - User role:', req.user.role, 'Blog author:', blog.author.toString(), 'User ID:', req.user._id.toString());
      return res.status(403).json({ message: 'Not authorized to edit this blog' });
    }

    console.log('Authorization passed, updating blog...');
    
    // Update only the fields that are provided
    const updateData = {};
    if (req.body.title) updateData.title = req.body.title;
    if (req.body.excerpt) updateData.excerpt = req.body.excerpt;
    if (req.body.content) updateData.content = req.body.content;
    if (req.body.featuredImage) updateData.featuredImage = req.body.featuredImage;
    if (req.body.category) updateData.category = req.body.category;
    if (req.body.status) updateData.status = req.body.status;
    if (req.body.tags) updateData.tags = req.body.tags;
    
    console.log('Filtered update data:', updateData);
    
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('author', 'username');

    console.log('Blog updated successfully:', updatedBlog._id);
    console.log('=== BLOG UPDATE END ===');
    res.json(updatedBlog);
  } catch (error) {
    console.error('=== BLOG UPDATE ERROR ===');
    console.error('Blog update error:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    if (error.errors) {
      console.error('Validation errors:', error.errors);
    }
    console.error('=== END UPDATE ERROR ===');
    res.status(500).json({ message: 'Server error', details: error.message });
  }
});

// Delete blog (admin, blogger - own posts)
router.delete('/:id', [auth, authorize('admin', 'blogger')], async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    // Check if user can delete this blog
    if (req.user.role !== 'admin' && blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this blog' });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Test authentication endpoint
router.get('/test-auth', [auth], async (req, res) => {
  try {
    res.json({ 
      message: 'Authentication successful',
      user: {
        id: req.user._id,
        username: req.user.username,
        role: req.user.role
      }
    });
  } catch (error) {
    console.error('Auth test error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all blogs (admin only - for management)
router.get('/admin/all', [auth, authorize('admin')], async (req, res) => {
  try {
    console.log('=== ADMIN BLOGS REQUEST ===');
    console.log('User:', req.user.username, 'Role:', req.user.role);
    console.log('Query params:', req.query);
    
    const { page = 1, limit = 50, status } = req.query;
    
    let query = {};
    if (status) {
      query.status = status;
    }
    
    console.log('MongoDB query:', query);
    
    const blogs = await Blog.find(query)
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const total = await Blog.countDocuments(query);
    
    console.log('Found blogs:', blogs.length);
    console.log('Total blogs:', total);
    console.log('Blogs:', blogs.map(b => ({ id: b._id, title: b.title, status: b.status })));
    console.log('=== END ADMIN BLOGS REQUEST ===');
    
    res.json({
      blogs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Admin blogs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 