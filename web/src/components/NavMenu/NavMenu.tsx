import React, { Component } from 'react'
import { Header, Menu, Segment,Container,Input ,Icon } from 'semantic-ui-react'
import style from "../../assets/css/common.module.scss"
import { useNavigate,useLocation } from 'react-router-dom'
import {root} from "../../router"
import {RouteObject} from "react-router"
import { Link } from 'react-router-dom'
type NavItem = {
  key:string,
  label:string,
}
type Props = {
  pathname:string
}

export default class MenuInvertedSegment extends Component<Props> {
  state
  constructor(props:Props) {
    super(props)
    this.state = {
      activeIndex: root.children.findIndex(item => item.path == props.pathname),
      navList:root.children
    }
  }

  handleItemClick = (navItem:RouteObject,index:number) => {
    if(index == this.state.activeIndex) return
    this.setState({ activeIndex: index })
  }

  render() {
    const { activeIndex ,navList} = this.state
    return (
      <Segment className= {`${style.padding_tb_tiny}`} inverted textAlign="center" basic as='nav'  attached >
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
                  as="span"
                  key={item.path}
                  name={item.id}
                  active={index== activeIndex}
                  onClick={()=>this.handleItemClick(item,index)}
                ><Link to={item.path}>{item.id}</Link></Menu.Item>
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