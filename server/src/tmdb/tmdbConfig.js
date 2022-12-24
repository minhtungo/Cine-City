const baseUrl = process.env.TMDB_BASE_URL;
const apiKey = process.env.TMDB_API_KEY;

const getUrl = (endpoint, params) => {
  const queryString = new URLSearchParams(params);

  return `${baseUrl}${endpoint}?api_key=${apiKey}&${queryString}`;
};

export default { getUrl };
