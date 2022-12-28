import express from 'express';
import userRoute from './userRoute.js';
import reviewRoute from './reviewRoute.js';
import mediaRoute from './mediaRoute.js';
import castRoute from './castRoute.js';

const router = express.Router();

router.use('/user', userRoute);
router.use('/person', castRoute);
router.use('/:mediaType', mediaRoute);
router.use('/reviews', reviewRoute);

export default router;
