import express from 'express';
import userRoute from './userRoute.js';

const router = express.Router();

router.use('/user', userRoute);
router.use('/:mediaType', mediaRoute);

export default router;
