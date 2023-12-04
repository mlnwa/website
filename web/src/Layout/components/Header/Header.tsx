import React from 'react';
import { matchRoutes, useLocation } from 'react-router-dom';
import { Breadcrumb, Button, Segment } from 'semantic-ui-react';
import adminRoute from '../../../router/routes/admin';
type Props = {
  setSideVisible: () => void;
  sideVisible: boolean;
};
const Header = ({ setSideVisible, sideVisible }: Props) => {
  const location = useLocation();
  const matchs = matchRoutes(adminRoute.children, location);
  const sections = matchs.map(({ route }, index) => {
    return {
      content: route.customProp.label,
      key: route.customProp.label,
      link: index != matchs.length - 1,
      active: index == matchs.length - 1,
    };
  });
  return (
    <Segment>
      <Button icon={sideVisible ? 'outdent' : 'indent'} onClick={() => setSideVisible()}></Button>
      <Breadcrumb icon="right angle" sections={sections}></Breadcrumb>
    </Segment>
  );
};

export default Header;
