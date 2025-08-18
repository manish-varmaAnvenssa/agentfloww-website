const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const fixAdminPassword = async () => {
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

    // Hash the password manually (bypass the pre-save hook)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Update the password directly in the database
    await User.updateOne(
      { email: email },
      { $set: { password: hashedPassword } }
    );

    console.log('✅ Password updated successfully!');

    // Verify the password works
    const updatedUser = await User.findOne({ email });
    const isMatch = await updatedUser.comparePassword(password);
    
    console.log('\n🔐 Password Verification:');
    console.log('Password match:', isMatch ? '✅ YES' : '❌ NO');

    console.log('\n📋 Login Credentials:');
    console.log('Email:', email);
    console.log('Password:', password);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

fixAdminPassword(); 