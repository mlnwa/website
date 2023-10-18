import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Login, LoginParam } from '../../api/module/user';
export interface LoginState {
  token: string;
  userInfo: {
    userId: string;
    password: string;
  };
}

const initialState: LoginState = {
  token: '',
  userInfo: {
    userId: '',
    password: '',
  },
};
export const loginStore = createAsyncThunk('login', async (payload: LoginParam, { dispatch }) => {
  const res = await Login(payload);
  console.log(res.result);
  return res;
});
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    afterLogin: (state, { payload }) => {
      console.log(state);
      state.token = payload.token;
      state.userInfo.userId = payload.userId;
      state.userInfo.password = payload.password;
    },
  },
});
export const { afterLogin } = loginSlice.actions;

export default loginSlice.reducer;
