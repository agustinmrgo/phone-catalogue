import express from 'express';
import { 
  getAllPhones, 
  getPhoneById, 
  getPhonesStats 
} from '../controllers/phones.controller.js';

const router = express.Router();

// GET /api/phones - Get all phones with filtering, sorting, and pagination
router.get('/phones', getAllPhones);

// GET /api/phones/stats - Get phones statistics
router.get('/phones/stats', getPhonesStats);

// GET /api/phones/:id - Get phone by ID
router.get('/phones/:id', getPhoneById);

export default router;