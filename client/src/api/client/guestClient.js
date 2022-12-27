import axios from 'axios';
import queryString from 'query-string';

const baseURL = import.meta.env.DEV
  ? 'http://127.0.0.1:5000/api/v1/'
  : 'https://cine-city-api-minhtungo.vercel.app/api/v1/';

const guestClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

guestClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
    },
  };
});

guestClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error.response.data;
  }
);

export default guestClient;
