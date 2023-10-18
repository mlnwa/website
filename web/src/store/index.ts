import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import loginSlice from './features/loginSlice';

const store = configureStore({
  reducer: {
    login: loginSlice,
  },
});
export type AppDispatch = typeof store.dispatch;
export default store;
