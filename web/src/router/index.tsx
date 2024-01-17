import { RouteObject, createBrowserRouter, createHashRouter } from 'react-router-dom';
import App from '../App';
import Blog from '../pages/blog/blog';
import Experiment from '../pages/experiment/experiment';
import Archives from '../pages/archives/archives';
import React from 'react';
import { SemanticICONS } from 'semantic-ui-react';
import Login from '../pages/login/login';
import adminRoute from './routes/admin';
import Permission from './Permission';
import BlogDetail from '../pages/blogDetail/blogDetail';
type CustomProps = {
  icon: SemanticICONS;
  label: string;
};
export type CustomRoute = RouteObject & {
  customProp: CustomProps;
  authorize: boolean;
  children?: CustomRoute[];
};
// 游客内容
export const root = {
  path: '/',
  element: <App></App>,
  children: [
    {
      index: true,
      path: '/',
      id: 'blog',
      element: <Blog></Blog>,
      customProp: {
        icon: 'home',
        label: '博客',
      },
    },
    {
      path: '/archives',
      element: <Archives></Archives>,
      customProp: {
        icon: 'clone',
        label: '归档',
      },
    },
    {
      path: '/experiment',
      element: <Experiment></Experiment>,
      customProp: {
        icon: 'lab',
        label: '实验中心',
      },
    },
    {
      path: '/detail/:id',
      element: <BlogDetail></BlogDetail>,
    },
  ],
} as CustomRoute;
// 发布者
export const author: RouteObject[] = [
  {
    path: '/login',
    element: <Login></Login>,
  },
];
export const routerList = [root, ...author, adminRoute] as CustomRoute[];

function permissionRoutes(routerList: CustomRoute[]) {
  return routerList.map((item: CustomRoute) => {
    if (item.element) {
      item.element = <Permission authorize={item.authorize}>{item.element}</Permission>;
    }
    if (item.children) {
      item.children = permissionRoutes(item.children);
    }
    return item;
  });
}
let routes = permissionRoutes(routerList);
export const router = createHashRouter(routes);
// export const router = createBrowserRouter(routes);
