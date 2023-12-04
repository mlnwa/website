import React, { useState } from 'react';
import { matchRoutes, useMatch, useNavigate, useSearchParams } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import adminRoute from '../../../router/routes/admin';
import {
  Accordion,
  AccordionTitle,
  AccordionTitleProps,
  Header,
  Icon,
  Menu,
  Search,
  Sidebar,
  Transition,
} from 'semantic-ui-react';
import { CustomRoute } from '../../../router';

type Props = {
  visible: boolean;
};

const Side = (props: Props) => {
  const routeList = adminRoute.children.filter((item) => !item.index);
  const navigate = useNavigate();
  const location = useLocation();
  // const routeMatchs = matchRoutes(adminRoute.children, location);
  // console.log(routeMatchs);

  const [activeIndex, setActiveIndex] = useState<string | number>(-1);
  const toPath = (path: string) => {
    setActiveIndex(-1);
    navigate(path);
  };
  const handleClick = (e: React.MouseEvent<HTMLDivElement>, titleProps: AccordionTitleProps) => {
    const { index } = titleProps;
    setActiveIndex(index == activeIndex ? -1 : index);
  };
  return (
    <Sidebar animation="slide along" visible={props.visible} as={Menu} inverted vertical width="thin">
      <Menu.Item>
        <Menu.Item as="a" content="博客后台管理" onClick={() => toPath('/admin')}></Menu.Item>
      </Menu.Item>
      <Accordion inverted>
        {routeList.map((item: CustomRoute, index) => {
          if (item.children?.length > 0) {
            return (
              <Menu.Item key={item.path}>
                <Accordion.Title
                  active={activeIndex == index}
                  content={item.customProp.label}
                  index={index}
                  onClick={handleClick}
                ></Accordion.Title>
                <Accordion.Content
                  active={activeIndex == index}
                  content={item.children.map((val: CustomRoute) => (
                    <Menu.Item
                      active={val.path == location.pathname}
                      onClick={() => navigate(val.path)}
                      content={val.customProp.label}
                      icon={val.customProp.icon}
                      key={val.path}
                    ></Menu.Item>
                  ))}
                ></Accordion.Content>
              </Menu.Item>
            );
          } else {
            return (
              <Menu.Item
                active={item.path === location.pathname}
                onClick={() => toPath(item.path)}
                icon={item.customProp.icon}
                key={item.path}
                content={item.customProp.label}
              ></Menu.Item>
            );
          }
        })}
      </Accordion>
    </Sidebar>
  );
};

export default Side;
