import React from "react"
import { Container, Segment ,Divider, Grid, Header, List, Item} from "semantic-ui-react"
import style from "../../assets/css/common.module.scss";

const Footer = function(){
    return (
        <Segment
            inverted
            attached
            vertical
            as="footer"
            className={style.padding_tb_massive}
        >
            <Container
                textAlign="center"
            >
                <Grid  divided stackable inverted >
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Header as="h4" inverted className={style.opcity_mini}>最近博客</Header>
                            <List inverted link>
                                <List.Item as="a">Apples</List.Item>
                                <List.Item as="a">Pears</List.Item>
                                <List.Item as="a">Oranges</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Header as="h4" inverted className={style.opcity_mini}>联系我</Header>
                            <List inverted link>
                                <List.Item as="a">Apples</List.Item>
                                <List.Item as="a">Pears</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <Header as="h4" inverted className={style.opcity_mini}>Blog</Header>
                            <List inverted link>
                                <List.Item as="p">这是我的个人博客，会分享关于编程、写作、思考相关的内容</List.Item>
                                <List.Item as="p">希望可以给来到这儿的朋友有所帮助...</List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Divider inverted />
                <Item as='a' className={`${style.opcity_tiny} ${style.text_spaced_tiny}`}>浙ICP备2021021318号-1</Item>
                <Item as='p' className={`${style.opcity_tiny} ${style.text_spaced_tiny}`}>Coryright@2023-2024 brad.cn Designed by Brad</Item>
            </Container>
        </Segment>
    )
}

export default Footer