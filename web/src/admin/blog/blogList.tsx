import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import ITable, { ColumnType } from '../../components/ITable';

const BlogList = function () {
  const columns: ColumnType[] = [
    {
      title: '标题',
      key: 'title',
      width: '1',
    },
    {
      title: '姓名',
      key: 'name',
      width: '7',
    },
  ];
  const list = [
    {
      title: '111',
      name: '111',
    },
    {
      title: '111',
      name: '111',
    },
    {
      title: '111',
      name: '111',
    },
  ];
  return <ITable list={list} columns={columns}></ITable>;
};

export default BlogList;
