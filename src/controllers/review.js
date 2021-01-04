import { HotelDataAccess, ReviewDataAccess, UserDataAccess } from '../data';
import { ratingTable } from '../utils';
import ReviewSchema from '../validations/ReviewSchema';

const getHotelReviewsController = async (req, res, next) => {
  const { hotelID } = req.params;
  const searchQuery = { hotelID };

  try {
    const reviewDataAccess = new ReviewDataAccess({ searchQuery });
    const reviews = await reviewDataAccess.fetchReviews();
    res.send(reviews);
  } catch (error) {
    next(error);
  }
};

const createReviewController = async (req, res, next) => {
  const review = req.body;

  try {
    await ReviewSchema.validateAsync(review);
    const reviewDataAccess = new ReviewDataAccess({ data: review });
    await reviewDataAccess.createReview();

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

const likeReactionController = async (req, res, next) => {
  const { _id: id } = req.user;
  const { reviewID } = req.params;
  const searchQuery = { _id: reviewID };

  try {
    const reviewDataAccess = new ReviewDataAccess({ searchQuery });
    const review = await reviewDataAccess.fetchReview();
    if (!review) {
      res.sendStatus(404);
    } else {
      const currentReaction = review.likes.map((userID) => String(userID)).includes(id);
      const currentOppositeReaction = review.dislikes.map((userID) => String(userID)).includes(id);
      if (!currentReaction) {
        review.likes = [
          ...review.likes,
          id,
        ];
        const hotel = await HotelDataAccess.fetchHotel({ _id: review.hotelID });
        hotel.rating += ratingTable.likes;
        await hotel.save();
      }
      if (currentOppositeReaction) {
        review.dislikes = review.dislikes.filter((userID) => String(userID) !== String(id));
        const hotel = await HotelDataAccess.fetchHotel({ _id: review.hotelID });
        hotel.rating -= ratingTable.dislikes;
        await hotel.save();
      }

      await review.save();
      res.sendStatus(200);
    }
  } catch (error) {
    next(error);
  }
};

const dislikeReactionController = async (req, res, next) => {
  const { _id: id } = req.user;
  const { reviewID } = req.params;
  const searchQuery = { _id: reviewID };

  try {
    const reviewDataAccess = new ReviewDataAccess({ searchQuery });
    const review = await reviewDataAccess.fetchReview();
    if (!review) {
      res.sendStatus(404);
    } else {
      const currentReaction = review.dislikes.map((userID) => String(userID)).includes(id);
      if (!currentReaction) {
        review.dislikes = [
          ...review.dislikes,
          id,
        ];
        const hotel = await HotelDataAccess.fetchHotel({ _id: review.hotelID });
        hotel.rating += ratingTable.dislikes;
        await hotel.save();
      }
      const currentOppositeReaction = review.likes.map((userID) => String(userID)).includes(id);
      if (currentOppositeReaction) {
        review.likes = review.likes.filter((userID) => String(userID) !== String(id));
        const hotel = await HotelDataAccess.fetchHotel({ _id: review.hotelID });
        hotel.rating -= ratingTable.likes;
        await hotel.save();
      }
      await review.save();
      res.sendStatus(200);
    }
  } catch (error) {
    next(error);
  }
};

const getReviewController = async (req, res, next) => {
  try {
    const { reviewID } = req.params;
    const searchQuery = { _id: reviewID };
    const reviewDataAccess = new ReviewDataAccess({ searchQuery });
    const review = await reviewDataAccess.fetchReview();

    if (review) {
      let userSearchQuery = { _id: { $in: review.likes } };
      const userDataAccess = new UserDataAccess({ searchQuery: userSearchQuery });
      const likes = await userDataAccess.fetchUsers();
      userSearchQuery = { _id: { $in: review.likes } };
      userDataAccess.setSearchQuery(userSearchQuery);
      const dislikes = await userDataAccess.fetchUsers();
      review.likes = likes;
      review.dislikes = dislikes;
      res.send(review);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

export default {
  getReviewController,
  likeReactionController,
  dislikeReactionController,
  createReviewController,
  getHotelReviewsController,
};
