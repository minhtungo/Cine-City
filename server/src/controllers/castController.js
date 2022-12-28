import responseHandler from '../handlers/responseHandler.js';
import tmdbApi from './../tmdb/tmdbApi.js';

const castDetail = async (req, res) => {
  try {
    const { castId } = req.params;

    const cast = await tmdbApi.castDetail({ castId });

    responseHandler.successResponse(res, cast);
  } catch {
    responseHandler.errorResponse(res);
  }
};

const castMedias = async (req, res) => {
  try {
    console.log('hello');
    const { castId } = req.params;
    const medias = await tmdbApi.castMedias({ castId });

    responseHandler.successResponse(res, medias);
  } catch {
    responseHandler.errorResponse(res);
  }
};

export default { castDetail, castMedias };
