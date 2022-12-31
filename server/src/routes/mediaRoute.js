import express from 'express';
import mediaControllers from '../controllers/mediaControllers.js';

const router = express.Router({ mergeParams: true });

router.get('/search', mediaControllers.searchMedia);

router.get('/genres', mediaControllers.getMediaGenres);

router.get('/detail/:mediaId', mediaControllers.getMediaDetail);

router.get('/:mediaId/reviews', mediaControllers.getTMDBReviewList);

router.get('/:mediaCategory', mediaControllers.getMediaList);

router.get('/:mediaCategory/*', mediaControllers.getMediaList);

export default router;
