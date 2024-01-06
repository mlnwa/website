import React, { useEffect, useState } from 'react';
import { Button, Container, Dimmer, Flag, Icon, Input, Label, Menu, Segment } from 'semantic-ui-react';
import ITable, { ColumnType } from '../../components/ITable';
import { DatePicker, Drawer } from 'antd';
import { IMessage } from '../../components/IMessage';
import IDrawer from '../../components/IDrawer';
import { BlogFilterForm } from '../../class/FormStructs';
import { cloneDeep } from 'lodash';
import { Constants } from '../../assets/ts/Constants';
import { DeleteBlog, QueryBlogList } from '../../api';
import { useNavigate } from 'react-router-dom';

const BlogList = function () {
  const [open, setOpen] = React.useState(false);
  const [filterForm, setFilterForm] = React.useState(new BlogFilterForm());
  const [pageSize, setPageSize] = useState(Constants.PAGE_SIZE);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const columns: ColumnType[] = [
    {
      title: '标题',
      key: 'title',
      width: '2',
    },
    {
      title: '作者',
      key: 'userName',
      width: '2',
    },
    {
      title: '创建时间',
      key: 'createAt',
      width: '3',
    },
    {
      title: '分类',
      key: 'categoryName',
      width: '2',
    },
    {
      title: '操作',
      width: '1',
      render: (row, index) => {
        return (
          <Menu secondary>
            <Button
              floated="right"
              icon
              labelPosition="left"
              primary
              size="small"
              onClick={() => {
                toEdit(row);
              }}
            >
              <Icon name="edit" /> 编辑
            </Button>
            <Button
              floated="right"
              icon
              labelPosition="left"
              negative
              size="small"
              onClick={() => {
                onDeleteHandle(row);
              }}
            >
              <Icon name="delete" /> 删除
            </Button>
          </Menu>
        );
      },
    },
  ];

  const onClose = () => {
    setOpen(false);
  };
  const showFilter = function () {
    setOpen(true);
  };

  const search = async function (pageIndex = 1) {
    setLoading(true);
    let res;
    try {
      res = await QueryBlogList({
        pageIndex,
        pageSize,
      });
    } catch (error) {
      setLoading(false);
      return;
    }
    const list = res.result.list;
    setList(list);
    setTotal(res.result.total);
    setLoading(false);
  };
  const toEdit = (row: any) => {
    navigate(`/admin/edit/${row.id}`);
  };
  const onDeleteHandle = async (row: any) => {
    await DeleteBlog(row.id);
    search();
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
  }, [pageSize]);
  return (
    <div>
      <ITable
        list={list}
        columns={columns}
        loading={loading}
        total={total}
        onPageIndexChange={search}
        onPageSizeChange={setPageSize}
      >
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

export default BlogList;
