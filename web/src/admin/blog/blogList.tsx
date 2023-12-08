import React from 'react';
import { Button, Container, Flag, Input, Label, Segment } from 'semantic-ui-react';
import ITable, { ColumnType } from '../../components/ITable';
import { DatePicker, Drawer } from 'antd';
import { IMessage } from '../../components/IMessage';

const BlogList = function () {
  const [open, setOpen] = React.useState(false);
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
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Label>
        时间：
        <DatePicker size="small"></DatePicker>
      </Label>

      <Button icon="search" content="搜索" size="small"></Button>
      <Button icon="filter" content="筛选条件" size="small" onClick={() => setOpen(true)}></Button>
      <ITable list={list} columns={columns}></ITable>
      <Drawer open={open} onClose={onClose} placement="right" width={600} title="筛选条件">
        <Input label="作者" size="small"></Input>
        <Input label="状态" size="small"></Input>
        <Input label="专栏" size="small"></Input>
        <Input label="类别" size="small"></Input>
        <Input label="标签" size="small"></Input>
      </Drawer>
    </div>
  );
};

export default BlogList;
