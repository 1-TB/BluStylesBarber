const express = require("express");
const path = require('path');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Schemas
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, { timestamps: true });

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  lastVisit: { type: Date },
  nextVisit: { type: Date }
}, { timestamps: true });

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  service: {
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    price: { type: Number, required: true }
  },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
}, { timestamps: true });

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'read', 'responded'], default: 'new' }
}, { timestamps: true });

// Models
const User = mongoose.model('User', userSchema);
const Client = mongoose.model('Client', clientSchema);
const Booking = mongoose.model('Booking', bookingSchema);
const Contact = mongoose.model('Contact', contactSchema);

// Middleware
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.json());

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

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
  next();
};

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      password: hashedPassword
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Failed to register user' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, isAdmin: user.isAdmin });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Failed to log in' });
  }
});

app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const tempPassword = crypto.randomBytes(8).toString('hex');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(tempPassword, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset - Blu Styles Barbershop',
      html: `
        <h2>Password Reset</h2>
        <p>Your temporary password is: <strong>${tempPassword}</strong></p>
        <p>Please use this password to log in and then change it immediately.</p>
        <p>This temporary password will expire in 1 hour.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ message: 'Failed to process password reset' });
  }
});

app.post('/api/auth/reset-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.userId);

    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password update error:', error);
    res.status(500).json({ message: 'Failed to update password' });
  }
});

// Client Routes (Protected)
app.post("/api/clients", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { name, phone, email, lastVisit, nextVisit } = req.body;
    
    if (!name || !phone || !email) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!validatePhone(phone)) {
      return res.status(400).json({ message: 'Invalid phone format' });
    }

    const newClient = new Client({
      name,
      phone,
      email,
      lastVisit: lastVisit ? new Date(lastVisit) : null,
      nextVisit: nextVisit ? new Date(nextVisit) : null
    });

    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ message: 'Failed to create client' });
  }
});

app.get("/api/clients", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      };
    }
    
    const clients = await Client.find(query);
    res.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ message: 'Failed to fetch clients' });
  }
});

app.put("/api/clients/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { name, phone, email, lastVisit, nextVisit } = req.body;
    
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!validatePhone(phone)) {
      return res.status(400).json({ message: 'Invalid phone format' });
    }

    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      {
        name,
        phone,
        email,
        lastVisit: lastVisit ? new Date(lastVisit) : null,
        nextVisit: nextVisit ? new Date(nextVisit) : null
      },
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json(updatedClient);
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).json({ message: 'Failed to update client' });
  }
});

app.delete("/api/clients/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);
    
    if (!deletedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({ message: 'Failed to delete client' });
  }
});

// Booking Routes
app.post("/api/bookings", async (req, res) => {
  try {
    const { name, email, phone, date, time, service } = req.body;

    if (!name || !email || !phone || !date || !time || !service) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!validatePhone(phone)) {
      return res.status(400).json({ message: 'Invalid phone format' });
    }

    const booking = new Booking({
      name,
      email,
      phone,
      date: new Date(date),
      time,
      service
    });

    await booking.save();

    // Send confirmation emails (reuse your existing email logic)
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
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

    await Promise.all([
      transporter.sendMail(customerMailOptions),
      transporter.sendMail(shopMailOptions)
    ]);

    res.status(201).json(booking);
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Failed to process booking' });
  }
});

// Get all bookings (admin only)
app.get("/api/bookings", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { startDate, endDate, status } = req.query;
    let query = {};
    
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    
    if (status) {
      query.status = status;
    }
    
    const bookings = await Booking.find(query).sort({ date: 1, time: 1 });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});

// Update booking status (admin only)
app.put("/api/bookings/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Send status update email to customer
    const emailContent = {
      confirmed: {
        subject: 'Booking Confirmed - Blu Styles Barbershop',
        html: `
          <h2>Your booking has been confirmed!</h2>
          <p>We're looking forward to seeing you on ${booking.date.toLocaleDateString()} at ${booking.time}.</p>
          <p>Service: ${booking.service.name}</p>
        `
      },
      cancelled: {
        subject: 'Booking Cancelled - Blu Styles Barbershop',
        html: `
          <h2>Your booking has been cancelled</h2>
          <p>If you didn't request this cancellation, please contact us immediately.</p>
          <p>Original appointment: ${booking.date.toLocaleDateString()} at ${booking.time}</p>
        `
      }
    };

    if (emailContent[status]) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: booking.email,
        subject: emailContent[status].subject,
        html: emailContent[status].html
      });
    }

    res.json(booking);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ message: 'Failed to update booking' });
  }
});

// Delete booking (admin only)
app.delete("/api/bookings/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Notify customer of deletion
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: booking.email,
      subject: 'Booking Cancelled - Blu Styles Barbershop',
      html: `
        <h2>Your booking has been cancelled</h2>
        <p>Original appointment: ${booking.date.toLocaleDateString()} at ${booking.time}</p>
        <p>If you would like to reschedule, please visit our website or contact us directly.</p>
      `
    });

    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Failed to delete booking' });
  }
});

// Contact Routes
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    // Save contact message to database
    const contact = new Contact({
      name,
      email,
      message
    });

    await contact.save();

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'blustyles0@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <br>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

// Get all contact messages (admin only)
app.get("/api/contact", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    const messages = await Contact.find(query).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
});

// Update contact message status (admin only)
app.put("/api/contact/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json(message);
  } catch (error) {
    console.error('Error updating contact message:', error);
    res.status(500).json({ message: 'Failed to update message' });
  }
});

// Delete contact message (admin only)
app.delete("/api/contact/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact message:', error);
    res.status(500).json({ message: 'Failed to delete message' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Catch-all handler for SPA
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});