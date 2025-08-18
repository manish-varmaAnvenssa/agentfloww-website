const express = require('express')
const router = express.Router()
const Demo = require('../models/Demo')
const Notification = require('../models/Notification')
const { auth } = require('../middleware/auth')

// POST - Submit a new demo request
router.post('/', async (req, res) => {
  console.log('Demo POST request received:', req.body)
  try {
    const { fullName, workEmail, jobTitle, companySize, comments } = req.body

    console.log('Extracted data:', { fullName, workEmail, jobTitle, companySize, comments })

    // Validate required fields
    if (!fullName || !workEmail || !jobTitle || !companySize || !comments) {
      console.log('Validation failed - missing fields')
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(workEmail)) {
      return res.status(400).json({ message: 'Invalid email format' })
    }

    // Validate company size
    const validSizes = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']
    if (!validSizes.includes(companySize)) {
      return res.status(400).json({ message: 'Invalid company size' })
    }

    // Create new demo request
    const demo = new Demo({
      fullName,
      workEmail,
      jobTitle,
      companySize,
      comments
    })

    console.log('Saving demo to database...')
    await demo.save()
    console.log('Demo saved successfully:', demo._id)

    // Create notification
    const notification = new Notification({
      type: 'demo',
      title: 'New Demo Request',
      message: `New demo request from ${demo.fullName}`,
      data: {
        demoId: demo._id,
        fullName: demo.fullName,
        workEmail: demo.workEmail,
        jobTitle: demo.jobTitle,
        companySize: demo.companySize
      }
    })
    await notification.save()



    res.status(201).json({ 
      message: 'Demo request submitted successfully',
      demo: {
        id: demo._id,
        fullName: demo.fullName,
        workEmail: demo.workEmail,
        jobTitle: demo.jobTitle,
        companySize: demo.companySize,
        status: demo.status,
        createdAt: demo.createdAt
      }
    })

  } catch (error) {
    console.error('Demo submission error:', error)
    res.status(500).json({ message: 'Server error: ' + error.message })
  }
})

// GET - Get all demo requests (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const status = req.query.status
    const search = req.query.search

    let query = {}

    // Filter by status
    if (status && status !== 'all') {
      query.status = status
    }

    // Search functionality
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { workEmail: { $regex: search, $options: 'i' } },
        { jobTitle: { $regex: search, $options: 'i' } },
        { comments: { $regex: search, $options: 'i' } }
      ]
    }

    const skip = (page - 1) * limit

    const demos = await Demo.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Demo.countDocuments(query)
    const totalPages = Math.ceil(total / limit)

    res.json({
      demos,
      pagination: {
        currentPage: page,
        totalPages,
        total,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    })

  } catch (error) {
    console.error('Get demos error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// GET - Get demo statistics (admin only)
router.get('/stats/overview', auth, async (req, res) => {
  try {
    const total = await Demo.countDocuments()
    const pending = await Demo.countDocuments({ status: 'pending' })
    const contacted = await Demo.countDocuments({ status: 'contacted' })
    const scheduled = await Demo.countDocuments({ status: 'scheduled' })
    const completed = await Demo.countDocuments({ status: 'completed' })
    const cancelled = await Demo.countDocuments({ status: 'cancelled' })

    // Get recent demos (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const recent = await Demo.countDocuments({ createdAt: { $gte: sevenDaysAgo } })

    res.json({
      total,
      pending,
      contacted,
      scheduled,
      completed,
      cancelled,
      recent
    })

  } catch (error) {
    console.error('Get demo stats error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// GET - Get a single demo request (admin only)
router.get('/:id', auth, async (req, res) => {
  try {
    const demo = await Demo.findById(req.params.id)
    
    if (!demo) {
      return res.status(404).json({ message: 'Demo request not found' })
    }

    res.json(demo)

  } catch (error) {
    console.error('Get demo error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// PUT - Update demo request status and notes (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const { status, adminNotes } = req.body

    const updateData = {}
    if (status) updateData.status = status
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes

    const demo = await Demo.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )

    if (!demo) {
      return res.status(404).json({ message: 'Demo request not found' })
    }

    res.json({ 
      message: 'Demo request updated successfully',
      demo
    })

  } catch (error) {
    console.error('Update demo error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// DELETE - Delete a demo request (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const demo = await Demo.findByIdAndDelete(req.params.id)
    
    if (!demo) {
      return res.status(404).json({ message: 'Demo request not found' })
    }

    res.json({ message: 'Demo request deleted successfully' })

  } catch (error) {
    console.error('Delete demo error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router 