import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  CheckboxProps,
  Container,
  Dropdown,
  DropdownItemProps,
  Form,
  Grid,
  Input,
  InputOnChangeData,
  Label,
  Menu,
  Segment,
  Select,
  Table,
  TextArea,
} from 'semantic-ui-react';
import commonStyle from '../assets/css/common.module.scss';
import IMarkdown from '../components/IMarkdown/IMarkdown';
import { CreateBlog, QueryBlogDetail } from '../api';
import { useLocation, useParams } from 'react-router-dom';
import { isNaN, isNumber } from 'lodash';
import { BlogFromStatus } from '../api/module/blog';
import { useAppDispatch } from '../hooks';
import { fetchCategorys, fetchColumns, fetchTags } from '../store/features/blogMetaSlice';
import store from '../store';
const fromStatusOptions: DropdownItemProps[] = [
  { text: '原创', value: BlogFromStatus.SELF },
  { text: '转载', value: BlogFromStatus.REPRODUCED },
  { text: '翻译', value: BlogFromStatus.TRANSLATED },
];
const BlogEdit = function () {
  const [categoryList, setCategoryList] = React.useState<DropdownItemProps[]>([]);
  const [columnList, setColumnList] = React.useState<DropdownItemProps[]>([]);
  const [tagList, setTagList] = React.useState<DropdownItemProps[]>([]);
  const [categoryId, setCategoryId] = React.useState<number>();
  const [tagIds, setTagIds] = React.useState<number[]>([]);
  const [columnId, setColumnId] = React.useState<number>();
  const [title, setTitle] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  const [fromStatus, setFromStatus] = React.useState<number>(BlogFromStatus.SELF);
  const [enableComment, setEnableComment] = React.useState<boolean>(true);
  const [enablePraise, setEnablePraise] = React.useState<boolean>(false);
  const [enableCopyright, setEnableCopyright] = React.useState<boolean>(true);
  const [enableRecommend, setEnableRecommend] = React.useState<boolean>(false);
  const [imgUrl, setImgUrl] = React.useState<string>('');
  const [abstract, setAbstract] = React.useState<string>('');
  const dispatch = useAppDispatch();
  const { id } = useParams();
  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    await getDependencies();
    await getBlogDetail();
  };
  const getDependencies = async () => {
    getCategorys();
    getTags();
    getColumns();
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
      setContent(res.result.content);
      setTitle(res.result.title);
      setCategoryId(res.result.categoryId);
      setFromStatus(res.result.fromStatus);
      setTagIds(res.result.tagIds);
      setColumnId(res.result.columnId);
      setEnableComment(res.result.enableComment);
      setEnableCopyright(res.result.enableCopyright);
      setEnablePraise(res.result.enablePraise);
      setEnableRecommend(res.result.enableRecommend);
      setAbstract(res.result.abstract);
      setImgUrl(res.result.imgUrl);
    } catch (error) {
      return;
    }
  };
  const onSaveHandle = async () => {
    let res;
    try {
      res = await CreateBlog({
        title,
        content,
        categoryId,
        fromStatus,
        tagIds: JSON.stringify(tagIds),
        columnId: columnId == 0 ? undefined : columnId,
        imgUrl,
        abstract,
        enableComment,
        enablePraise,
        enableCopyright,
        enableRecommend,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onPublishHandle = async () => {};
  return (
    <Container>
      <Form>
        <Form.Group widths={1} className={commonStyle.m_margin_lr_none}>
          <Form.Field>
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
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></Input>
          </Form.Field>
        </Form.Group>
        <Form.Group widths={5} className={commonStyle.m_margin_lr_none}>
          <Form.Field
            label="分类"
            control={Select}
            clearable
            options={categoryList}
            value={categoryId}
            onChange={(e: any, data: DropdownItemProps) => {
              setCategoryId(Number(data.value));
            }}
          ></Form.Field>
          <Form.Field
            label="分类"
            control={Select}
            clearable
            options={columnList}
            value={columnId}
            onChange={(e: any, data: DropdownItemProps) => {
              setColumnId(Number(data.value));
            }}
          ></Form.Field>
          <Form.Field
            label="标签"
            control={Select}
            options={tagList}
            multiple
            value={tagIds}
            onChange={(e: any, data: DropdownItemProps) => {
              const tagIds = data.value as unknown as number[];
              setTagIds(tagIds);
            }}
          ></Form.Field>
          <Form.Field
            control={Input}
            label="首图"
            value={imgUrl}
            onChange={(e: any, data: InputOnChangeData) => {
              setImgUrl(data.value);
            }}
          ></Form.Field>
          <Form.Field
            control={Input}
            label="摘要"
            value={abstract}
            onChange={(e: any, data: InputOnChangeData) => {
              setAbstract(data.value);
            }}
          ></Form.Field>
        </Form.Group>
      </Form>
      <IMarkdown border>
        <IMarkdown.Editer value={content} onChange={(value) => setContent(value)}></IMarkdown.Editer>
        <IMarkdown.Preview value={content} darkMode></IMarkdown.Preview>
      </IMarkdown>
      <Form.Group></Form.Group>

      <Segment textAlign="right" basic size="mini">
        <Form>
          <Form.Group className={commonStyle.m_margin_lr_none}>
            <Form.Field
              control={Checkbox}
              label="推荐"
              checked={enableRecommend}
              onChange={(e: any, data: CheckboxProps) => {
                setEnableRecommend(data.checked);
              }}
            ></Form.Field>
            <Form.Field
              control={Checkbox}
              label="转载声明"
              checked={enableCopyright}
              onChange={(e: any, data: CheckboxProps) => {
                setEnableCopyright(data.checked);
              }}
            ></Form.Field>
            <Form.Field
              control={Checkbox}
              label="赞赏"
              checked={enablePraise}
              onChange={(e: any, data: CheckboxProps) => {
                setEnablePraise(data.checked);
              }}
            ></Form.Field>
            <Form.Field
              control={Checkbox}
              label="评论"
              checked={enableComment}
              onChange={(e: any, data: CheckboxProps) => {
                setEnableComment(data.checked);
              }}
            ></Form.Field>
          </Form.Group>
        </Form>
        <Button icon="save" positive content="保存" size="tiny" onClick={() => onSaveHandle()}></Button>
        <Button icon="send" primary content="发布" size="tiny" onClick={() => onPublishHandle()}></Button>
      </Segment>
    </Container>
  );
};

export default BlogEdit;
