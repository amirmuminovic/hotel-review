import { Router } from 'express';

import { reviewControllers } from '../controllers';
import { isAuthenticated } from '../middleware';

const {
  getHotelReviewsController,
  createReviewController,
  toggleReactionController,
  getReviewController,
} = reviewControllers;

const router = Router();

router.post('/review', isAuthenticated, createReviewController);

router.get('/review-per-hotel/:hotelID', getHotelReviewsController);

router.post('/review/:reviewID/toggle-reaction', isAuthenticated, toggleReactionController);

router.get('/review/:reviewID', getReviewController);

export default router;
