import { Router } from 'express';

import { hotelControllers } from '../controllers';
import { isAuthenticated, isAdmin } from '../middleware';

const {
  getHotelController,
  getHotelsController,
  createHotelController,
  updateHotelController,
} = hotelControllers;

const router = Router();

router.get('/hotels', getHotelsController);
router.get('/hotel/:hotelID', getHotelController);
router.post('/hotel', isAuthenticated, isAdmin, createHotelController);
router.patch('/hotel/:hotelID', isAuthenticated, isAdmin, updateHotelController);

export default router;
