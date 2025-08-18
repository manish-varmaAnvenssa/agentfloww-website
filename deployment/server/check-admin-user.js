const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const checkAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find the admin user
    const adminUser = await User.findOne({ email: 'varmamanish341@gmail.com' });
    
    if (!adminUser) {
      console.log('❌ Admin user with email varmamanish341@gmail.com not found!');
      process.exit(1);
    }

    console.log('✅ Admin user found:');
    console.log('ID:', adminUser._id);
    console.log('Username:', adminUser.username);
    console.log('Email:', adminUser.email);
    console.log('Role:', adminUser.role);
    console.log('Is Active:', adminUser.isActive);
    console.log('Password Hash:', adminUser.password.substring(0, 20) + '...');

    // Test password
    const testPassword = 'admin123';
    const isMatch = await bcrypt.compare(testPassword, adminUser.password);
    
    console.log('\n🔐 Password Test:');
    console.log('Testing password:', testPassword);
    console.log('Password match:', isMatch ? '✅ YES' : '❌ NO');

    if (!isMatch) {
      console.log('\n🔄 Resetting password...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(testPassword, salt);
      adminUser.password = hashedPassword;
      await adminUser.save();
      console.log('✅ Password reset successfully!');
    }

    console.log('\n📋 Login Credentials:');
    console.log('Email: varmamanish341@gmail.com');
    console.log('Password: admin123');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

checkAdminUser(); 