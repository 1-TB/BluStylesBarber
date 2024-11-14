import express from "express";
import {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking
 } from '../controller/bookingController.mjs';
import { authenticateToken, isAdmin } from '../middleware/authenticateToken.mjs';
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