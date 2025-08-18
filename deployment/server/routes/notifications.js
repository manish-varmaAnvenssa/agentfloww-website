const express = require('express')
const Notification = require('../models/Notification')
const { auth } = require('../middleware/auth')

const router = express.Router()

// GET - Get all notifications (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 20, type, isRead } = req.query
    
    let query = {}
    
    if (type) {
      query.type = type
    }
    
    if (isRead !== undefined) {
      query.isRead = isRead === 'true'
    }
    
    const skip = (page - 1) * limit
    
    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
    
    const total = await Notification.countDocuments(query)
    const totalPages = Math.ceil(total / limit)
    
    res.json({
      notifications,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        total,
        hasNext: parseInt(page) < totalPages,
        hasPrev: parseInt(page) > 1
      }
    })
  } catch (error) {
    console.error('Get notifications error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// GET - Get notification counts (admin only)
router.get('/counts', auth, async (req, res) => {
  try {
    const [total, unread, contactCount, demoCount] = await Promise.all([
      Notification.countDocuments(),
      Notification.countDocuments({ isRead: false }),
      Notification.countDocuments({ type: 'contact', isRead: false }),
      Notification.countDocuments({ type: 'demo', isRead: false })
    ])
    
    res.json({
      total,
      unread,
      contact: contactCount,
      demo: demoCount
    })
  } catch (error) {
    console.error('Get notification counts error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// PUT - Mark notification as read (admin only)
router.put('/:id/read', auth, async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { 
        isRead: true, 
        readAt: new Date() 
      },
      { new: true }
    )
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' })
    }
    
    res.json(notification)
  } catch (error) {
    console.error('Mark notification read error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// PUT - Mark all notifications as read (admin only)
router.put('/read-all', auth, async (req, res) => {
  try {
    const { type } = req.query
    
    let query = { isRead: false }
    if (type) {
      query.type = type
    }
    
    const result = await Notification.updateMany(
      query,
      { 
        isRead: true, 
        readAt: new Date() 
      }
    )
    
    res.json({ 
      message: `Marked ${result.modifiedCount} notifications as read`,
      modifiedCount: result.modifiedCount
    })
  } catch (error) {
    console.error('Mark all notifications read error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// DELETE - Delete notification (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id)
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' })
    }
    
    res.json({ message: 'Notification deleted successfully' })
  } catch (error) {
    console.error('Delete notification error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router 