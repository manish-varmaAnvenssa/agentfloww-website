const express = require('express');
const { body, validationResult } = require('express-validator');
const { getDatabase } = require('../database');

const router = express.Router();

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

// GET all tags
router.get('/', async (req, res) => {
  try {
    const db = getDatabase();
    const tags = await db.prepare(`
      SELECT t.*, 
        (SELECT COUNT(*) FROM blog_tags bt WHERE bt.tag_id = t.id) as post_count
      FROM tags t
      ORDER BY t.name ASC
    `).all();

    res.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ message: 'Failed to fetch tags' });
  }
});

// POST create tag
router.post('/', [
  body('name').trim().notEmpty().withMessage('Tag name is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    const slug = req.body.slug ? slugify(req.body.slug) : slugify(name);

    const db = getDatabase();

    const existing = await db.prepare('SELECT id FROM tags WHERE slug = ? OR name = ?').get(slug, name);
    if (existing) {
      return res.status(400).json({ message: 'Tag with this name or slug already exists' });
    }

    const stmt = db.prepare('INSERT INTO tags (name, slug) VALUES (?, ?)');
    const result = await stmt.run(name, slug);

    const newTag = await db.prepare('SELECT * FROM tags WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newTag);
  } catch (error) {
    console.error('Error creating tag:', error);
    res.status(500).json({ message: 'Failed to create tag' });
  }
});

// PUT update tag
router.put('/:id', [
  body('name').trim().notEmpty().withMessage('Tag name is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name } = req.body;
    const slug = req.body.slug ? slugify(req.body.slug) : slugify(name);

    const db = getDatabase();

    const existing = await db.prepare('SELECT id FROM tags WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    const duplicate = await db.prepare('SELECT id FROM tags WHERE slug = ? AND id != ?').get(slug, id);
    if (duplicate) {
      return res.status(400).json({ message: 'Tag slug already in use' });
    }

    await db.prepare('UPDATE tags SET name = ?, slug = ? WHERE id = ?').run(name, slug, id);
    const updated = await db.prepare('SELECT * FROM tags WHERE id = ?').get(id);

    res.json(updated);
  } catch (error) {
    console.error('Error updating tag:', error);
    res.status(500).json({ message: 'Failed to update tag' });
  }
});

// DELETE tag
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();

    const existing = await db.prepare('SELECT id FROM tags WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    await db.prepare('DELETE FROM tags WHERE id = ?').run(id);

    res.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    console.error('Error deleting tag:', error);
    res.status(500).json({ message: 'Failed to delete tag' });
  }
});

module.exports = router;
