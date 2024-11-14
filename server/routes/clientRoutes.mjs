import express from "express";
import { authenticateToken, isAdmin } from '../middleware/authenticateToken.mjs';
import {
  postClient,
  getClient,
  putClient,
  deletedClient
} from '../controller/clientController.mjs';

const router = express.Router({ mergeParams: true });

router.post("/api/clients", authenticateToken, isAdmin, postClient);
router.get("/api/clients", authenticateToken, isAdmin, getClient);
router.put("/api/clients/:id", authenticateToken, isAdmin, putClient);
router.delete("/api/clients/:id", authenticateToken, isAdmin, deletedClient);

export default router;