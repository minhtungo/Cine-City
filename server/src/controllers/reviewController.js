import responseHandler from '../handlers/responseHandler.js';
import reviewModel from '../models/Review.js';

const createReview = async (req, res) => {
  try {
    const { movieId } = req.params;

    const newReview = new reviewModel({
      user: req.user.id,
      movieId,
      ...req.body,
    });

    await newReview.save();

    responseHandler.success(res, {
      ...review._doc,
      id: review.id,
      user: req.user,
    });
  } catch (error) {
    responseHandler.error(res);
  }
};

const removeReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await reviewModel.findOne({
      _id: reviewId,
      user: req.user.id,
    });

    if (!review) return responseHandler.notFoundResponse(res);

    await review.remove();

    responseHandler.successResponse(res);
  } catch (error) {
    responseHandler.error(res);
  }
};

const getReviewsList = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find({
        user: req.user.id,
      })
      .sort('-createdAt');

    responseHandler.success(res, reviews);
  } catch (error) {
    responseHandler.error(res);
  }
};

export default {
  createReview,
  removeReview,
  getReviewsList,
};
