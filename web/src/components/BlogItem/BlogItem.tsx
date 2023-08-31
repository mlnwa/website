import React from "react"
import { BlogSummary } from "../../types"
import { Button, Grid, GridColumn, Header, Icon, Image, Item, List, Message, Segment } from "semantic-ui-react"
import style from "../../assets/css/common.module.scss";

type Props = {
    value:BlogSummary
}

const BlogItem = function(props:Props){
    const blogSummary:BlogSummary = props.value
    return (
        <Segment padded vertical>
            <Grid reversed="mobile" stackable>
                <Grid.Column width={11}>
                    <Header as='h3' content={blogSummary.title}></Header>
                    <p className={style.m_text} >{blogSummary.abstract}</p>
                    <Grid>
                        <Grid.Column width={11}>
                            <List size="mini" horizontal link >
                                <Item className="middle aligned">
                                    <Image  avatar src={blogSummary.authorAvatarUrl}></Image>
                                    <Item.Content><Header as='a' content="brad"></Header></Item.Content>
                                </Item>
                                <Item className="middle aligned">
                                    <Icon name="calendar" ></Icon>
                                    {blogSummary.createAt}
                                </Item>
                                <Item className="middle aligned">
                                    <Icon name="eye"></Icon>
                                    {blogSummary.views}
                                </Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={5}>
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
                <Grid.Column width={5}>
                <a href=""><Image rounded src={blogSummary.imgUrl}></Image></a>

                </Grid.Column>
            </Grid>
        </Segment>
    )
}

export default BlogItem