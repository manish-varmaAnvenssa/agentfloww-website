const express = require('express');
const { body, validationResult } = require('express-validator');
const { getDatabase } = require('../database');

const router = express.Router();

// Submit contact form
router.post('/', [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('phone').trim().isLength({ min: 1, max: 20 }).withMessage('Phone number is required and must be less than 20 characters'),
  body('company').trim().isLength({ min: 1, max: 100 }).withMessage('Company name is required and must be less than 100 characters'),
  body('message').trim().isLength({ min: 1, max: 1000 }).withMessage('Message cannot be empty and must be less than 1000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      console.log('Request body:', req.body);
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const { name, email, phone, company, message } = req.body;
    console.log('Received contact form data:', { name, email, phone, company, message });
    
    const db = getDatabase();

    // Insert contact submission
    const insertContact = db.prepare(`
      INSERT INTO contacts (name, email, phone, company, message, status) 
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    const result = insertContact.run(name, email, phone, company, message, 'new');
    console.log('Contact inserted with ID:', result.lastInsertRowid);

    // Get the created contact
    const newContact = db.prepare('SELECT * FROM contacts WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json({
      message: 'Contact form submitted successfully',
      contact: newContact
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ message: 'Failed to submit contact form' });
  }
});

// Get all contacts (admin only)
router.get('/', async (req, res) => {
  try {
    const db = getDatabase();
    
    const contacts = db.prepare(`
      SELECT * FROM contacts 
      ORDER BY created_at DESC
    `).all();

    res.json({ contacts });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ message: 'Failed to fetch contacts' });
  }
});

// Get contact by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();
    
    const contact = db.prepare('SELECT * FROM contacts WHERE id = ?').get(id);
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json({ contact });

  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({ message: 'Failed to fetch contact' });
  }
});

// Update contact status
router.patch('/:id/status', [
  body('status').isIn(['new', 'read', 'replied', 'closed']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { status } = req.body;
    const db = getDatabase();

    // Update contact status
    const updateContact = db.prepare(`
      UPDATE contacts 
      SET status = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `);
    
    const result = updateContact.run(status, id);

    if (result.changes === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    // Get updated contact
    const updatedContact = db.prepare('SELECT * FROM contacts WHERE id = ?').get(id);

    res.json({
      message: 'Contact status updated successfully',
      contact: updatedContact
    });

  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({ message: 'Failed to update contact' });
  }
});

// Delete contact
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();

    const deleteContact = db.prepare('DELETE FROM contacts WHERE id = ?');
    const result = deleteContact.run(id);

    if (result.changes === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json({ message: 'Contact deleted successfully' });

  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ message: 'Failed to delete contact' });
  }
});

module.exports = router; 