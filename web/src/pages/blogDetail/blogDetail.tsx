import React, { useEffect, useState } from 'react';
import style from '../../assets/css/common.module.scss';
import { useParams } from 'react-router-dom';
import { QueryBlogDetail } from '../../api';
import {
  Container,
  Header,
  Icon,
  Item,
  List,
  Segment,
  Image,
  Label,
  Button,
  Message,
  Grid,
  Comment,
  Form,
  Dimmer,
} from 'semantic-ui-react';
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
        {/* 简要信息 */}
        <Segment attached="top">
          <List size="mini" horizontal link>
            <Item className="middle aligned">
              {blog.userAvatarUrl && <Image avatar src={blog.userAvatarUrl}></Image>}
              <Item.Content>
                <Header as="a" content={blog.userName}></Header>
              </Item.Content>
            </Item>
            <Item className="middle aligned">
              <Icon name="send"></Icon>
              发布于{DateUtil.day(blog.createAt).format('YYYY-MM-DD')}
            </Item>
            <Item className="middle aligned">
              <Icon name="sync"></Icon>
              更新于{DateUtil.day(blog.updateAt).convertToTimeAgo()}
            </Item>
            <Item className="middle aligned">
              <Icon name="eye"></Icon>
              访问量{blog.viewCount}
            </Item>
          </List>
        </Segment>

        {/* 首图 */}
        {blog.imgUrl && (
          <Segment attached>
            <Image rounded fluid src={blog.imgUrl}></Image>
          </Segment>
        )}

        {/* 博客内容 */}
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

        {/* 标签 */}
        <Segment attached>
          {blog.tagNames &&
            blog.tagNames.map((tagName) => {
              return <Label content={tagName} key={tagName} basic pointing="left" color="teal"></Label>;
            })}
        </Segment>

        {/* 赞赏 */}
        {blog.enablePraise && (
          <Segment textAlign="center" attached>
            <Button circular basic color="orange" size="tiny">
              赞赏
            </Button>
          </Segment>
        )}

        {/* 博客信息 */}
        <Message positive attached>
          <Grid>
            <Grid.Column width={11}>
              <List>
                <List.Item icon="user" content={`作者：${blog.userName}`}></List.Item>
                <List.Item icon="send" content={`发布时间：${blog.createAt}`}></List.Item>
                <List.Item icon="sync" content={`最近更新：${blog.updateAt}`}></List.Item>
                {blog.enableCopyright && (
                  <List.Item
                    icon="copyright"
                    content="版权声明：自由转载-非商用-非衍生-保持署名（创意共享3.0许可证）"
                  ></List.Item>
                )}
                <List.Item icon="linkify" content={`转载链接：`}></List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={5} textAlign="center">
              <Image
                floated="right"
                rounded
                src="https://picsum.photos/id/10/800/450"
                style={{ width: '150px' }}
              ></Image>
            </Grid.Column>
          </Grid>
        </Message>

        {/* 评论区 */}
        {blog.enableComment && (
          <Segment attached="bottom">
            <Segment color="teal">
              <Comment.Group threaded>
                <Header as="h4" dividing>
                  评论
                </Header>
                <Comment>
                  <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
                  <Comment.Content>
                    <Comment.Author as="a">Matt</Comment.Author>
                    <Comment.Metadata>
                      <div>Today at 5:42PM</div>
                    </Comment.Metadata>
                    <Comment.Text>How artistic!</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
                <Comment>
                  <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
                  <Comment.Content>
                    <Comment.Author as="a">Elliot Fu</Comment.Author>
                    <Comment.Metadata>
                      <div>Yesterday at 12:30AM</div>
                    </Comment.Metadata>
                    <Comment.Text>
                      <p>This has been very useful for my research. Thanks as well!</p>
                    </Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                  <Comment.Group>
                    <Comment>
                      <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" />
                      <Comment.Content>
                        <Comment.Author as="a">Jenny Hess</Comment.Author>
                        <Comment.Metadata>
                          <div>Just now</div>
                        </Comment.Metadata>
                        <Comment.Text>Elliot you are always so right :)</Comment.Text>
                        <Comment.Actions>
                          <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                      </Comment.Content>
                    </Comment>
                  </Comment.Group>
                </Comment>

                <Comment>
                  <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/joe.jpg" />
                  <Comment.Content>
                    <Comment.Author as="a">Joe Henderson</Comment.Author>
                    <Comment.Metadata>
                      <div>5 days ago</div>
                    </Comment.Metadata>
                    <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
              </Comment.Group>
            </Segment>
            <Form reply>
              <Form.TextArea placeholder="输入评论内容..." />
              <Button content="Add Reply" labelPosition="left" icon="edit" primary />
            </Form>
          </Segment>
        )}
        {!blog.enableComment && (
          <Segment attached="bottom" textAlign="center" disabled>
            评论区已关闭
          </Segment>
        )}
      </Container>
    </div>
  );
};
export default BlogDetail;
