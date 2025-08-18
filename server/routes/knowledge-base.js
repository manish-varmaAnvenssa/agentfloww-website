const express = require('express');
const { body, validationResult } = require('express-validator');
const KnowledgeBase = require('../models/KnowledgeBase');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all published knowledge base articles (public)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 50, category, difficulty, search } = req.query;
    
    let query = { status: 'published' };
    
    if (category) {
      query.category = category;
    }
    
    if (difficulty) {
      query.difficulty = difficulty;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    const articles = await KnowledgeBase.find(query)
      .populate('author', 'username')
      .sort({ publishDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const total = await KnowledgeBase.countDocuments(query);
    
    res.json({
      articles,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single knowledge base article by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const article = await KnowledgeBase.findOne({ slug: req.params.slug, status: 'published' })
      .populate('author', 'username')
      .populate('relatedArticles', 'title slug summary');
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    // Increment views
    article.views += 1;
    await article.save();
    
    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create knowledge base article (admin, newsroom)
router.post('/', [
  auth,
  authorize('admin', 'newsroom'),
  body('title').notEmpty().withMessage('Title is required'),
  body('summary').notEmpty().withMessage('Summary is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('featuredImage').notEmpty().withMessage('Featured image is required'),
  body('category').isIn(['getting-started', 'features', 'troubleshooting', 'api', 'integrations', 'best-practices']).withMessage('Invalid category'),
  body('difficulty').isIn(['beginner', 'intermediate', 'advanced']).withMessage('Invalid difficulty level')
], async (req, res) => {
  try {
    console.log('=== KNOWLEDGE BASE CREATE REQUEST ===');
    console.log('User:', req.user);
    console.log('Request body:', req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    // Generate slug from title
    const generateSlug = (title) => {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
    };

    const article = new KnowledgeBase({
      ...req.body,
      slug: generateSlug(req.body.title),
      author: req.user._id
    });

    console.log('Article object before save:', article);
    await article.save();
    console.log('Article saved successfully:', article._id);
    
    const populatedArticle = await article.populate('author', 'username');
    res.status(201).json(populatedArticle);
  } catch (error) {
    console.error('=== KNOWLEDGE BASE CREATE ERROR ===');
    console.error('Error details:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ message: 'Server error', details: error.message });
  }
});

// Update knowledge base article (admin, newsroom - own posts)
router.put('/:id', [
  auth,
  authorize('admin', 'newsroom'),
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('category').optional().isIn(['getting-started', 'features', 'troubleshooting', 'api', 'integrations', 'best-practices']).withMessage('Invalid category'),
  body('difficulty').optional().isIn(['beginner', 'intermediate', 'advanced']).withMessage('Invalid difficulty level')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const article = await KnowledgeBase.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    // Check if user can edit this article
    if (req.user.role !== 'admin' && article.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this article' });
    }

    const updatedArticle = await KnowledgeBase.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'username');

    res.json(updatedArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete knowledge base article (admin, newsroom - own posts)
router.delete('/:id', [auth, authorize('admin', 'newsroom')], async (req, res) => {
  try {
    const article = await KnowledgeBase.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    // Check if user can delete this article
    if (req.user.role !== 'admin' && article.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this article' });
    }

    await KnowledgeBase.findByIdAndDelete(req.params.id);
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Rate article helpful/not helpful (public)
router.post('/:id/rate', [
  body('rating').isIn(['helpful', 'notHelpful']).withMessage('Invalid rating')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const article = await KnowledgeBase.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (req.body.rating === 'helpful') {
      article.helpful += 1;
    } else {
      article.notHelpful += 1;
    }

    await article.save();
    res.json({ message: 'Rating recorded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all knowledge base articles (admin only - for management)
router.get('/admin/all', [auth, authorize('admin')], async (req, res) => {
  try {
    const { page = 1, limit = 50, status, category, difficulty } = req.query;
    
    let query = {};
    if (status) {
      query.status = status;
    }
    if (category) {
      query.category = category;
    }
    if (difficulty) {
      query.difficulty = difficulty;
    }
    
    const articles = await KnowledgeBase.find(query)
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const total = await KnowledgeBase.countDocuments(query);
    
    res.json({
      articles,
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