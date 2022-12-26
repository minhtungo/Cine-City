import userModel from '../models/User.js';
import jsonwebtoken from 'jsonwebtoken';
import responseHandler from '../handlers/responseHandler.js';

const signup = async (req, res) => {
  try {
    const { username, password, displayName } = req.body;

    const user = await userModel.findOne({ username });

    if (user)
      return responseHandler.badRequestResponse(res, 'User already exists');

    const newUser = new userModel();

    newUser.username = username;
    newUser.displayName = displayName;
    newUser.setPassword(password);

    await newUser.save();

    const token = jsonwebtoken.sign(
      { data: newUser.id },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: '24h' }
    );

    responseHandler.createdResponse(res, {
      token,
      ...newUser._doc,
      id: newUser.id,
    });
  } catch (err) {
    responseHandler.errorResponse(res);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel
      .findOne({ username })
      .select('username password salt id displayName');

    if (!user)
      return responseHandler.badRequestResponse(
        res,
        'Invalid username or password'
      );

    if (!user.validatePassword(password))
      return responseHandler.badRequestResponse(res, 'Invalid password');

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: '24h' }
    );

    user.password = undefined;
    user.salt = undefined;

    responseHandler.successResponse(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch (error) {
    responseHandler.errorResponse(res);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await userModel
      .findById(req.user.id)
      .select('password id salt');

    if (!user) return responseHandler.unauthorizedResponse(res);
    if (!user.validatePassword(currentPassword))
      return responseHandler.badRequestResponse(res, 'Invalid password');

    user.setPassword(newPassword);

    await user.save();

    responseHandler.successResponse(res, {
      message: 'Password updated successfully',
    });
  } catch (error) {
    responseHandler.errorResponse(res);
  }
};

const getUserInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user) return responseHandler.notFoundResponse(res);

    responseHandler.successResponse(res, user);
  } catch (error) {
    responseHandler.errorResponse(res);
  }
};

export default {
  signup,
  login,
  updatePassword,
  getUserInfo,
};
