import express from 'express';
import mediaControllers from '../controllers/mediaControllers.js';

const router = express.Router({ mergeParams: true });

router.get('/multi', mediaControllers.searchMultiMedia);

router.get('/', mediaControllers.searchMedia);

export default router;
