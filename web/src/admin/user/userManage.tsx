import React, { useEffect, useState } from 'react';
import ITable, { ColumnType } from '../../components/ITable';
import { Button, Label, Menu } from 'semantic-ui-react';
import { DeleteUser, QueryUserList, UpdateUser, User } from '../../api/module/user';
import { Constants } from '../../assets/ts/Constants';
import { UserForm } from '../../class/FormStructs';
import { DatePicker } from 'antd';
import IDrawer from '../../components/IDrawer';

const UserManage: React.FC = () => {
  const [list, setList] = useState([]);
  const [userForm, setUserForm] = useState(new UserForm());
  const [pageSize, setPageSize] = useState(Constants.PAGE_SIZE);
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentId, setCurrentId] = useState(0);

  const columns: ColumnType[] = [
    {
      title: '用户名',
      key: 'name',
      width: '2',
    },
    {
      title: '',
      key: '',
      width: '2',
    },
    {
      title: '注册时间',
      key: 'createAt',
      width: '3',
    },
    {
      title: '最后修改',
      key: 'updateAt',
      width: '3',
    },
    {
      title: '操作',
      width: '2',
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
            ></Button>
            <Button
              floated="right"
              icon
              labelPosition="left"
              negative
              size="small"
              onClick={() => {
                onDeleteHandle(row);
              }}
            ></Button>
          </Menu>
        );
      },
    },
  ];
  const search = async function (pageIndex = 1) {
    let res;
    try {
      res = await QueryUserList({
        pageIndex,
        pageSize,
      });
    } catch (error) {
      console.log(error);
      return;
    }
    const { list, total } = res.result;
    setList(list);
    setTotal(total);
  };
  useEffect(() => {
    search();
  }, [pageSize]);
  const toEdit = (row: User) => {
    setIsEdit(true);
    setUserForm(userForm.insertFormData(row));
    setCurrentId(row.id);
    setOpen(true);
  };
  const onSaveHanle = async function () {
    const formData = userForm.generateFormData<Partial<User>>();
    await UpdateUser(currentId, {
      ...formData,
    });
    search();
  };
  const onDeleteHandle = async function (row: User) {
    await DeleteUser(row.id);
    search();
  };
  const onAddHandle = async function () {};
  const onFormChangeHandle = function (index: number, contentIndex: number, value: any) {
    setUserForm((prevState: UserForm) => {
      return prevState.updateContent(index, contentIndex, value);
    });
  };
  return (
    <div>
      <ITable list={list} columns={columns} total={total} onPageIndexChange={search} onPageSizeChange={setPageSize}>
        <Label>
          时间: <DatePicker size="small"></DatePicker>
        </Label>
        <Button icon="search" content="搜索" size="small" onClick={() => search()}></Button>
      </ITable>
      <IDrawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        {userForm.panelList.map((item, index) => {
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
          {isEdit && <Button icon="save" positive content="保存" onClick={onSaveHanle}></Button>}
          {!isEdit && <Button icon="add" positive content="新增" onClick={onAddHandle}></Button>}
        </IDrawer.Footer>
      </IDrawer>
    </div>
  );
};
export default UserManage;
