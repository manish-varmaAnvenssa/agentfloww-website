const express = require('express');
const { getDatabase } = require('../database');

const router = express.Router();

// Get user profile
router.get('/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDatabase();
    
    const user = db.prepare(`
      SELECT id, username, email, role, avatar, is_active, created_at, updated_at 
      FROM users 
      WHERE id = ? AND is_active = 1
    `).get(id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });

  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ message: 'Failed to fetch user profile' });
  }
});

// Update user profile
router.put('/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, avatar } = req.body;
    const db = getDatabase();

    // Check if user exists
    const existingUser = db.prepare('SELECT id FROM users WHERE id = ? AND is_active = 1').get(id);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Build update query
    let updateFields = [];
    let updateValues = [];
    
    if (username !== undefined) {
      updateFields.push('username = ?');
      updateValues.push(username);
    }
    if (avatar !== undefined) {
      updateFields.push('avatar = ?');
      updateValues.push(avatar);
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
    const updatedUser = db.prepare(`
      SELECT id, username, email, role, avatar, is_active, created_at, updated_at 
      FROM users 
      WHERE id = ?
    `).get(id);

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

// Change password
router.put('/profile/:id/password', async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;
    const db = getDatabase();

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters' });
    }

    // Get user with password
    const user = db.prepare('SELECT * FROM users WHERE id = ? AND is_active = 1').get(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const bcrypt = require('bcryptjs');
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    const updatePassword = db.prepare(`
      UPDATE users 
      SET password = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `);
    
    const result = updatePassword.run(hashedPassword, id);

    if (result.changes === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Password changed successfully' });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Failed to change password' });
  }
});

module.exports = router; 