import { configureStore } from '@reduxjs/toolkit';
import { themeModeSlice } from './features/themeModeSlice';
import userSlice from './features/userSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    themeMode: themeModeSlice,
  },
});

export default store;
