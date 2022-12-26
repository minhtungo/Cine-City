import userClient from '../client/userClient';

const favoriteEndpoints = {
  list: 'user/favorites',
  addFavorite: 'user/favorites',
  removeFavorite: ({ favoriteId }) => `user/favorites/${favoriteId}`,
};

const favoriteApi = {
  getFavoriteList: async () => {
    try {
      const response = await userClient.get(favoriteEndpoints.list);
      return { response };
    } catch (error) {
      return { error };
    }
  },
  addFavorite: async ({
    mediaId,
    mediaType,
    mediaTitle,
    mediaPoster,
    mediaRate,
  }) => {
    try {
      const response = await userClient.post(favoriteEndpoints.addFavorite, {
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        mediaRate,
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },
  removeFavorite: async ({ favoriteId }) => {
    try {
      const response = await userClient.delete(
        favoriteEndpoints.remove({ favoriteId })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default favoriteApi;
