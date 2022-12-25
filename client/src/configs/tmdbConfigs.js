const mediaType = {
  movie: 'movie',
  tv: 'tv',
};

const mediaCategory = {
  popular: 'popular',
  top_rated: 'top_rated',
};

const backdropPath = (imgEndpoint) =>
  `https://image/tmdb.org/t/p/original${imgEndpoint}`;

const posterPath = (imgEndpoint) =>
  `https://image/tmdb.org/t/p/w500${imgEndpoint}`;

const youtubePath = (videoId) =>
  `https://youtube.com/embed/${videoId}?controls=0`;

export default tmdbConfigs = {
  mediaType,
  mediaCategory,
  backdropPath,
  posterPath,
  youtubePath,
};