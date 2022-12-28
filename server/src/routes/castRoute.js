import express from 'express';
import castController from '../controllers/castController.js';

const router = express.Router({ mergeParams: true });

router.get('/:castId/medias', castController.castMedias);

router.get('/:castId', castController.castDetail);

export default router;
