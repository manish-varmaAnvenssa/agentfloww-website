const express = require('express');
const { body, validationResult } = require('express-validator');
const { getDatabase } = require('../database');

const router = express.Router();

// Submit demo request
router.post('/', [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('company').optional().trim().isLength({ max: 100 }).withMessage('Company name too long'),
  body('phone').trim().isLength({ min: 1, max: 20 }).withMessage('Phone number is required and must be less than 20 characters'),
  body('industry').trim().isLength({ min: 1, max: 100 }).withMessage('Industry is required and must be less than 100 characters'),
  body('use_case').optional().trim().isLength({ max: 500 }).withMessage('Use case description too long'),
  body('preferred_date').optional().isISO8601().withMessage('Please enter a valid date'),
  body('preferred_time').optional().trim().isLength({ max: 20 }).withMessage('Preferred time too long')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const { 
      name, 
      email, 
      company, 
      phone, 
      industry, 
      use_case, 
      preferred_date, 
      preferred_time 
    } = req.body;
    
    console.log('Received demo form data:', { name, email, company, phone, industry, use_case, preferred_date, preferred_time });
    
    const db = getDatabase();

    // Insert demo request
    const insertDemo = db.prepare(`
      INSERT INTO demos (name, email, company, phone, industry, use_case, preferred_date, preferred_time, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = insertDemo.run(
      name, 
      email, 
      company || null, 
      phone, 
      industry, 
      use_case || null, 
      preferred_date || null, 
      preferred_time || null, 
      'pending'
    );

    console.log('Demo inserted with ID:', result.lastInsertRowid);

    // Get the created demo request
    const newDemo = db.prepare('SELECT * FROM demos WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json({ 
      message: 'Demo request submitted successfully',
      demo: newDemo
    });

  } catch (error) {
    console.error('Demo submission error:', error);
    res.status(500).json({ message: 'Failed to submit demo request' });
  }
});

// Get all demo requests (admin only)
router.get('/', async (req, res) => {
  try {
    const db = getDatabase();
    
    const demos = db.prepare(`
      SELECT * FROM demos 
      ORDER BY created_at DESC
    `).all();

    res.json({ demos });

  } catch (error) {
    console.error('Get demos error:', error);
    res.status(500).json({ message: 'Failed to fetch demo requests' });
  }
});

// Get demo by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();
    
    const demo = db.prepare('SELECT * FROM demos WHERE id = ?').get(id);
    
    if (!demo) {
      return res.status(404).json({ message: 'Demo request not found' });
    }

    res.json({ demo });

  } catch (error) {
    console.error('Get demo error:', error);
    res.status(500).json({ message: 'Failed to fetch demo request' });
  }
});

// Update demo status
router.patch('/:id/status', [
  body('status').isIn(['pending', 'confirmed', 'completed', 'cancelled']).withMessage('Invalid status'),
  body('notes').optional().trim().isLength({ max: 1000 }).withMessage('Notes too long')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { status, notes } = req.body;
    const db = getDatabase();

    // Update demo status and notes
    const updateDemo = db.prepare(`
      UPDATE demos 
      SET status = ?, notes = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `);
    
    const result = updateDemo.run(status, notes || null, id);

    if (result.changes === 0) {
      return res.status(404).json({ message: 'Demo request not found' });
    }

    // Get updated demo
    const updatedDemo = db.prepare('SELECT * FROM demos WHERE id = ?').get(id);

    res.json({ 
      message: 'Demo request updated successfully',
      demo: updatedDemo
    });

  } catch (error) {
    console.error('Update demo error:', error);
    res.status(500).json({ message: 'Failed to update demo request' });
  }
});

// Delete demo request
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();

    const deleteDemo = db.prepare('DELETE FROM demos WHERE id = ?');
    const result = deleteDemo.run(id);

    if (result.changes === 0) {
      return res.status(404).json({ message: 'Demo request not found' });
    }

    res.json({ message: 'Demo request deleted successfully' });

  } catch (error) {
    console.error('Delete demo error:', error);
    res.status(500).json({ message: 'Failed to delete demo request' });
  }
});

module.exports = router; 