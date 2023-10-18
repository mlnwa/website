import React from 'react';
import style from './login.module.scss';
import { loginStore } from '../../store/features/loginSlice';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';

const Login = function () {
  const dispatch = useDispatch<AppDispatch>();
  dispatch(
    loginStore({
      username: 'admin',
      password: '111',
    }),
  );
  return <div>login</div>;
};

export default Login;
