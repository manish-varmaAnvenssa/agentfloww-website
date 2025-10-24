const express = require('express');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const Notification = require('../models/Notification');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Submit contact form (public)
router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('phone')
    .optional()
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Phone number must be less than 20 characters')
    .custom((value) => {
      if (!value) return true; // Optional field
      // Remove all non-digit characters except + at the start
      const cleanNumber = value.replace(/[^\d+]/g, '');
      if (cleanNumber.startsWith('+')) {
        // International number: + followed by 7-15 digits
        if (cleanNumber.length < 8 || cleanNumber.length > 16) {
          throw new Error('International phone number must be 8-16 digits');
        }
      } else {
        // Local number: 7-15 digits
        if (cleanNumber.length < 7 || cleanNumber.length > 15) {
          throw new Error('Phone number must be 7-15 digits');
        }
      }
      return true;
    })
    .withMessage('Please enter a valid phone number'),
  body('message').notEmpty().withMessage('Message is required')
], async (req, res) => {
  try {
    console.log('=== CONTACT FORM SUBMISSION ===');
    console.log('Received data:', JSON.stringify(req.body, null, 2));
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const contact = new Contact({
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    console.log('Contact object before save:', {
      name: contact.name,
      email: contact.email,
      message: contact.message
    });

    await contact.save();
    console.log('Contact saved successfully with ID:', contact._id);
    console.log('Database:', contact.db.name);
    console.log('Collection:', contact.collection.name);
    console.log('=== CONTACT FORM SUBMISSION END ===');

    // Create notification
    const notification = new Notification({
      type: 'contact',
      title: 'New Contact Submission',
      message: `New contact form submission from ${contact.name}`,
      data: {
        contactId: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject
      }
    });
    await notification.save();



    res.status(201).json({ 
      message: 'Contact form submitted successfully',
      id: contact._id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all contact submissions (admin only)
router.get('/', [auth, authorize('admin')], async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    
    let query = {};
    if (status) {
      query.status = status;
    }
    
    // Add search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }
    
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const total = await Contact.countDocuments(query);
    
    res.json({
      contacts,
      pagination: {
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        total
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single contact submission (admin only)
router.get('/:id', [auth, authorize('admin')], async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    
    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update contact status and admin notes (admin only)
router.put('/:id', [
  auth, 
  authorize('admin'),
  body('status').optional().isIn(['new', 'read', 'replied', 'closed']).withMessage('Invalid status'),
  body('adminNotes').optional().isString().withMessage('Admin notes must be a string')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    
    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete contact submission (admin only)
router.delete('/:id', [auth, authorize('admin')], async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    
    res.json({ message: 'Contact submission deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get contact statistics (admin only)
router.get('/stats/overview', [auth, authorize('admin')], async (req, res) => {
  try {
    const total = await Contact.countDocuments();
    const newCount = await Contact.countDocuments({ status: 'new' });
    const readCount = await Contact.countDocuments({ status: 'read' });
    const repliedCount = await Contact.countDocuments({ status: 'replied' });
    const closedCount = await Contact.countDocuments({ status: 'closed' });
    

    
    // Recent submissions (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentCount = await Contact.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });
    
    res.json({
      total,
      byStatus: {
        new: newCount,
        read: readCount,
        replied: repliedCount,
        closed: closedCount
      },

      recent: recentCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 