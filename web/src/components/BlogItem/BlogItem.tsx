import React from 'react';
import { Button, Grid, GridColumn, Header, Icon, Image, Item, List, Message, Segment } from 'semantic-ui-react';
import style from '../../assets/css/common.module.scss';
import { Blog } from '../../api/module/blog';

type Props = {
  value: Blog;
};

const BlogItem = function (props: Props) {
  const blog: Blog = props.value;
  return (
    <Segment padded vertical>
      <Grid reversed="mobile" stackable>
        <Grid.Column width={11}>
          <Header as="h3" content={blog.title}></Header>
          <p className={style.m_text}>{blog.abstract}</p>
          <Grid>
            <Grid.Column width={11}>
              <List size="mini" horizontal link>
                <Item className="middle aligned">
                  <Image avatar src={blog.userAvatarUrl}></Image>
                  <Item.Content>
                    <Header as="a" content="brad"></Header>
                  </Item.Content>
                </Item>
                <Item className="middle aligned">
                  <Icon name="calendar"></Icon>
                  {blog.createAt}
                </Item>
                <Item className="middle aligned">
                  <Icon name="eye"></Icon>
                  {blog.viewCount}
                </Item>
              </List>
            </Grid.Column>
            <Grid.Column width={5}></Grid.Column>
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
