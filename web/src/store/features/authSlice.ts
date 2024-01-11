import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginParam } from '../../api/module/user';
import { Login } from '../../api';

type AuthStatus = 'login' | 'logout';

export interface AuthState {
  accessToken: string;
  freshToken: string;
  status: AuthStatus;
  userInfo: {
    username: string;
    password: string;
  };
}
const initialState: AuthState = {
  accessToken: '',
  status: 'logout',
  userInfo: {
    username: '',
    password: '',
  },
  freshToken: '',
};
export const toLogin = createAsyncThunk('auth/login', async (payload: LoginParam, { dispatch }) => {
  const res = await Login(payload);
  if (res.success) {
    dispatch(afterLogin({ ...res.result, ...payload }));
  }
  return res;
});
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    afterLogin: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.freshToken = payload.freshToken;
      state.status = 'login';
      state.userInfo.username = payload.username;
      state.userInfo.password = payload.password;
      localStorage.setItem('access_token', payload.accessToken);
    },
    logout: (state) => {
      state.accessToken = '';
      state.freshToken = '';
      state.status = 'logout';
      state.userInfo.username = '';
      state.userInfo.password = '';
      localStorage.removeItem('access_token');
    },
  },
});
export const { afterLogin } = authSlice.actions;

export default authSlice.reducer;
