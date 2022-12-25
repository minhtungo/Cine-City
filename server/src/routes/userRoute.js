import express from 'express';
import { body } from 'express-validator';
// import favoriteControllers from '../controllers/favoriteControllers.js';
import userControllers from '../controllers/userController.js';
import requestHandler from '../handlers/requestHandler.js';
import tokenMiddleware from '../middleware/tokenMiddleware.js';

const router = express.Router();

router.post(
  '/signup',
  body('username')
    .exists()
    .withMessage('Username is required')
    .isLength({ min: 5 })
    .withMessage('Username must be at least 5 characters long')
    .custom(async (value) => {
      const user = await userModel.findOne({ username: value });
      if (user) {
        return Promise.reject('Username already in use');
      }
    }),
  body('password')
    .exists()
    .withMessage('Password is required')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long'),
  body('confirmPassword')
    .exists()
    .withMessage('Confirm password is required')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords must match');
      }
      return true;
    }),
  body('displayName')
    .exists()
    .withMessage('Display name is required')
    .isLength({ min: 5 })
    .withMessage('Display name must be at least 5 characters long'),
  requestHandler.validate,
  userControllers.signup
);

router.post(
  '/login',
  body('username')
    .exists()
    .withMessage('Username is required')
    .isLength({ min: 5 })
    .withMessage('Username must be at least 5 characters long'),
  body('password')
    .exists()
    .withMessage('Password is required')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords must match');
      }
      return true;
    }),
  requestHandler.validate,
  userControllers.login
);

router.put(
  'update-password',
  tokenMiddleware.auth,
  body('currentPassword')
    .exists()
    .withMessage('Current password is required')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long'),
  body('newPassword')
    .exists()
    .withMessage('New password is required')
    .isLength({ min: 5 })
    .withMessage('New password must be at least 5 characters long'),
  body('confirmNewPassword')
    .exists()
    .withMessage('Confirm password is required')
    .isLength({ min: 5 })
    .withMessage('Confirm password must be at least 5 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords must match');
      }
      return true;
    }),
  requestHandler.validate,
  userControllers.updatePassword
);



export default router;
