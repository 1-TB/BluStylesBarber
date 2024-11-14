import express from "express";
const {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking
} = require('../controller/bookingController');
const {authenticateToken, isAdmin} = require('../middleware/authenticateToken');
const router = express.Router();

// Booking Routes
router.post("/api/bookings", createBooking);

// Get all bookings (admin only)
router.get("/api/bookings", authenticateToken, isAdmin, getBookings);

// Update booking status (admin only)
router.put("/api/bookings/:id", authenticateToken, isAdmin, updateBooking);

// Delete booking (admin only)
router.delete("/api/bookings/:id", authenticateToken, isAdmin, deleteBooking);

export default router;