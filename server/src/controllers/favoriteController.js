import responseHandler from '../handlers/responseHandler.js';
import favoriteModel from './../models/Favorite.js';

const addFavorite = async (req, res) => {
  try {
    const isFavorite = await favoriteModel.findOne({
      user: req.user.id,
      mediaId: req.body.mediaId,
    });

    if (isFavorite) return responseHandler.successResponse(res, isFavorite);

    const favorite = new favoriteModel({
      ...req.body,
      user: req.user.id,
    });

    await favorite.save();

    responseHandler.createdResponse(res, favorite);
  } catch (error) {
    responseHandler.errorResponse(res);
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { favoriteId } = req.params;

    const favorite = await favoriteModel.findOne({
      user: req.user.id,
      _id: favoriteId,
    });

    if (!favorite) return responseHandler.notFoundResponse(res);

    await favorite.remove();

    responseHandler.createdResponse(res);
  } catch (error) {
    responseHandler.errorResponse(res);
  }
};

const getFavoriteList = async (req, res) => {
  try {
    const favoriteList = await favoriteModel
      .find({ user: req.user.id })
      .sort('-createdAt');
    responseHandler.successResponse(res, favoriteList);
  } catch (error) {
    responseHandler.errorResponse(res);
  }
};

export default { addFavorite, removeFavorite, getFavoriteList };
