const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const resetAdminPassword = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find the admin user with your email
    const adminUser = await User.findOne({ email: 'varmamanish341@gmail.com' });
    
    if (!adminUser) {
      console.log('Admin user with email varmamanish341@gmail.com not found!');
      process.exit(1);
    }

    // Set new password
    const newPassword = 'admin123'; // You can change this to any password you want
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the password
    adminUser.password = hashedPassword;
    await adminUser.save();

    console.log('Password reset successfully!');
    console.log('Email: varmamanish341@gmail.com');
    console.log('New Password: ' + newPassword);
    console.log('Please change the password after login for security.');

  } catch (error) {
    console.error('Error resetting password:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

resetAdminPassword(); 