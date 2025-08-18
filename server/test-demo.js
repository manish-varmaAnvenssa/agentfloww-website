const mongoose = require('mongoose')
const Demo = require('./models/Demo')
require('dotenv').config()

async function testDemo() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/anvenssa'
    console.log('Connecting to MongoDB:', mongoUri)
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected to MongoDB')

    // Test creating a demo
    const testDemo = new Demo({
      fullName: 'Test User',
      workEmail: 'test@example.com',
      jobTitle: 'Test Job',
      companySize: '1-10',
      comments: 'Test comment'
    })

    console.log('Saving test demo...')
    const savedDemo = await testDemo.save()
    console.log('Demo saved successfully:', savedDemo._id)

    // Test finding demos
    const demos = await Demo.find()
    console.log('Total demos in database:', demos.length)

    // Clean up test data
    await Demo.findByIdAndDelete(savedDemo._id)
    console.log('Test demo cleaned up')

    console.log('✅ Demo functionality test passed!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Demo functionality test failed:', error)
    process.exit(1)
  }
}

testDemo() 