import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Login, LoginParam } from '../../api/module/user';
export interface LoginState {
  accessToken: string;
  freshToken: string;
  userInfo: {
    username: string;
    password: string;
  };
}

const initialState: LoginState = {
  accessToken: '',
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
      state.userInfo.username = payload.username;
      state.userInfo.password = payload.password;
    },
  },
});
export const { afterLogin } = loginSlice.actions;

export default loginSlice.reducer;
