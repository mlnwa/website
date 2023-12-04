import React from 'react';
import { CustomRoute } from '..';
import Layout from '../../Layout';
import BlogList from '../../admin/blog/blogList';

const adminRoute = {
  path: '/admin',
  element: <Layout></Layout>,
  children: [
    {
      index: true,
      path: '/admin',
      element: <div>Admin index</div>,
      customProp: {
        icon: 'add user',
        label: '首页',
      },
    },
    {
      path: '/admin/blog',
      customProp: {
        icon: 'add user',
        label: '博客管理',
      },
      children: [
        {
          path: '/admin/blog/list',
          element: <BlogList></BlogList>,
          customProp: {
            icon: 'th list',
            label: '博客列表',
          },
        },
        {
          path: '/admin/blog/catManage',
          element: <BlogList></BlogList>,
          customProp: {
            icon: 'th',
            label: '类别管理',
          },
        },
        {
          path: '/admin/blog/tagManage',
          element: <BlogList></BlogList>,
          customProp: {
            icon: 'tags',
            label: '标签管理',
          },
        },
        {
          path: '/admin/blog/columnManage',
          element: <BlogList></BlogList>,
          customProp: {
            icon: 'columns',
            label: '专栏管理',
          },
        },
      ],
    },
    {
      path: '/admin/projects',
      customProp: {
        icon: 'add user',
        label: '项目管理',
      },
      children: [
        {
          path: '/admin/projects/list',
          element: <div>项目列表</div>,
          customProp: {
            icon: 'th list',
            label: '项目列表',
          },
        },
      ],
    },
    {
      path: '/admin/users',
      customProp: {
        icon: 'user',
        label: '用户管理',
      },
      children: [
        {
          path: '/admin/users/list',
          element: <div>用户列表</div>,
          customProp: {
            icon: 'user',
            label: '用户列表',
          },
        },
      ],
    },
    {
      path: '/admin/analyse',
      customProp: {
        icon: 'add user',
        label: '数据分析',
      },
      children: [
        {
          path: '/admin/analyse/trend',
          element: <div>趋势图</div>,
          customProp: {
            icon: 'chart line',
            label: '趋势图',
          },
        },
      ],
    },
  ],
} as CustomRoute;

export default adminRoute;
