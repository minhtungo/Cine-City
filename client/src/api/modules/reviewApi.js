import userClient from '../client/userClient';

const reviewEndpoints = {
  list: 'reviews',
  add: 'reviews',
  remove: ({ reviewId }) => `reviews/${reviewId}`,
  tmdbReviewList: ({ mediaId, mediaType }) => `${mediaType}/${mediaId}/reviews`,
};

const reviewApi = {
  addReview: async ({
    mediaId,
    mediaType,
    mediaTitle,
    mediaPoster,
    content,
  }) => {
    try {
      const response = await userClient.post(reviewEndpoints.add, {
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
  getTMDBReviewList: async ({ mediaId, mediaType }) => {
    try {
      const response = await userClient.get(
        reviewEndpoints.tmdbReviewList({
          mediaId,
          mediaType,
        })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default reviewApi;
