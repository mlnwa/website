import React from 'react';
import { CustomRoute } from '..';
import Layout from '../../Layout';

const adminRoute = {
  path: '/admin',
  element: <Layout></Layout>,
  children: [
    {
      index: true,
      path: '/admin',
      element: <div>Admin Dashboard</div>,
      customProp: {
        icon: 'add user',
        label: 'add user',
      },
    },
    {
      path: '/admin/users',
      element: <div>Admin Users</div>,
      customProp: {
        icon: 'add user',
        label: 'add user',
      },
    },
    {
      path: '/admin/products',
      element: <div>Admin Products</div>,
      customProp: {
        icon: 'add user',
        label: 'add user',
      },
    },
  ],
} as CustomRoute;

export default adminRoute;
