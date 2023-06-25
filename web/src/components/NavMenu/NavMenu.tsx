import React, { Component } from 'react'
import { Header, Menu, Segment,Container,Input  } from 'semantic-ui-react'
import style from "../../assets/css/common.module.scss"
type NavItem = {
  key:string,
  label:string,
}
type Props = {
  
}

export default class MenuExampleInvertedSegment extends Component {
  state
  constructor(props:Props) {
    super(props)
    const navList: NavItem[] = [
      {
        key:"blog",
        label:"博客"
      },
      {
        key:"archives",
        label:"归档"
      },
      {
        key:"experiment",
        label:"实验中心"
      }
    ]
    this.state = {
      activeIndex: 0 ,
      navList
    }
  }

  handleItemClick = (navItem:NavItem,index:number) => {
    this.setState({ activeIndex: index })
  }

  render() {
    const { activeIndex ,navList} = this.state
    return (
      <Segment className= {`${style.padding_tb_small}`} inverted textAlign="center" basic as='nav'  attached >
        <Container textAlign='center'>
          <Menu inverted secondary  >
            <Menu.Item>
              <Header as='h1' inverted color='teal'>
                Brad
              </Header>
            </Menu.Item>
            {
              navList.map((item,index) => (
                <Menu.Item 
                  key={item.key}
                  name={item.label}
                  active={index== activeIndex}
                  onClick={()=>this.handleItemClick(item,index)}
                ></Menu.Item>
              ))
            }
            <Menu.Item position='right'>
              <Input placeholder="Search..." icon='search' ></Input>
            </Menu.Item>
          </Menu>
        </Container>
      </Segment>
    )
  }
}