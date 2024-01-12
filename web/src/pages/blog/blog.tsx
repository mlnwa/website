import React, { useEffect, useState } from 'react';
import style from '../../assets/css/common.module.scss';
import { Container, Grid, Header, Icon, Item, Label, Menu, Segment } from 'semantic-ui-react';
import BlogItem from '../../components/BlogItem/BlogItem';
import { QueryColumnList, QueryTagList, QueryPublishedBlogList } from '../../api';
import { Blog } from '../../api/module/blog';
import { Category } from '../../api/module/category';
import { Tag } from '../../api/module/tag';
import { Column } from '../../api/module/column';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { fetchCategorys, fetchColumns, fetchTags } from '../../store/features/blogMetaSlice';
import store from '../../store';
const Blog = function () {
  const [blogList, setBlogList] = useState<Blog[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [tagList, setTagList] = useState<Tag[]>([]);
  const [columnList, setColumnList] = useState<Column[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const getBlogList = async () => {
    let res;
    try {
      res = await QueryPublishedBlogList({
        pageIndex: 1,
        pageSize: 10,
      });
    } catch (error) {
      console.log(error);
      return;
    }
    setBlogList(res.result.list);
    setTotal(res.result.total);
  };
  const getCategoryList = async () => {
    await dispatch(fetchCategorys());
    setCategoryList(store.getState().blogMeta.categorys.slice(0, 5));
  };
  const getTagList = async () => {
    await dispatch(fetchTags());
    setTagList(store.getState().blogMeta.tags.slice(0, 10));
  };
  const getColumnList = async () => {
    await dispatch(fetchColumns());
    setColumnList(store.getState().blogMeta.columns.slice(0, 5));
  };
  const onClickBlogHandler = (blogId: number) => {
    navigate(`/detail/${blogId}`);
  };
  useEffect(() => {
    getBlogList();
    getCategoryList();
    getTagList();
    getColumnList();
  }, []);
  return (
    <div className={`${style.m_container} ${style.padding_tb_big}`}>
      <Container>
        <Grid stackable>
          <Grid.Column width={11}>
            {/* title */}
            <Segment attached="top">
              <Grid>
                <Grid.Column width={8}>
                  <Header as="h3" color="teal">
                    博客
                  </Header>
                </Grid.Column>
                <Grid.Column className={`${style.text_spaced_tiny}`} width={8} textAlign="right">
                  共
                  <Header className={`${style.m_header} ${style.m_text_thin}`} as="h3" color="orange" content={total} />
                  篇
                </Grid.Column>
              </Grid>
            </Segment>
            {/* content */}
            <Segment attached>
              {blogList.map((item) => (
                <BlogItem
                  value={item}
                  key={item.id}
                  onClick={() => {
                    onClickBlogHandler(item.id);
                  }}
                ></BlogItem>
              ))}
            </Segment>
          </Grid.Column>
          <Grid.Column width={5} className="m-mobile-hide">
            {/* 分类 */}
            <Segment.Group>
              <Segment secondary>
                <Grid columns={2}>
                  <Grid.Column>
                    <Icon name="idea"></Icon>
                    分类
                  </Grid.Column>
                  <Grid.Column textAlign="right">
                    <a href="">
                      more
                      <Icon name="angle double right"></Icon>
                    </a>
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment color="teal">
                <Menu fluid vertical>
                  {categoryList.map((item) => (
                    <Item as="a" key={item.id}>
                      {item.name}
                      <Label basic color="teal" pointing="left" content={item.number}></Label>
                    </Item>
                  ))}
                </Menu>
              </Segment>
            </Segment.Group>
            {/* 标签 */}
            <Segment.Group>
              <Segment secondary>
                <Grid columns={2}>
                  <Grid.Column>
                    <Icon name="tags"></Icon>
                    标签
                  </Grid.Column>
                  <Grid.Column textAlign="right">
                    <a href="">
                      more
                      <Icon name="angle double right"></Icon>
                    </a>
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment color="teal">
                {tagList.map((item) => (
                  <Label as="a" basic color="teal" pointing="left" key={item.id} className={style.m_margin_tb_tiny}>
                    {item.name}
                    <Label.Detail color="teal" pointing="left" content={item.number}></Label.Detail>
                  </Label>
                ))}
              </Segment>
            </Segment.Group>
            {/* 专栏 */}
            <Segment.Group>
              <Segment secondary>
                <Grid columns={2}>
                  <Grid.Column>
                    <Icon name="columns"></Icon>
                    专栏
                  </Grid.Column>
                  <Grid.Column textAlign="right">
                    <a href="">
                      more
                      <Icon name="angle double right"></Icon>
                    </a>
                  </Grid.Column>
                </Grid>
              </Segment>
              {columnList.map((item) => (
                <Segment key={item.id}>
                  <Item className={style.m_text_thin}>{item.name}</Item>
                </Segment>
              ))}
            </Segment.Group>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default Blog;
