import express from 'express';
import userRoute from './userRoute.js';
import mediaRoute from './mediaRoute.js';
import reviewRoute from './reviewRoute.js';

const router = express.Router();

router.use('/user', userRoute);
router.use('/:mediaType', mediaRoute);
router.use('/reviews', reviewRoute);

export default router;
