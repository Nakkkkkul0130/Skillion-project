const nodemailer = require('nodemailer');

// Email configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail', // or your email provider
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS  // your app password
  }
});

const sendContactEmail = async (contactData) => {
  const { name, email, subject, message } = contactData;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'nakkul.dev@gmail.com', // your email
    subject: `Contact Form: ${subject}`,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  };
  
  try {
    await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully');
  } catch (error) {
    console.error('Email sending failed:', error);
  }
};

module.exports = { sendContactEmail };