import express from "express";
import { authenticateToken, isAdmin } from '../middleware/authenticateToken.mjs';
import {
  createContact,
  getContacts,
  updateContact,
  deleteContact
} from '../controller/contactController.mjs';

const router = express.Router({ mergeParams: true });

router.post("/api/contact", createContact);
router.get("/api/contact", authenticateToken, isAdmin, getContacts); 
router.put("/api/contact/:id", authenticateToken, isAdmin, updateContact);
router.delete("/api/contact/:id", authenticateToken, isAdmin, deleteContact);

export default router;