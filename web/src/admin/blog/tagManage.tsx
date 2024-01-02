import React, { useEffect, useState } from 'react';
import { Button, Icon, Label, Menu } from 'semantic-ui-react';
import ITable, { ColumnType } from '../../components/ITable';
import { DatePicker } from 'antd';
import IDrawer from '../../components/IDrawer';
import { TagForm } from '../../class/FormStructs';
import { Constants } from '../../assets/ts/Constants';
import { CreateTag, DeleteTag, UpdateTag, QueryTagList } from '../../api';

const TagManage = function () {
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [tagForm, setTagForm] = useState(new TagForm());
  const [pageSize, setPageSize] = useState(Constants.PAGE_SIZE);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentId, setCurrentId] = useState(0);
  const columns: ColumnType[] = [
    {
      title: '标签名称',
      key: 'name',
      width: '2',
    },
    {
      title: '博客数量',
      key: 'number',
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

  const search = async function (pageIndex = 1) {
    let res;
    try {
      res = await QueryTagList({
        pageIndex,
        pageSize,
      });
    } catch (error) {
      console.log(error);
      return;
    }
    const list = res.result.list;
    const total = res.result.total;
    setList(list);
    setTotal(total);
  };
  useEffect(() => {
    search();
  }, [pageSize]);
  const toEdit = function (row: any) {
    setIsEdit(true);
    setTagForm(tagForm.insertFormData(row));
    setCurrentId(row.id);
    setOpen(true);
  };
  const toAdd = function () {
    setIsEdit(false);
    setTagForm(tagForm.resetFormData());
    setOpen(true);
  };
  const onSaveHandle = async function () {
    // 保存
    setOpen(false);
    const formData = tagForm.generateFormData() as any;
    await UpdateTag(currentId, {
      name: formData.name,
      description: formData.description,
    });
    search();
  };
  const onAddHandle = async function () {
    // 新增
    setOpen(false);
    const formData = tagForm.generateFormData() as any;
    await CreateTag({
      name: formData.name,
      description: formData.description,
    });
    search();
  };
  const onDeleteHandle = async function (row: any) {
    // 删除
    await DeleteTag(row.id);
    search();
  };
  const onFormChangeHandle = function (index: number, contentIndex: number, value: any) {
    setTagForm((prevState: TagForm) => {
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
        {tagForm.panelList.map((item, index) => {
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
          {isEdit && <Button icon="save" positive content="保存" onClick={onSaveHandle}></Button>}
          {!isEdit && <Button icon="add" positive content="新增" onClick={onAddHandle}></Button>}
        </IDrawer.Footer>
      </IDrawer>
    </div>
  );
};

export default TagManage;
