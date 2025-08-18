const express = require('express');
const { body, validationResult } = require('express-validator');
const { getDatabase } = require('../database');

const router = express.Router();

// Get admin dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    const db = getDatabase();
    
    // Get counts
    const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
    const contactCount = db.prepare('SELECT COUNT(*) as count FROM contacts').get().count;
    const demoCount = db.prepare('SELECT COUNT(*) as count FROM demos').get().count;
    
    // Get recent contacts
    const recentContacts = db.prepare(`
      SELECT * FROM contacts 
      ORDER BY created_at DESC 
      LIMIT 5
    `).all();
    
    // Get recent demo requests
    const recentDemos = db.prepare(`
      SELECT * FROM demos 
      ORDER BY created_at DESC 
      LIMIT 5
    `).all();
    
    // Get contact status counts
    const contactStats = db.prepare(`
      SELECT status, COUNT(*) as count 
      FROM contacts 
      GROUP BY status
    `).all();
    
    // Get demo status counts
    const demoStats = db.prepare(`
      SELECT status, COUNT(*) as count 
      FROM demos 
      GROUP BY status
    `).all();

    res.json({
      stats: {
        users: userCount,
        contacts: contactCount,
        demos: demoCount
      },
      recentContacts,
      recentDemos,
      contactStats,
      demoStats
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const db = getDatabase();
    
    const users = db.prepare(`
      SELECT id, username, email, role, avatar, is_active, created_at, updated_at 
      FROM users 
      ORDER BY created_at DESC
    `).all();

    res.json({ users });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Create new user
router.post('/users', [
  body('username').trim().isLength({ min: 3, max: 50 }).withMessage('Username must be between 3 and 50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['admin', 'user']).withMessage('Invalid role')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, role } = req.body;
    const db = getDatabase();

    // Check if user already exists
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ? OR username = ?').get(email, username);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const insertUser = db.prepare(`
      INSERT INTO users (username, email, password, role, is_active) 
      VALUES (?, ?, ?, ?, ?)
    `);
    
    const result = insertUser.run(username, email, hashedPassword, role, 1);
    
    // Get the created user (without password)
    const newUser = db.prepare('SELECT id, username, email, role, avatar, is_active, created_at FROM users WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json({
      message: 'User created successfully',
      user: newUser
    });

  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ message: 'Failed to create user' });
  }
});

// Update user
router.put('/users/:id', [
  body('username').optional().trim().isLength({ min: 3, max: 50 }),
  body('email').optional().isEmail().normalizeEmail(),
  body('role').optional().isIn(['admin', 'user']),
  body('is_active').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { username, email, role, is_active } = req.body;
    const db = getDatabase();

    // Check if user exists
    const existingUser = db.prepare('SELECT id FROM users WHERE id = ?').get(id);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Build update query dynamically
    let updateFields = [];
    let updateValues = [];
    
    if (username !== undefined) {
      updateFields.push('username = ?');
      updateValues.push(username);
    }
    if (email !== undefined) {
      updateFields.push('email = ?');
      updateValues.push(email);
    }
    if (role !== undefined) {
      updateFields.push('role = ?');
      updateValues.push(role);
    }
    if (is_active !== undefined) {
      updateFields.push('is_active = ?');
      updateValues.push(is_active ? 1 : 0);
    }
    
    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    updateValues.push(id);

    const updateQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
    const updateUser = db.prepare(updateQuery);
    
    const result = updateUser.run(...updateValues);

    if (result.changes === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get updated user
    const updatedUser = db.prepare('SELECT id, username, email, role, avatar, is_active, created_at FROM users WHERE id = ?').get(id);

    res.json({
      message: 'User updated successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Failed to update user' });
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();

    // Check if user exists
    const existingUser = db.prepare('SELECT id FROM users WHERE id = ?').get(id);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete user
    const deleteUser = db.prepare('DELETE FROM users WHERE id = ?');
    const result = deleteUser.run(id);

    if (result.changes === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

module.exports = router; 