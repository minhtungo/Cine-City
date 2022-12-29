import responseHandler from '../handlers/responseHandler.js';
import tmdbApi from './../tmdb/tmdbApi.js';
import tokenMiddleware from '../middlewares/tokenMiddleware.js';
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
    responseHandler.errorResponse(res);
  }
};

const getMediaGenres = async (req, res) => {
  try {
    const { mediaType } = req.params;

    const response = await tmdbApi.mediaGenres({ mediaType });

    return responseHandler.successResponse(res, response);
  } catch {
    responseHandler.errorResponse(res);
  }
};

const searchMedia = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { query, page } = req.query;

    const response = await tmdbApi.mediaSearch({
      mediaType: mediaType === 'people' ? 'person' : mediaType,
      query,
      page,
    });

    responseHandler.successResponse(res, response);
  } catch {
    responseHandler.errorResponse(res);
  }
};

const searchMultiMedia = async (req, res) => {
  try {
    console.log('hj');
    const { query, page } = req.query;

    const response = await tmdbApi.mediaMultiSearch({
      query,
      page,
    });

    responseHandler.successResponse(res, response);
  } catch {
    responseHandler.errorResponse(res);
  }
};

const getMediaDetail = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;

    const media = await tmdbApi.mediaDetail({ mediaType, mediaId });

    media.credits = await tmdbApi.mediaCredits({ mediaType, mediaId });
    media.videos = await tmdbApi.mediaVideos({ mediaType, mediaId });
    media.recommendations = await tmdbApi.mediaRecommend({
      mediaType,
      mediaId,
    });
    media.images = await tmdbApi.mediaImages({ mediaType, mediaId });

    const tokenDecoded = tokenMiddleware.tokenDecode(req);

    if (tokenDecoded) {
      const user = await userModel.findById(tokenDecoded.data);

      if (user) {
        const isFavorite = await favoriteModel.findOne({
          user: user.id,
          mediaId,
        });
        media.isFavorite = isFavorite !== null;
      }
    }

    media.reviews = await reviewModel
      .find({ mediaId })
      .populate('user')
      .sort('-createdAt');

    responseHandler.successResponse(res, media);
  } catch (error) {
    console.log(error);
    responseHandler.errorResponse(res);
  }
};

export default {
  getMediaList,
  getMediaGenres,
  searchMedia,
  getMediaDetail,
  searchMultiMedia,
};
