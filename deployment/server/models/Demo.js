const mongoose = require('mongoose')

const demoSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  workEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  jobTitle: {
    type: String,
    required: true,
    trim: true
  },
  companySize: {
    type: String,
    required: true,
    enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']
  },
  comments: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'scheduled', 'completed', 'cancelled'],
    default: 'pending'
  },
  adminNotes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
})

// Index for better query performance
demoSchema.index({ createdAt: -1 })
demoSchema.index({ status: 1 })

module.exports = mongoose.model('Demo', demoSchema) 