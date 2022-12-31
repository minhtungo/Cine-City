import tmdbConfig from './tmdbConfig.js';

const tmdbEndpoints = {
  mediaList: ({ mediaType, mediaCategory, page }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaCategory}`, { page }),
  tmdbReviewList: ({ mediaId, mediaType }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaId}/reviews`),
  trendingList: ({ mediaType, mediaCategory, timeWindow }) =>
    tmdbConfig.getUrl(`${mediaCategory}/${mediaType}/${timeWindow}`),
  mediaDetails: ({ mediaType, mediaId }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaId}`),
  mediaGenres: ({ mediaType }) => tmdbConfig.getUrl(`genre/${mediaType}/list`),
  mediaCredits: ({ mediaType, mediaId }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaId}/credits`),
  mediaVideos: ({ mediaType, mediaId }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaId}/videos`),
  mediaRecommendations: ({ mediaType, mediaId }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaId}/recommendations`),
  mediaImages: ({ mediaType, mediaId }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaId}/images`),
  mediaSearch: ({ mediaType, query, page }) =>
    tmdbConfig.getUrl(`search/${mediaType}`, { query, page }),
  mediaMultiSearch: ({ query, page }) =>
    tmdbConfig.getUrl(`search/multi`, { query, page }),
  castDetail: ({ castId }) => tmdbConfig.getUrl(`person/${castId}`),
  castMedias: ({ castId }) =>
    tmdbConfig.getUrl(`person/${castId}/combined_credits`),
};

export default tmdbEndpoints;
