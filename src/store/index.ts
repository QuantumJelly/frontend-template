// store/configureStore.ts
import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../pages/Home/slice';

const store = configureStore({
  reducer: {
    home: homeReducer,
    // 其他 slices
  },
});

export default store;
