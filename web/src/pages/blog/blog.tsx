import React, { useEffect } from "react";
import style from "../../assets/css/common.module.scss";
import { Container, Grid, Header, Item, Segment } from "semantic-ui-react";
import dotenv from "dotenv";
import { Constants } from "../../assets/ts/Constants";

const Blog = function () {
  return (
    <div className={`${style.m_container} ${style.padding_tb_big}`}>
      <Container>
        <Grid stackable>
          <Grid.Column width={11}>
            <Segment attached="top">
              <Grid>
                <Grid.Column width={8}>
                  <Header as="h3" color="teal">
                    博客
                  </Header>
                </Grid.Column>
                <Grid.Column
                  className={`${style.text_spaced_tiny}`}
                  width={8}
                  textAlign="right"
                >
                  共
                  <Header
                    className={`${style.m_header} ${style.m_text_thin}`}
                    as="h3"
                    color="orange"
                    content={13}
                  />
                  篇
                </Grid.Column>
              </Grid>
            </Segment>
          </Grid.Column>
          <Grid.Column width={5}></Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default Blog;
