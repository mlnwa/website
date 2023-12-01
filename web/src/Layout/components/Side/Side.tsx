import React from 'react';
import { useMatch, useNavigate, useSearchParams } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import adminRoute from '../../../router/routes/admin';
import { Menu, Sidebar } from 'semantic-ui-react';
import { CustomRoute } from '../../../router';

type Props = {
  visible: boolean;
};

const Side = (props: Props) => {
  const routeList = adminRoute.children as CustomRoute[];
  const navigate = useNavigate();
  const location = useLocation();
  const toPath = (path: string) => {
    navigate(path);
  };
  return (
    <Sidebar animation="slide along" visible={props.visible} as={Menu} inverted vertical icon="labeled" width="thin">
      {routeList.map((item) => {
        if (item.children?.length > 0) {
          return <Menu.Item key={item.path} as={Menu.Menu}></Menu.Item>;
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
    </Sidebar>
  );
};

export default Side;
