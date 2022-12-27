import axiosClient from '../axios/axiosClient.js';
import tmdbEndpoints from './tmdbEndpoints.js';

const tmdbApi = {
  mediaList: async ({ mediaType, mediaCategory, page }) =>
    await axiosClient.fetchData(
      tmdbEndpoints.mediaList({ mediaType, mediaCategory, page })
    ),
  mediaDetail: async ({ mediaType, mediaId }) =>
    await axiosClient.fetchData(
      tmdbEndpoints.mediaDetails({ mediaType, mediaId })
    ),
  mediaGenres: async ({ mediaType }) =>
    await axiosClient.fetchData(tmdbEndpoints.mediaGenres({ mediaType })),
  mediaCredits: async ({ mediaType, mediaId }) =>
    await axiosClient.fetchData(
      tmdbEndpoints.mediaCredits({ mediaType, mediaId })
    ),
  mediaVideos: async ({ mediaType, mediaId }) =>
    await axiosClient.fetchData(
      tmdbEndpoints.mediaVideos({ mediaType, mediaId })
    ),
  mediaImages: async ({ mediaType, mediaId }) =>
    await axiosClient.fetchData(
      tmdbEndpoints.mediaImages({ mediaType, mediaId })
    ),
  mediaRecommend: async ({ mediaType, mediaId }) =>
    await axiosClient.fetchData(
      tmdbEndpoints.mediaRecommendations({ mediaType, mediaId })
    ),
  mediaSearch: async ({ mediaType, query, page }) =>
    await axiosClient.fetchData(
      tmdbEndpoints.mediaSearch({ mediaType, query, page })
    ),
  personDetail: async ({ personId }) =>
    await axiosClient.fetchData(tmdbEndpoints.personDetail({ personId })),
  personMedias: async ({ personId }) =>
    await axiosClient.fetchData(tmdbEndpoints.personMedias({ personId })),
};

export default tmdbApi;
