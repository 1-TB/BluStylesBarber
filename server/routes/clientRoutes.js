const express = require('express');
const {authenticateToken, isAdmin} = require('../middleware/authenticateToken')
const {
  postClient,
  getClient,
  putClient,
  deletedClient
} = require('../controller/clientController')

const router = express.Router({ mergeParams: true })

// Client Routes (Protected)
router.post("/api/clients", authenticateToken, isAdmin, postClient);
router.get("/api/clients", authenticateToken, isAdmin, getClient);
router.put("/api/clients/:id", authenticateToken, isAdmin, putClient);
router.delete("/api/clients/:id", authenticateToken, isAdmin, deletedClient);

module.exports = router;