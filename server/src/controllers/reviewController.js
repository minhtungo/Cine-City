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

    responseHandler.successResponse(res, {
      ...newReview._doc,
      id: newReview.id,
      user: req.user,
    });
  } catch (error) {
    responseHandler.errorResponse(res);
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
    responseHandler.errorResponse(res);
  }
};

const getReviewsList = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find({
        user: req.user.id,
      })
      .sort('-createdAt');

    responseHandler.successResponse(res, reviews);
  } catch (error) {
    responseHandler.errorResponse(res);
  }
};

export default {
  createReview,
  removeReview,
  getReviewsList,
};
