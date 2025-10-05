const express = require('express');
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');
const router = express.Router();

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Save to database
    const contact = new Contact({
      name,
      email,
      subject,
      message
    });
    await contact.save();
    
    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Contact Form: ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>Sent from MicroCourses Contact Form</small></p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log('✅ Contact email sent to:', process.env.EMAIL_USER);
    
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('❌ Contact form error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;