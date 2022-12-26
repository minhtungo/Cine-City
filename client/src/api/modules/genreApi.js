import guestClient from './../client/guestClient';

const genreEndpoints = {
  list: ({ mediaType }) => `${mediaType}/genres`,
};

const genreApi = {
  getList: async ({ mediaType }) => {
    try {
      const response = await guestClient.get(
        genreEndpoints.list({ mediaType })
      );

      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default genreApi;