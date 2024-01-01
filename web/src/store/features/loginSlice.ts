import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginParam } from '../../api/module/user';
import { Login } from '../../api';

type LoginStatus = 'login' | 'logout';

export interface LoginState {
  accessToken: string;
  freshToken: string;
  status: LoginStatus;
  userInfo: {
    username: string;
    password: string;
  };
}
const initialState: LoginState = {
  accessToken: '',
  status: 'logout',
  userInfo: {
    username: '',
    password: '',
  },
  freshToken: '',
};
export const loginStore = createAsyncThunk('login', async (payload: LoginParam, { dispatch }) => {
  const res = await Login(payload);
  if (res.success) {
    dispatch(afterLogin({ ...res.result, ...payload }));
  }
  return res;
});
export const loginSlice = createSlice({
  name: 'login',
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
  },
});
export const { afterLogin } = loginSlice.actions;

export default loginSlice.reducer;
