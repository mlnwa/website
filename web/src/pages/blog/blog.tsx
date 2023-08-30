import React, { useEffect, useState } from "react";
import style from "../../assets/css/common.module.scss";
import { Container, Grid, Header, Item, Segment } from "semantic-ui-react";
import dotenv from "dotenv";
import { Constants } from "../../assets/ts/Constants";
import BlogItem from "../../components/BlogItem/BlogItem";
import { BlogSummary } from "../../types";
import { IdUtil } from "../../utils";
const blogList :BlogSummary[] = new Array(10).fill(null).map( _ => {
  const blogSummaryItem:BlogSummary = {
    id: IdUtil.uuidOfNumber(10),
    createAt: "2023-8-28",
    title: "你真的理解什么是财务自由吗？",
    abstract: "财务自由是指人无需为生活开销而努力为钱工作的状态。简单地说，一个人的资产产生的被动收入至少要等于或超过他的日常开支，如果进入这种状态，就可以称之为财务自",
    imgUrl: "https://picsum.photos/id/10/800/450",
    views: 1200,
    authorName: "brad",
    authorAvatarUrl: "https://picsum.photos/id/10/800/450"
  }
  return blogSummaryItem
})
function genBlogs(){
  return Promise.resolve(blogList)
}

const Blog =  function () {
  const [blogList,setBlogList] = useState<BlogSummary[]>([])
  useEffect(()=>{
    genBlogs().then((data)=>{
      setBlogList(data)
    })
  },[])
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
            {/* content */}
            <Segment attached>
              {
                blogList.map(item => (
                  // <div></div>
                  <BlogItem value={item} key={item.id}></BlogItem>
                ))
              }
            </Segment>
          </Grid.Column>
          <Grid.Column width={5}></Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default Blog;
