import axiosClient from '../axios/axios.client.js';
import tmdbEndpoints from './tmdb.endpoints.js';

const tmdbApi = {
  mediaList: async ({ mediaType, mediaCategory, page }) =>
    await axiosClient.get(
      tmdbEndpoints.mediaList({ mediaType, mediaCategory, page })
    ),
  mediaDetail: async ({ mediaType, mediaId }) =>
    await axiosClient.fetchData(tmdbEndpoints.mediaDetail({ mediaType, mediaId })),
  mediaGenres: async ({ mediaType }) =>
    await axiosClient.fetchData(tmdbEndpoints.mediaGenres({ mediaType })),
  mediaCredits: async ({ mediaType, mediaId }) =>
    await axiosClient.fetchData(tmdbEndpoints.mediaCredits({ mediaType, mediaId })),
  mediaVideos: async ({ mediaType, mediaId }) =>
    await axiosClient.fetchData(tmdbEndpoints.mediaVideos({ mediaType, mediaId })),
  mediaImages: async ({ mediaType, mediaId }) =>
    await axiosClient.fetchData(tmdbEndpoints.mediaImages({ mediaType, mediaId })),
  mediaRecommend: async ({ mediaType, mediaId }) =>
    await axiosClient.fetchData(tmdbEndpoints.mediaRecommend({ mediaType, mediaId })),
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
