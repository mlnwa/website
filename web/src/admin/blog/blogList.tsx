import React, { useState } from 'react';
import { Button, Container, Flag, Input, Label, Segment } from 'semantic-ui-react';
import ITable, { ColumnType } from '../../components/ITable';
import { DatePicker, Drawer } from 'antd';
import { IMessage } from '../../components/IMessage';
import IDrawer from '../../components/IDrawer';
import { BlogFilterForm } from '../../class/FormStructs';

const BlogList = function () {
  const [open, setOpen] = React.useState(false);
  const [filterForm, setFilterForm] = React.useState(new BlogFilterForm());
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
  const showFilter = function () {
    setOpen(true);
  };
  const onFilter = function () {
    setOpen(false);
  };
  const setFormHandle = function (panelIndex: number, contentIndex: number, value: any) {
    setFilterForm((prevState: BlogFilterForm) => {
      return prevState.updateContent(panelIndex, contentIndex, value);
    });
  };
  return (
    <div>
      <Label>
        时间：
        <DatePicker size="small"></DatePicker>
      </Label>

      <Button icon="search" content="搜索" size="small"></Button>
      <Button icon="filter" content="筛选条件" size="small" onClick={() => showFilter()}></Button>
      <ITable list={list} columns={columns}></ITable>
      <IDrawer open={open} onClose={onClose}>
        {filterForm.panelList.map((item, index) => {
          return (
            <IDrawer.Panel
              key={index}
              data={item}
              onChange={(contentIndex, value) => {
                setFormHandle(index, contentIndex, value);
              }}
            ></IDrawer.Panel>
          );
        })}
        <IDrawer.Footer>
          <Button content="确认" positive icon="save" onClick={onFilter}></Button>
        </IDrawer.Footer>
      </IDrawer>
    </div>
  );
};

export default BlogList;
