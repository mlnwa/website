import React from 'react';
import { CustomRoute } from '..';
import Layout from '../../Layout';
import BlogList from '../../admin/blog/blogList';
import CatManagement from '../../admin/blog/catManagement';
import BlogEdit from '../../admin/blogEdit';

const adminRoute = {
  path: '/admin',
  element: <Layout></Layout>,
  authorize: true,
  children: [
    {
      index: true,
      path: '/admin',
      element: <div>Admin index</div>,
      authorize: true,
      customProp: {
        icon: 'add user',
        label: '首页',
      },
    },
    {
      path: '/admin/blog',
      authorize: true,
      customProp: {
        icon: 'add user',
        label: '博客管理',
      },
      children: [
        {
          path: '/admin/blog/list',
          authorize: true,
          element: <BlogList></BlogList>,
          customProp: {
            icon: 'th list',
            label: '博客列表',
          },
        },
        {
          path: '/admin/blog/catManage',
          authorize: true,
          element: <CatManagement></CatManagement>,
          customProp: {
            icon: 'th',
            label: '类别管理',
          },
        },
        {
          path: '/admin/blog/tagManage',
          authorize: true,
          element: <BlogList></BlogList>,
          customProp: {
            icon: 'tags',
            label: '标签管理',
          },
        },
        {
          path: '/admin/blog/columnManage',
          authorize: true,
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
      authorize: true,
      customProp: {
        icon: 'add user',
        label: '项目管理',
      },
      children: [
        {
          path: '/admin/projects/list',
          authorize: true,
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
      authorize: true,
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
      authorize: true,
      customProp: {
        icon: 'add user',
        label: '数据分析',
      },
      children: [
        {
          path: '/admin/analyse/trend',
          authorize: true,
          element: <div>趋势图</div>,
          customProp: {
            icon: 'chart line',
            label: '趋势图',
          },
        },
      ],
    },
    {
      path: '/admin/edit/:id',
      authorize: true,
      element: <BlogEdit></BlogEdit>,
      customProp: {
        icon: 'edit',
        label: '新增/编辑',
      },
    },
  ],
} as CustomRoute;

export default adminRoute;
