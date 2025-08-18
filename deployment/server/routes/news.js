const express = require('express');
const { body, validationResult } = require('express-validator');
const News = require('../models/News');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all published news (public)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 50, type, search } = req.query;
    
    let query = { status: 'published' };
    
    if (type) {
      query.type = type;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    const news = await News.find(query)
      .populate('author', 'username')
      .sort({ publishDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const total = await News.countDocuments(query);
    
    res.json({
      news,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single news by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const news = await News.findOne({ slug: req.params.slug, status: 'published' })
      .populate('author', 'username');
    
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    
    // Increment views
    news.views += 1;
    await news.save();
    
    res.json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create news (admin, newsroom)
router.post('/', [
  auth,
  authorize('admin', 'newsroom'),
  body('title').notEmpty().withMessage('Title is required'),
  body('summary').notEmpty().withMessage('Summary is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('featuredImage').notEmpty().withMessage('Featured image is required'),
  body('type').isIn(['press-release', 'announcement', 'company-news', 'product-update']).withMessage('Invalid type')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const news = new News({
      ...req.body,
      author: req.user._id
    });

    await news.save();
    
    const populatedNews = await news.populate('author', 'username');
    res.status(201).json(populatedNews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update news (admin, newsroom - own posts)
router.put('/:id', [
  auth,
  authorize('admin', 'newsroom'),
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('type').optional().isIn(['press-release', 'announcement', 'company-news', 'product-update']).withMessage('Invalid type')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const news = await News.findById(req.params.id);
    
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    
    // Check if user can edit this news
    if (req.user.role !== 'admin' && news.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this news' });
    }

    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'username');

    res.json(updatedNews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete news (admin, newsroom - own posts)
router.delete('/:id', [auth, authorize('admin', 'newsroom')], async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    
    // Check if user can delete this news
    if (req.user.role !== 'admin' && news.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this news' });
    }

    await News.findByIdAndDelete(req.params.id);
    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all news (admin only - for management)
router.get('/admin/all', [auth, authorize('admin')], async (req, res) => {
  try {
    const { page = 1, limit = 50, status, type } = req.query;
    
    let query = {};
    if (status) {
      query.status = status;
    }
    if (type) {
      query.type = type;
    }
    
    const news = await News.find(query)
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const total = await News.countDocuments(query);
    
    res.json({
      news,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 