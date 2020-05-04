import { ReviewDataAccess, UserDataAccess } from '../data';

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
    const reviewDataAccess = new ReviewDataAccess({ data: review });
    await reviewDataAccess.createReview();

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

const toggleReactionController = async (req, res, next) => {
  const { reaction } = req.body;
  const { _id: id } = req.user;
  const { reviewID } = req.params;
  const searchQuery = { _id: reviewID };

  try {
    const reviewDataAccess = new ReviewDataAccess({ searchQuery });
    const review = await reviewDataAccess.fetchReview();
    if (!review) {
      res.sendStatus(404);
    } else {
      const currentReaction = review[reaction].map((userID) => String(userID)).includes(id);
      if (!currentReaction) {
        review[reaction] = [
          ...review[reaction],
          id,
        ];
      } else {
        review[reaction] = review[reaction].filter((userID) => String(userID) !== String(id));
      }
      reviewDataAccess.setData({ [reaction]: review[reaction] });
      await reviewDataAccess.updateReview();
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
  toggleReactionController,
  createReviewController,
  getHotelReviewsController,
};
