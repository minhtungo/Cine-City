import express from 'express';
import mediaControllers from '../controllers/mediaControllers';

const router = express.Router({ mergeParams: true });

router.get('/search', mediaControllers.searchMedia);

router.get('/genres', mediaControllers.getMediaGenres);

router.get('/detail/:mediaId', mediaControllers.getMediaDetail);

router.get('/:mediaCategory', mediaControllers.getMediaList);

export default router;