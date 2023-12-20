import React, { useEffect, useState } from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
import ITable, { ColumnType } from '../../components/ITable';
import { DatePicker } from 'antd';
import IDrawer from '../../components/IDrawer';
import { CategoryForm } from '../../class/FormStructs';
import { Constants } from '../../assets/ts/Constants';
import { cloneDeep } from 'lodash';
import dayjs from 'dayjs';

const CatManagement = function () {
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [categoryForm, setCategoryForm] = useState(new CategoryForm());
  const [pageSize, setPageSize] = useState(Constants.PAGE_SIZE);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const columns: ColumnType[] = [
    {
      title: '类别名称',
      key: 'categoryName',
      width: '2',
    },
    {
      title: '博客数量',
      key: 'blogNumber',
      width: '2',
    },
    {
      title: '创建时间',
      key: 'createAt',
      width: '3',
    },
    {
      title: '修改时间',
      key: 'updateAt',
      width: '3',
    },
    {
      title: '操作',
      width: '5',
      render: (row, index) => {
        return (
          <Icon
            name="edit"
            onClick={() => {
              toEdit(row);
            }}
            content="编辑"
          ></Icon>
        );
      },
    },
  ];

  const search = function (pageIndex = 1) {
    let total = Math.ceil(Math.random() * 100) * 100;
    const allList = new Array(100).fill(null).map((item, index) => {
      return cloneDeep({
        categoryName: index + 1,
        blogNumber: 100,
        createAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        updateAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      });
    });
    const list = allList.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
    setList(list);
    setTotal(allList.length);
  };
  useEffect(() => {
    search();
  }, [pageSize]);
  const toEdit = function (row: any) {
    setIsEdit(true);
    setCategoryForm(categoryForm.insertFormData(row));
    setOpen(true);
  };
  const toAdd = function () {
    setIsEdit(false);
    setCategoryForm(categoryForm.resetFormData());
    setOpen(true);
  };
  const onSaveHandle = function () {
    // 保存
    setOpen(false);
  };
  const onFormChangeHandle = function (index: number, contentIndex: number, value: any) {
    setCategoryForm((prevState: CategoryForm) => {
      return prevState.updateContent(index, contentIndex, value);
    });
  };
  return (
    <div>
      <ITable list={list} columns={columns} total={total} onPageIndexChange={search} onPageSizeChange={setPageSize}>
        <Label>
          时间：<DatePicker size="small"></DatePicker>
        </Label>
        <Button icon="search" content="搜索" size="small" onClick={() => search()}></Button>
        <Button icon="add" content="新增" size="small" onClick={toAdd}></Button>
      </ITable>
      <IDrawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        {categoryForm.panelList.map((item, index) => {
          return (
            <IDrawer.Panel
              key={index}
              data={item}
              onChange={(contentIndex, value) => {
                onFormChangeHandle(index, contentIndex, value);
              }}
            ></IDrawer.Panel>
          );
        })}
        <IDrawer.Footer>
          <Button icon="save" positive content="保存" onClick={onSaveHandle}></Button>
        </IDrawer.Footer>
      </IDrawer>
    </div>
  );
};

export default CatManagement;
