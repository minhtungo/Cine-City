import responseHandler from '../handlers/responseHandler.js';
import tmdbApi from './../tmdb/tmdbApi.js';
import tokenMiddleware from '../middleware/tokenMiddleware.js';
import userModel from '../models/User.js';
import favoriteModel from './../models/Favorite.js';
import reviewModel from '../models/Review.js';

const getMediaList = async (req, res) => {
  try {
    const { page } = req.query;
    const { mediaType, mediaCategory } = req.params;

    const response = await tmdbApi.mediaList({
      mediaType,
      mediaCategory,
      page,
    });

    return responseHandler.successResponse(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getMediaGenres = async (req, res) => {
  try {
    const { mediaType } = req.params;

    const response = await tmdbApi.mediaGenres({ mediaType });

    return responseHandler.successResponse(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const searchMedia = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { query, page } = req.query;

    mediaType = mediaType === 'people' ? 'person' : mediaType;

    const response = await tmdbApi.searchMedia({ mediaType, query, page });

    responseHandler.successResponse(res, response);
  } catch {
    responseHandler.error(res);
  }
};



export default {
  getMediaList,
  getMediaGenres,
  searchMedia,

};
