import React, { useState } from 'react';
import { Header, Menu, Segment, Container, Input, Icon } from 'semantic-ui-react';
import style from '../../assets/css/common.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { CustomRoute, root } from '../../router';

const NavMenu = function () {
  const navList = root.children as CustomRoute[];
  const location = useLocation();
  const navigate = useNavigate();
  let defaultIndex = navList.findIndex((item) => item.path == location.pathname);
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const handleItemClick = (navItem: CustomRoute, index: number) => {
    setActiveIndex(index);
    navigate(navItem.path);
  };
  return (
    <Segment className={`${style.padding_tb_tiny}`} inverted textAlign="center" basic as="nav" attached>
      <Container textAlign="center">
        <Menu inverted secondary stackable>
          <Menu.Item>
            <Header as="h1" color="teal">
              Brad
            </Header>
          </Menu.Item>
          {navList.map((item, index) =>
            item.customProp ? (
              <Menu.Item
                key={item.path}
                name={item.customProp.label}
                active={index == activeIndex}
                onClick={() => handleItemClick(item, index)}
                icon={item.customProp.icon}
                content={item.customProp.label}
              ></Menu.Item>
            ) : null,
          )}
          <Menu.Item position="right">
            <Input placeholder="Search..." icon="search"></Input>
          </Menu.Item>
        </Menu>
      </Container>
    </Segment>
  );
};
export default NavMenu;
