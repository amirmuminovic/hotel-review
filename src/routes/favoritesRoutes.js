import { Router } from 'express';

import { favoritesControllers } from '../controllers';
import { isAuthenticated } from '../middleware';

const {
  favoriteHotelController,
  unfavoriteHotelController,
  viewfavoriteHotelsController,
} = favoritesControllers;

const router = Router();

router.post('/hotel/:hotelID/favorite', isAuthenticated, favoriteHotelController);
router.post('/hotel/:hotelID/unfavorite', isAuthenticated, unfavoriteHotelController);
router.get('/favorites', isAuthenticated, viewfavoriteHotelsController);

export default router;
