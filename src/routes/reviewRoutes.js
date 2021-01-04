import { Router } from 'express';

import { reviewControllers } from '../controllers';
import { isAuthenticated } from '../middleware';

const {
  getHotelReviewsController,
  createReviewController,
  likeReactionController,
  dislikeReactionController,
  getReviewController,
} = reviewControllers;

const router = Router();

router.post('/review', isAuthenticated, createReviewController);

router.get('/review-per-hotel/:hotelID', getHotelReviewsController);

router.post('/review/:reviewID/like', isAuthenticated, likeReactionController);
router.post('/review/:reviewID/dislike', isAuthenticated, dislikeReactionController);

router.get('/review/:reviewID', getReviewController);

export default router;
