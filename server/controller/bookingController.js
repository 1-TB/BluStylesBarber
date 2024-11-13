const transporter = require('../config/nodeMailer');
const validateEmail = require('../utils/validateEmail');
const validatePhone = require('../utils/validatePhone');
const Booking = require('../models/bookingSchema');

// Booking Controller Methods
export const createBooking = async (req, res) => {
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
};

// Get all bookings (admin only)
export const getBookings = async (req, res) => {
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
};

// Update booking status (admin only)
export const updateBooking = async (req, res) => {
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
};

export const deleteBooking = async (req, res) => {
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
};