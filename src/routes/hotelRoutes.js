import { Router } from 'express';

import { hotelControllers } from '../controllers';
import { isAuthenticated, isAdmin } from '../middleware';

const {
  getHotelController,
  getHotelsController,
  createHotelController,
  updateHotelController,
  deleteHotelController,
} = hotelControllers;

const router = Router();

router.post('/hotels/search', getHotelsController);

router.get('/hotels/:hotelID', getHotelController);

router.delete('/hotels/:hotelID', isAuthenticated, isAdmin, deleteHotelController);

router.post('/hotels', isAuthenticated, isAdmin, createHotelController);

router.patch('/hotels/:hotelID', isAuthenticated, isAdmin, updateHotelController);

export default router;
