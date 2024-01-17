import React, { useEffect, useState } from 'react';
import style from '../../assets/css/common.module.scss';
import { useParams } from 'react-router-dom';
import { QueryBlogDetail } from '../../api';
import { Container, Header, Icon, Item, List, Segment, Image, Label } from 'semantic-ui-react';
import { AddBlogView, Blog, BlogFromStatus } from '../../api/module/blog';
import IMarkdown from '../../components/IMarkdown/IMarkdown';
import { DateUtil } from '../../utils';

const BlogDetail = function () {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog>({} as Blog);
  const getBlogData = async () => {
    let res;
    try {
      res = await QueryBlogDetail(parseInt(id));
      res.result.imgUrl = 'https://picsum.photos/id/10/800/450';
      res.result.userAvatarUrl = 'https://picsum.photos/id/10/800/450';
      setBlog(res.result);
      AddBlogView(res.result.id);
    } catch (error) {
      return;
    }
  };
  useEffect(() => {
    getBlogData();
  }, []);
  return (
    <div className={`${style.m_container_small} ${style.padding_tb_big}`}>
      <Container>
        <Segment attached="top">
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
        </Segment>
        <Segment attached>
          <Image rounded fluid src={blog.imgUrl}></Image>
        </Segment>
        <Segment attached padded>
          <Segment textAlign="right" basic>
            {blog.fromStatus == BlogFromStatus.SELF && <Label content="原创" color="orange" basic></Label>}
            {blog.fromStatus == BlogFromStatus.REPRODUCED && <Label content="转载" color="blue" basic></Label>}
            {blog.fromStatus == BlogFromStatus.TRANSLATED && <Label content="翻译" color="green" basic></Label>}
          </Segment>
          <Header as="h2" content={blog.title} textAlign="center"></Header>
          <IMarkdown>
            <IMarkdown.Preview value={blog.content} darkMode></IMarkdown.Preview>
          </IMarkdown>
        </Segment>
      </Container>
    </div>
  );
};
export default BlogDetail;
