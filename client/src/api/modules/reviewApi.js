import userClient from '../userClient';

const reviewEndpoints = {
  list: 'reviews',
  create: 'reviews',
  remove: ({ reviewId }) => `review/${reviewId}`,
};

const reviewApi = {
  createReview: async ({
    mediaId,
    mediaType,
    mediaTitle,
    mediaPoster,
    content,
  }) => {
    try {
      const response = await userClient.post(reviewEndpoints.create, {
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        content,
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },
  removeReview: async ({ reviewId }) => {
    try {
      const response = await userClient.delete(
        reviewEndpoints.remove({ reviewId })
      );

      return { response };
    } catch (error) {
      return { error };
    }
  },
  getReviewList: async () => {
    try {
      const response = await userClient.get(reviewEndpoints.list);

      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default reviewApi;
