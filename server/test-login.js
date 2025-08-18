const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const testLogin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const email = 'varmamanish341@gmail.com';
    const password = 'admin123';

    // Find the user
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('❌ User not found!');
      return;
    }

    console.log('✅ User found:');
    console.log('Email:', user.email);
    console.log('Role:', user.role);
    console.log('Is Active:', user.isActive);

    // Test password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('\n🔐 Password Test:');
    console.log('Password match:', isMatch ? '✅ YES' : '❌ NO');

    if (!isMatch) {
      console.log('\n🔄 Setting new password...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
      await user.save();
      console.log('✅ Password set successfully!');
      
      // Test again
      const newMatch = await bcrypt.compare(password, user.password);
      console.log('New password test:', newMatch ? '✅ YES' : '❌ NO');
    }

    console.log('\n📋 Final Login Credentials:');
    console.log('Email:', email);
    console.log('Password:', password);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

testLogin(); 