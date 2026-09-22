const express = require('express');
const { body, validationResult } = require('express-validator');
const { getDatabase } = require('../database');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Helper to generate slug
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

// GET all categories
router.get('/', async (req, res) => {
  try {
    const db = getDatabase();
    const categories = await db.prepare(`
      SELECT c.*, 
        (SELECT COUNT(*) FROM blogs b WHERE b.category_id = c.id AND b.status = 'published') as post_count
      FROM categories c
      ORDER BY c.name ASC
    `).all();

    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
});

// GET single category by slug or ID
router.get('/:identifier', async (req, res) => {
  try {
    const db = getDatabase();
    const { identifier } = req.params;
    
    let category;
    if (!isNaN(identifier)) {
      category = await db.prepare('SELECT * FROM categories WHERE id = ?').get(identifier);
    } else {
      category = await db.prepare('SELECT * FROM categories WHERE slug = ?').get(identifier);
    }

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ message: 'Failed to fetch category' });
  }
});

// POST create category (Protected / Admin)
router.post('/', [
  body('name').trim().notEmpty().withMessage('Category name is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description = '', color = '#6366F1' } = req.body;
    const slug = req.body.slug ? slugify(req.body.slug) : slugify(name);

    const db = getDatabase();

    // Check if slug or name exists
    const existing = await db.prepare('SELECT id FROM categories WHERE slug = ? OR name = ?').get(slug, name);
    if (existing) {
      return res.status(400).json({ message: 'Category with this name or slug already exists' });
    }

    const stmt = db.prepare(`
      INSERT INTO categories (name, slug, description, color)
      VALUES (?, ?, ?, ?)
    `);

    const result = await stmt.run(name, slug, description, color);
    const newCategory = await db.prepare('SELECT * FROM categories WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Failed to create category' });
  }
});

// PUT update category
router.put('/:id', [
  body('name').trim().notEmpty().withMessage('Category name is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, description, color } = req.body;
    const slug = req.body.slug ? slugify(req.body.slug) : slugify(name);

    const db = getDatabase();

    const existing = await db.prepare('SELECT id FROM categories WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check duplicate slug
    const duplicate = await db.prepare('SELECT id FROM categories WHERE slug = ? AND id != ?').get(slug, id);
    if (duplicate) {
      return res.status(400).json({ message: 'Category slug already in use by another category' });
    }

    const stmt = db.prepare(`
      UPDATE categories 
      SET name = ?, slug = ?, description = ?, color = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    await stmt.run(name, slug, description || '', color || '#6366F1', id);
    const updated = await db.prepare('SELECT * FROM categories WHERE id = ?').get(id);

    res.json(updated);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Failed to update category' });
  }
});

// DELETE category
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();

    const existing = await db.prepare('SELECT id FROM categories WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await db.prepare('DELETE FROM categories WHERE id = ?').run(id);

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Failed to delete category' });
  }
});

module.exports = router;
