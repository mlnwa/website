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
import { QueryCategoryList } from '../api/module/category';
import IMarkdown from '../components/IMarkdown/IMarkdown';
import { CreateBlog } from '../api/module/blog';
const fromWhomOptions: DropdownItemProps[] = [
  { text: '原创', value: '原创' },
  { text: '转载', value: '转载' },
  { text: '翻译', value: '翻译' },
];
const BlogEdit = function () {
  const [categoryList, setCategoryList] = React.useState<DropdownItemProps[]>([]);
  const [categoryId, setCategoryId] = React.useState<number>();
  const [tagIds, setTagIds] = React.useState<number[]>([]);
  const [title, setTitle] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  useEffect(() => {
    getCategorys();
  }, []);
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
        text: item.categoryName,
      };
    });
    setCategoryList(list);
  };
  const onSaveHandle = async () => {
    let res;
    try {
      res = await CreateBlog({
        title,
        status: 1,
        content,
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
              label={<Dropdown options={fromWhomOptions} defaultValue="原创"></Dropdown>}
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
            defaultValue={categoryId}
            onChange={(e: any, data: DropdownItemProps) => {
              setCategoryId(Number(data.value));
            }}
          ></Form.Field>
          <Form.Field
            label="标签"
            control={Select}
            options={categoryList}
            multiple
            defaultValue={tagIds}
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
