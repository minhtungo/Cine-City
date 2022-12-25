import guestClient from './../client/guestClient';
import userClient from './../client/userClient';

const userEndpoints = {
  login: 'user/login',
  signup: 'user/signup',
  getInfo: 'user/info',
  updatePassword: 'user/update-password',
  getFavorites: 'user/favorites',
  addFavorite: 'user/favorites',
};

const userApi = {
  login: async ({ username, password }) => {
    try {
      const response = await guestClient.post(userEndpoints.login, {
        username,
        password,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
  signup: async ({ username, password, confirmPassword, displayName }) => {
    try {
      const response = await guestClient.post(userEndpoints.signup, {
        username,
        password,
        confirmPassword,
        displayName,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
  getInfo: async () => {
    try {
      const response = await userClient.get(userEndpoints.getInfo);
      return { response };
    } catch (error) {
      return { error };
    }
  },
  updatePassword: async ({
    currentPassword,
    newPassword,
    confirmNewPassword,
  }) => {
    try {
      const response = await userClient.post(userEndpoints.updatePassword, {
        currentPassword,
        newPassword,
        confirmNewPassword,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
};