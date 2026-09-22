const express = require('express');
const router = express.Router();
const { getDatabase } = require('../database');

// POST /api/otp/send
router.post('/send', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  // Generate 6-digit numeric OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    const db = getDatabase();
    
    // In local development, we will log it to the console and print it in the response for easy testing!
    console.log(`[OTP] Sent verification code to ${email}: ${otp}`);

    // Clean up old OTPs for this email
    await db.prepare('DELETE FROM email_otps WHERE email = ?').run(email);

    // Insert new OTP valid for 10 minutes
    await db.prepare(
      'INSERT INTO email_otps (email, otp, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 10 MINUTE))'
    ).run(email, otp);

    res.json({ 
      success: true, 
      message: `Verification code sent to ${email} (Local Dev Mock: ${otp})`,
      mockOtp: otp // Send it in response for easy local testing!
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to generate verification code' });
  }
});

// POST /api/otp/verify
router.post('/verify', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and verification code are required' });
  }

  try {
    const db = getDatabase();
    
    // Find active OTP (MySQL uses NOW())
    const activeOtp = await db.prepare(
      'SELECT id FROM email_otps WHERE email = ? AND otp = ? AND expires_at > NOW() LIMIT 1'
    ).get(email, otp);

    if (!activeOtp) {
      return res.status(400).json({ message: 'Invalid or expired verification code' });
    }

    // Delete verified OTP
    await db.prepare('DELETE FROM email_otps WHERE email = ?').run(email);

    res.json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Failed to verify verification code' });
  }
});

module.exports = router;
