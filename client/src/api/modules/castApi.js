import guestClient from './../client/guestClient';

const castEndpoints = {
  detail: ({ castId: castId }) => `person/${castId}`,
  medias: ({ castId }) => `person/${castId}/medias`,
};

const castApi = {
  detail: async ({ castId }) => {
    try {
      const response = await guestClient.get(castEndpoints.detail({ castId }));

      return { response };
    } catch (error) {
      return { error };
    }
  },
  medias: async ({ castId }) => {
    try {
      const response = await guestClient.get(castEndpoints.medias({ castId }));

      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default castApi;
