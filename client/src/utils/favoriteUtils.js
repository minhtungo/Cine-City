const favoriteUtils = {
  check: ({ favoriteList, mediaId }) =>
    favoriteList &&
    favoriteList.find(
      (item) => item.mediaId.toString() === mediaId.toString()
    ) !== undefined,
};

export default favoriteUtils;
