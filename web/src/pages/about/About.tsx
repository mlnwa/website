import React from 'react';
import style from '../../assets/css/common.module.scss';
import { Container, Grid, Segment, Image, Item, Label, Button } from 'semantic-ui-react';

export const About: React.FC = () => {
  return (
    <div className={`${style.m_container} ${style.padding_tb_big}`}>
      <Container>
        <Grid stackable>
          <Grid.Column width={11}>
            <Segment>
              <Image src="https://picsum.photos/id/10/800/450"></Image>
            </Segment>
          </Grid.Column>
          <Grid.Column width={5}>
            <Segment attached="top">关于我</Segment>
            <Segment attached>
              <p className={style.m_text}>一个独立开发者，折腾在0和1世界的少年。</p>
              <p className={style.m_text}>热爱编程，喜欢思考，正在磨练与学习技术，寻找可以践行一生的真理...</p>
            </Segment>
            <Segment attached>
              <Label basic color="orange" size="tiny" content="编程"></Label>
              <Label basic color="orange" size="tiny" content="阅读"></Label>
              <Label basic color="orange" size="tiny" content="思考"></Label>
              <Label basic color="orange" size="tiny" content="运动"></Label>
              <Label basic color="orange" size="tiny" content="音乐"></Label>
            </Segment>
            <Segment attached>
              <Label basic color="teal" size="mini" content="JavaScript"></Label>
              <Label basic color="teal" size="mini" content="Vue"></Label>
              <Label basic color="teal" size="mini" content="React"></Label>
              <Label basic color="teal" size="mini" content="NestJS"></Label>
              <Label basic color="teal" size="mini" content="Electron"></Label>
              <Label basic color="teal" size="mini" content="Cordava"></Label>
              <Label basic color="teal" size="mini" content="Java"></Label>
              <Label basic color="teal" size="mini" content="Spring"></Label>
              <Label basic color="teal" size="mini" content="MySQL"></Label>
              <Label basic color="teal" size="mini" content="Cpp"></Label>
              <Label basic color="teal" size="mini" content="OpenGL"></Label>
              <Label basic color="teal" size="mini" content="AlexNet"></Label>
              <Label basic color="teal" size="mini" content="GoogLeNet"></Label>
              <Label basic color="teal" size="mini" content="..."></Label>
            </Segment>
            <Segment attached>
              <Button as="a" circular icon="github" size="tiny"></Button>
              <Button as="a" circular icon="wechat" size="tiny"></Button>
              <Button as="a" circular icon="mail" size="tiny"></Button>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};
