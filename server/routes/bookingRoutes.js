import express from 'express';
import {
  bookEvent,
  getMyBookings,
  getAllBookings
} from '../controllers/bookingController.js';
import authenticateToken from '../middleware/authenticateToken.js';
import { isAdmin } from '../middleware/admin.js';

const router = express.Router();

router.post('/:event_id', authenticateToken, bookEvent);


router.get('/my', authenticateToken, getMyBookings);


router.get('/', authenticateToken, isAdmin, getAllBookings);

export default router;
