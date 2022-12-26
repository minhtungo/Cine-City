import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'User',
  initialState: {
    user: null,
    favoriteList: [],
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload === null) {
        localStorage.removeItem('token');
      } else {
        if (action.payload.token)
          localStorage.setItem('token', action.payload.token);
      }

      state.user = action.payload;
    },
    setFavoriteList: (state, action) => {
      state.favoriteList = action.payload;
    },
    removeFavorite: (state, action) => {
      const { mediaId } = action.payload;
      state.favoriteList = [...state.favoriteList].filter(
        (item) => item.mediaId.toString() !== mediaId.toString()
      );
    },
    addFavorite: (state, action) => {
      state.favoriteList = [action.payload, ...state.favoriteList];
    },
  },
});

export const { setUser, setFavoriteList, removeFavorite, addFavorite } =
  userSlice.actions;

export default userSlice.reducer;
