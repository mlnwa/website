import React from 'react';
import { Button, Grid, GridColumn, Header, Icon, Image, Item, List, Message, Segment } from 'semantic-ui-react';
import style from '../../assets/css/common.module.scss';
import { Blog } from '../../api/module/blog';
import { DateUtil } from '../../utils';

type Props = {
  value: Blog;
  onClick?: () => void;
};

const BlogItem = function (props: Props) {
  const blog: Blog = props.value;
  return (
    <Segment padded vertical onClick={props.onClick}>
      <Grid reversed="mobile" stackable>
        <Grid.Column width={11}>
          <Header as="h3" content={blog.title}></Header>
          <p className={style.m_text}>{blog.abstract}</p>
          <Grid>
            <Grid.Column width={13}>
              <List size="mini" horizontal link>
                <Item className="middle aligned">
                  <Image avatar src={blog.userAvatarUrl}></Image>
                  <Item.Content>
                    <Header as="a" content={blog.userName}></Header>
                  </Item.Content>
                </Item>
                <Item className="middle aligned">
                  <Icon name="calendar"></Icon>
                  {blog.createAt}
                </Item>
                <Item className="middle aligned">更新于{DateUtil.day(blog.updateAt).convertToTimeAgo()}</Item>
                <Item className="middle aligned">
                  <Icon name="eye"></Icon>
                  {blog.viewCount}
                </Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}></Grid.Column>
          </Grid>
        </Grid.Column>
        <Grid.Column width={5}>
          <a href="">
            <Image rounded src={blog.imgUrl}></Image>
          </a>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default BlogItem;
