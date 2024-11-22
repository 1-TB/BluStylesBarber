import express from 'express';
import { getAllCuts, getCutById, createCut, updateCut, deleteCut } from '../controller/cutsController.mjs';

const router = express.Router();

// Get all cuts
router.get('/api/cuts', getAllCuts);

// Get single cut by ID 
router.get('/api/cuts/:id', getCutById);

// Create new cut
router.post('/api/cuts', createCut);

// Update cut
router.put('/api/cuts/:id', updateCut);

// Delete cut
router.delete('/api/cuts/:id', deleteCut);

export default router;

