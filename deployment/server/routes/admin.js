const express = require('express');
const { body, validationResult } = require('express-validator');
const { auth, authorize } = require('../middleware/auth');
const User = require('../models/User');
const Blog = require('../models/Blog');
const News = require('../models/News');
const KnowledgeBase = require('../models/KnowledgeBase');
const Contact = require('../models/Contact');
const Notification = require('../models/Notification');

const router = express.Router();

// All routes require admin access
router.use(auth, authorize('admin'));

// Get dashboard statistics
router.get('/dashboard', async (req, res) => {
  try {
    // User statistics
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const bloggers = await User.countDocuments({ role: 'blogger' });
    const newsroomUsers = await User.countDocuments({ role: 'newsroom' });

    // Blog statistics
    const totalBlogs = await Blog.countDocuments();
    const publishedBlogs = await Blog.countDocuments({ status: 'published' });
    const draftBlogs = await Blog.countDocuments({ status: 'draft' });
    const totalBlogViews = await Blog.aggregate([
      { $group: { _id: null, totalViews: { $sum: '$views' } } }
    ]);

    // News statistics
    const totalNews = await News.countDocuments();
    const publishedNews = await News.countDocuments({ status: 'published' });
    const draftNews = await News.countDocuments({ status: 'draft' });
    const totalNewsViews = await News.aggregate([
      { $group: { _id: null, totalViews: { $sum: '$views' } } }
    ]);

    // Knowledge Base statistics
    const totalKnowledgeBase = await KnowledgeBase.countDocuments();
    const publishedKnowledgeBase = await KnowledgeBase.countDocuments({ status: 'published' });
    const draftKnowledgeBase = await KnowledgeBase.countDocuments({ status: 'draft' });
    const totalKnowledgeBaseViews = await KnowledgeBase.aggregate([
      { $group: { _id: null, totalViews: { $sum: '$views' } } }
    ]);

    // Contact statistics
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });
    const highPriorityContacts = await Contact.countDocuments({ priority: 'high' });

    // Recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentBlogs = await Blog.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    const recentNews = await News.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    const recentKnowledgeBase = await KnowledgeBase.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    const recentContacts = await Contact.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    // Notification statistics
    const unreadNotifications = await Notification.countDocuments({ isRead: false });
    const unreadContactNotifications = await Notification.countDocuments({ 
      type: 'contact', 
      isRead: false 
    });
    const unreadDemoNotifications = await Notification.countDocuments({ 
      type: 'demo', 
      isRead: false 
    });

    res.json({
      users: {
        total: totalUsers,
        active: activeUsers,
        bloggers,
        newsroom: newsroomUsers
      },
      blogs: {
        total: totalBlogs,
        published: publishedBlogs,
        draft: draftBlogs,
        totalViews: totalBlogViews[0]?.totalViews || 0
      },
      news: {
        total: totalNews,
        published: publishedNews,
        draft: draftNews,
        totalViews: totalNewsViews[0]?.totalViews || 0
      },
      knowledgeBase: {
        total: totalKnowledgeBase,
        published: publishedKnowledgeBase,
        draft: draftKnowledgeBase,
        totalViews: totalKnowledgeBaseViews[0]?.totalViews || 0
      },
      contacts: {
        total: totalContacts,
        new: newContacts,
        highPriority: highPriorityContacts
      },
      recent: {
        blogs: recentBlogs,
        news: recentNews,
        knowledgeBase: recentKnowledgeBase,
        contacts: recentContacts
      },
      notifications: {
        unread: unreadNotifications,
        contact: unreadContactNotifications,
        demo: unreadDemoNotifications
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new user (admin only)
router.post('/users', [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['admin', 'blogger', 'newsroom']).withMessage('Invalid role')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, role } = req.body;

    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      username,
      email,
      password,
      role
    });

    await user.save();

    res.status(201).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: user.isActive
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 10, role, isActive } = req.query;
    
    let query = {};
    if (role) {
      query.role = role;
    }
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }
    
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const total = await User.countDocuments(query);
    
    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user status
router.put('/users/:id', async (req, res) => {
  try {
    const { isActive, role } = req.body;
    
    const updateData = {};
    if (isActive !== undefined) {
      updateData.isActive = isActive;
    }
    if (role) {
      updateData.role = role;
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if user has any content
    const userBlogs = await Blog.countDocuments({ author: req.params.id });
    const userNews = await News.countDocuments({ author: req.params.id });
    
    if (userBlogs > 0 || userNews > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete user with existing content. Please reassign or delete their content first.' 
      });
    }
    
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get system health
router.get('/health', async (req, res) => {
  try {
    const dbStatus = await User.db.db.admin().ping();
    
    res.json({
      status: 'healthy',
      database: dbStatus.ok ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      status: 'unhealthy',
      error: error.message 
    });
  }
});

module.exports = router; 