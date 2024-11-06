const express = require("express");
const path = require('path');
const nodemailer = require('nodemailer');
const cors = require('cors')
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

// Enable to use the fetch API
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Middleware
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.json());
//Enable cors to access Google API from client domain 
app.use(cors({
  origin: 'http://localhost:3000'
}))


// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Utility functions
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneRegex.test(phone);
};

// GET Method to fetch reviews from Google API
app.get('/api/reviews', async (req, res) => {
  //Store ID from google api
  const bluStylesId = 'ChIJ9w5qKPNiz4cREmgPmv50ct0';
   // Store API key in .env file for security 
  const apiKey = process.env.GOOGLE_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${bluStylesId}&fields=name,rating,user_ratings_total&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data) {
      res.json(data)
    } else {
      res.status(404).json({ message: 'No reviews found for this place.' });
    }
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Failed to fetch reviews.' });
  }
});


// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    // Configure email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'blustyles0@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <br>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
});

// Booking endpoint
app.post("/api/bookings", async (req, res) => {
  try {
    const { name, email, phone, date, time, service } = req.body;

    // Validate all required fields
    if (!name || !email || !phone || !date || !time || !service) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    // Validate email and phone
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    if (!validatePhone(phone)) {
      return res.status(400).json({ message: 'Please provide a valid phone number' });
    }

    // Validate date is in the future
    const bookingDate = new Date(date);
    if (bookingDate < new Date()) {
      return res.status(400).json({ message: 'Please select a future date' });
    }

    // Validate time format and business hours
    const [hours, minutes] = time.split(':').map(Number);
    if (hours < 9 || hours >= 17) {
      return res.status(400).json({ message: 'Please select a time during business hours (9 AM - 5 PM)' });
    }

    // Format date for emails
    const formattedDate = bookingDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Email to customer
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Booking Confirmation - Blu Styles Barbershop',
      html: `
        <h2>Thank you for booking with Blu Styles Barbershop!</h2>
        <p>We have received your booking request for the following service:</p>
        <p><strong>Service:</strong> ${service.name}</p>
        <p><strong>Duration:</strong> ${service.duration} minutes</p>
        <p><strong>Price:</strong> $${service.price}</p>
        <p><strong>Preferred Date:</strong> ${formattedDate}</p>
        <p><strong>Preferred Time:</strong> ${time}</p>
        <br>
        <p>Our team will contact you shortly at ${phone} to confirm your appointment.</p>
        <p>If you need to make any changes, please call us at 417-227-0001.</p>
        <br>
        <p>Blu Styles Barbershop</p>
        <p>223 E COMMERCIAL ST</p>
        <p>SPRINGFIELD, MO</p>
      `
    };

    // Email to barbershop
    const shopMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'blustyles0@gmail.com',
      subject: 'New Booking Request',
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Customer:</strong> ${name}</p>
        <p><strong>Service:</strong> ${service.name}</p>
        <p><strong>Duration:</strong> ${service.duration} minutes</p>
        <p><strong>Price:</strong> $${service.price}</p>
        <p><strong>Preferred Date:</strong> ${formattedDate}</p>
        <p><strong>Preferred Time:</strong> ${time}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
      `
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(customerMailOptions),
      transporter.sendMail(shopMailOptions)
    ]);

    res.status(200).json({
      message: 'Booking request received successfully',
      booking: {
        name,
        email,
        phone,
        date: formattedDate,
        time,
        service: service.name
      }
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Failed to process booking. Please try again later.' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Catch-all handler
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});