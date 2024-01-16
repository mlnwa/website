import React from 'react';
import { Button, Container, Dropdown, DropdownItemProps, Input } from 'semantic-ui-react';
import IMarkdown from '../components/IMarkdown/IMarkdown';
import { CreateBlog, QueryBlogDetail } from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import { isNaN, isUndefined } from 'lodash';
import { Blog, BlogFromStatus, UpdateBlog } from '../api/module/blog';
import { useAppDispatch } from '../hooks';
import { fetchCategorys, fetchColumns, fetchTags } from '../store/features/blogMetaSlice';
import store from '../store';
import { BlogForm } from '../class/FormStructs';
import IDrawer from '../components/IDrawer';
const fromStatusOptions: DropdownItemProps[] = [
  { text: '原创', value: BlogFromStatus.SELF },
  { text: '转载', value: BlogFromStatus.REPRODUCED },
  { text: '翻译', value: BlogFromStatus.TRANSLATED },
];
const BlogEdit = function () {
  const [categoryList, setCategoryList] = React.useState<DropdownItemProps[]>();
  const [columnList, setColumnList] = React.useState<DropdownItemProps[]>();
  const [tagList, setTagList] = React.useState<DropdownItemProps[]>();
  const [blogForm, setBlogForm] = React.useState<BlogForm>();
  const [blog, setBlog] = React.useState<Blog>();
  const [title, setTitle] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  const [fromStatus, setFromStatus] = React.useState<number>(BlogFromStatus.SELF);
  const [open, setOpen] = React.useState<boolean>(false);
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [isFresh, setIsFresh] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  React.useEffect(() => {
    init();
  }, [isFresh]);
  React.useEffect(() => {
    if (blogForm) return;
    if (isUndefined(categoryList) || isUndefined(tagList) || isUndefined(columnList)) return;
    setBlogForm(new BlogForm({ categoryList, columnList, tagList }));
  }, [categoryList, tagList, columnList]);
  React.useEffect(() => {
    if (isUndefined(blogForm) || isUndefined(blog)) return;
    setTitle(blog.title);
    setContent(blog.content);
    setFromStatus(blog.fromStatus);
    blogForm.insertFormData(blog);
  }, [blog]);
  const init = async () => {
    await Promise.all([getCategorys(), getTags(), getColumns()]);
    getBlogDetail();
  };
  const getCategorys = async () => {
    await dispatch(fetchCategorys());
    setCategoryList(store.getState().blogMeta.categorys.map((item) => ({ value: item.id, text: item.name })));
  };
  const getTags = async () => {
    await dispatch(fetchTags());
    setTagList(store.getState().blogMeta.tags.map((item) => ({ value: item.id, text: item.name })));
  };
  const getColumns = async () => {
    await dispatch(fetchColumns());
    setColumnList(store.getState().blogMeta.columns.map((item) => ({ value: item.id, text: item.name })));
  };
  const getBlogDetail = async () => {
    const blogId = parseInt(id);
    if (isNaN(blogId)) return;
    let res;
    try {
      res = await QueryBlogDetail(blogId);
      setBlog(res.result);
    } catch (error) {
      return;
    }
    setIsEdit(true);
  };
  const onSaveHandle = async () => {
    let res;
    const formObj = blogForm.generateFormData<Blog>();
    try {
      res = await CreateBlog({
        ...formObj,
        title,
        content,
        fromStatus,
      });
    } catch (error) {
      console.log(error);
    }
    navigate(`/admin/edit/${res.result}`);
    setIsFresh(true);
  };
  const onUpdateHandle = async () => {
    let res;
    const formObj = blogForm.generateFormData<Blog>();
    try {
      res = await UpdateBlog(blog.id, {
        ...formObj,
        title,
        content,
        fromStatus,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onPublishHandle = async () => {};
  const onFormChangeHandle = function (index: number, contentIndex: number, value: any) {
    setBlogForm((prevState: BlogForm) => {
      return prevState.updateContent(index, contentIndex, value);
    });
  };
  return (
    <Container style={{ gap: '10px' }}>
      <Input
        size="large"
        labelPosition="left"
        placeholder="请输入标题"
        label={
          <Dropdown
            options={fromStatusOptions}
            value={fromStatus}
            onChange={(e, data) => {
              setFromStatus(Number(data.value));
            }}
          ></Dropdown>
        }
        action={
          <>
            {!isEdit && (
              <Button icon="save" positive content="保存" size="tiny" onClick={() => onSaveHandle()}></Button>
            )}
            {isEdit && (
              <Button icon="save" positive content="更新" size="tiny" onClick={() => onUpdateHandle()}></Button>
            )}
            <Button icon="send" primary content="发布" size="tiny" onClick={() => onPublishHandle()}></Button>
            <Button content="其他" onClick={() => setOpen(true)}></Button>
          </>
        }
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></Input>
      <IMarkdown border scroll>
        <IMarkdown.Editer value={content} onChange={(value) => setContent(value)}></IMarkdown.Editer>
        <IMarkdown.Preview value={content} darkMode></IMarkdown.Preview>
      </IMarkdown>
      <IDrawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        {blogForm?.panelList?.map((item, index) => {
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
        {/* <IDrawer.Footer>{<Button icon="save" positive content="保存" onClick={onSaveHandle}></Button>}</IDrawer.Footer> */}
      </IDrawer>
    </Container>
  );
};

export default BlogEdit;
