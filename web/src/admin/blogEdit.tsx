import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Dropdown,
  DropdownItemProps,
  Form,
  Grid,
  Input,
  Label,
  Menu,
  Segment,
  Select,
  Table,
  TextArea,
} from 'semantic-ui-react';
import commonStyle from '../assets/css/common.module.scss';
import { QueryCategoryList, QueryTagList } from '../api';
import IMarkdown from '../components/IMarkdown/IMarkdown';
import { CreateBlog, QueryBlogDetail } from '../api';
import { useLocation, useParams } from 'react-router-dom';
import { isNaN, isNumber } from 'lodash';
import { BlogFromStatus } from '../api/module/blog';
const fromStatusOptions: DropdownItemProps[] = [
  { text: '原创', value: BlogFromStatus.SELF },
  { text: '转载', value: BlogFromStatus.REPRODUCED },
  { text: '翻译', value: BlogFromStatus.TRANSLATED },
];
const BlogEdit = function () {
  const [categoryList, setCategoryList] = React.useState<DropdownItemProps[]>([]);
  const [tagList, setTagList] = React.useState<DropdownItemProps[]>([]);
  const [categoryId, setCategoryId] = React.useState<number>();
  const [tagIds, setTagIds] = React.useState<number[]>([]);
  const [title, setTitle] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  const [fromStatus, setFromStatus] = React.useState<number>(BlogFromStatus.SELF);
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
  };
  const getCategorys = async () => {
    let res;
    try {
      res = await QueryCategoryList({
        pageIndex: 1,
        pageSize: 199,
      });
    } catch (error) {
      return;
    }
    const list = res.result.list.map((item) => {
      return {
        value: item.id,
        text: item.name,
      };
    });
    setCategoryList(list);
  };
  const getTags = async () => {
    let res;
    try {
      res = await QueryTagList({
        pageIndex: 1,
        pageSize: 199,
      });
    } catch (error) {
      return;
    }
    const list = res.result.list.map((item) => {
      return {
        value: item.id,
        text: item.name,
      };
    });
    setTagList(list);
  };
  const getBlogDetail = async () => {
    const blogId = parseInt(id);
    if (isNaN(blogId)) return;
    let res;
    try {
      res = await QueryBlogDetail(blogId);
    } catch (error) {
      return;
    }
    setContent(res.result.content);
    setTitle(res.result.title);
    setCategoryId(res.result.categoryId);
    setFromStatus(res.result.fromStatus);
    setTagIds(res.result.tagIds);
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
      });
    } catch (error) {}
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
        <Form.Group widths={3} className={commonStyle.m_margin_lr_none}>
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
        </Form.Group>
      </Form>
      <IMarkdown>
        <IMarkdown.Editer value={content} onChange={(value) => setContent(value)}></IMarkdown.Editer>
        <IMarkdown.Preview value={content} darkMode></IMarkdown.Preview>
      </IMarkdown>
      <Segment textAlign="right" basic size="mini">
        <Button icon="save" positive content="保存" size="tiny" onClick={() => onSaveHandle()}></Button>
        <Button icon="send" primary content="发布" size="tiny" onClick={() => onPublishHandle()}></Button>
      </Segment>
    </Container>
  );
};

export default BlogEdit;
