import { configureStore, applyMiddleware, Action, ThunkAction } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import blogMetaReducer from './features/blogMetaSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    blogMeta: blogMetaReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export default store;
