import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import { routerList } from '.';
import { IMessage } from '../components/IMessage';
// type Props = {
//   children: React.ReactNode;
//   authorize: boolean;
// };
const Permission = ({ children, authorize }: any) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token') || '';
  //   const loginStatus = useSelector((state: any) => state.login.loginStatus);
  const _logcation = useLocation();
  const mathchs = matchRoutes(routerList, _logcation.pathname);
  const isEXist = mathchs?.some((item) => item.pathname == _logcation.pathname);
  useEffect(() => {
    if (token == '' && authorize) {
      IMessage.error('请先登录');
      navigate('/login');
    }
    if (token && isEXist) {
      if (_logcation.pathname == '/' || _logcation.pathname == '/login') {
        navigate('/');
      } else {
        navigate(_logcation.pathname, { replace: true });
      }
    }
  }, [token, _logcation.pathname]);
  return children;
};

export default Permission;
