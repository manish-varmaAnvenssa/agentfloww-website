const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['contact', 'demo'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date
  }
}, {
  timestamps: true
})

// Index for efficient queries
notificationSchema.index({ isRead: 1, createdAt: -1 })
notificationSchema.index({ type: 1, isRead: 1 })

module.exports = mongoose.model('Notification', notificationSchema) 