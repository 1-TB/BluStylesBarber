import express from "express";
const {authenticateToken, isAdmin} = require('../middleware/authenticateToken')
const {
  createContact,
  getContact,
  updateContact,
  deleteContact
} = require('../controller/contactController')
const router = express.Router()


//Contact Routes
router.post("/api/contact", createContact);

// Get all contact messages (admin only)
router.get("/api/contact", authenticateToken, isAdmin, getContact);

// Update contact message status (admin only)
router.put("/api/contact/:id", authenticateToken, isAdmin, updateContact);

// Delete contact message (admin only)
router.delete("/api/contact/:id", authenticateToken, isAdmin, deleteContact);

export default router;