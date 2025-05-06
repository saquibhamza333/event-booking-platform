
import express from 'express';
import {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent
} from '../controllers/eventController.js';

import { isAdmin } from '../middleware/admin.js';
import authenticateToken from '../middleware/authenticateToken.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getAllEvents);
router.post('/', authenticateToken, isAdmin, upload.single('photo'), createEvent);
router.put('/:id', authenticateToken, isAdmin, updateEvent);
router.delete('/:id', authenticateToken, isAdmin, deleteEvent);

export default router;
