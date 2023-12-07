import React from 'react';
import { Outlet } from 'react-router-dom';
import { Segment, Transition } from 'semantic-ui-react';
import style from '../../layout.module.scss';
const MainContent = () => {
  return (
    <Segment className={`${style.main_content}`}>
      <Outlet></Outlet>
    </Segment>
  );
};

export default MainContent;
