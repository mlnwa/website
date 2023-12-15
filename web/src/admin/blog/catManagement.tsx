import React, { useEffect, useState } from 'react';
import { Button, Container, Flag, Input, Label, Segment } from 'semantic-ui-react';
import ITable, { ColumnType } from '../../components/ITable';
import { DatePicker, Drawer } from 'antd';
import { IMessage } from '../../components/IMessage';
import IDrawer from '../../components/IDrawer';
import { BlogFilterForm } from '../../class/FormStructs';
import { cloneDeep } from 'lodash';
import { Constants } from '../../assets/ts/Constants';
import { IdUtil } from '../../utils';

const CatManagement = function () {
  const [open, setOpen] = React.useState(false);
  const [filterForm, setFilterForm] = React.useState(new BlogFilterForm());
  const [pageSize, setPageSize] = useState(Constants.PAGE_SIZE);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(100);
  const columns: ColumnType[] = [
    {
      title: '序号',
      key: 'order',
      width: '2',
    },
    {
      title: '标题',
      key: 'title',
      width: '2',
    },
    {
      title: '姓名',
      key: 'name',
      width: '2',
    },
    {
      title: '创建时间',
      key: 'createAt',
      width: '3',
    },
    {
      title: '分类',
      key: 'cat',
      width: '2',
    },
  ];

  const onClose = () => {
    setOpen(false);
  };
  const showFilter = function () {
    setOpen(true);
  };
  const allList = new Array(total).fill(null).map((item, index) => {
    return cloneDeep({
      order: index + 1,
      title: '111',
      name: '111',
    });
  });
  const search = function (pageIndex = 1) {
    // const filterFormData = filterForm.generateFormData();
    const list = allList.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    setList(list);
    // setTotal(Math.ceil(Math.random() * 200));
  };
  const onFilter = function () {
    setOpen(false);
    search();
  };
  const setFormHandle = function (panelIndex: number, contentIndex: number, value: any) {
    setFilterForm((prevState: BlogFilterForm) => {
      return prevState.updateContent(panelIndex, contentIndex, value);
    });
  };
  useEffect(() => {
    search();
  }, []);
  useEffect(() => {
    search();
  }, [pageSize]);
  return (
    <div>
      <ITable list={list} columns={columns} total={total} onPageIndexChange={search} onPageSizeChange={setPageSize}>
        <Label>
          时间：<DatePicker size="small"></DatePicker>
        </Label>
        <Button icon="search" content="搜索" size="small" onClick={() => search()}></Button>
        <Button icon="filter" content="筛选条件" size="small" onClick={() => showFilter()}></Button>
      </ITable>
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

export default CatManagement;
