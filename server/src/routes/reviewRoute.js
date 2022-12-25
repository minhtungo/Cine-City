import express from 'express';
import { body } from 'express-validator';
import requestHandler from '../handlers/requestHandler.js';
import tokenMiddleware from '../middlewares/tokenMiddleware.js';
import reviewController from '../controllers/reviewController.js';

const router = express.Router({ mergeParams: true });

router.get('/', tokenMiddleware.auth, reviewController.getReviewsList);

router.post(
  '/',
  tokenMiddleware.auth,
  body('mediaId')
    .exists()
    .withMessage('mediaId is required')
    .isLength({ min: 1 })
    .withMessage('mediaId can not be empty'),
  body('content')
    .exists()
    .withMessage('Content is required')
    .isLength({ min: 1 })
    .withMessage('Content can not be empty'),
  body('mediaType')
    .exists()
    .withMessage('mediaType is required')
    .custom((type) => ['movie', 'tv'].includes(type))
    .withMessage('Invalid mediaType'),
  body('mediaTitle').exists().withMessage('mediaTitle is required'),
  body('mediaPoster').exists().withMessage('mediaPoster is required'),
  requestHandler.validate,
  reviewController.createReview
);

router.delete(
  '/:reviewId',
  tokenMiddleware.auth,
  reviewController.removeReview
);

export default router;