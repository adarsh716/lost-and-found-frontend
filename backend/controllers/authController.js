const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
require('dotenv').config();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

const getOtpExpiryTime = () => Date.now() + 10 * 60 * 1000;


exports.register = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP and OTP expiry
    const otp = generateOTP();
    const otpExpiry = getOtpExpiryTime();

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      otp, // Store OTP in user record
      otpExpiry, // Store OTP expiry
    });

    await user.save();

    // Send OTP via email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'OTP for Registration',
      text: `Your OTP is: ${otp}`,
    });

    console.log("Otp",otp)

    res.status(200).json({ msg: 'Registration successful, check your email for OTP' });
  } catch (err) {
    res.status(500).json({ msg: 'Error registering user', error: err.message });
  }
};

// OTP verification
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    // Check if OTP matches and hasn't expired
    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ msg: 'Invalid or expired OTP' });
    }

    // Mark user as verified and clear OTP and expiry
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.status(200).json({ msg: 'Account verified successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Error verifying OTP', error: err.message });
  }
};

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    if (!user.isVerified) return res.status(400).json({ msg: 'Please verify your email first' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ msg: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ msg: 'Error logging in', error: err.message });
  }
};
