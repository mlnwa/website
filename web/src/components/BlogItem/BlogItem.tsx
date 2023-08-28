import React from "react"
import { BlogSummary } from "../../types"
import { Grid, GridColumn, Header, Item, Segment } from "semantic-ui-react"

type Props = {
    value:BlogSummary
}

const BlogItem = function(props:Props){
    const blogSummary:BlogSummary = props.value
    return (
        <Segment padded vertical>
            <Grid reversed="mobile" stackable>
                <GridColumn width={11}>
                    <Header as='h3' content={blogSummary.title}></Header>
                    <Item  content={blogSummary.abstract}></Item>
                </GridColumn>
                <GridColumn width={5}></GridColumn>
            </Grid>
        </Segment>
    )
}

export default BlogItem