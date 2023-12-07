import React, { useState } from 'react';
import Header from './components/Header/Header';
import Side from './components/Side/Side';
import MainContent from './components/MainContent/MainContent';
import Footer from './components/Footer/Footer';
import { Grid, Segment, Sidebar } from 'semantic-ui-react';
import style from './layout.module.scss';
const Layout = function () {
  const [sideVisible, setSideVisible] = useState(true);
  const switchSide = () => {
    setSideVisible(!sideVisible);
  };
  return (
    <Sidebar.Pushable>
      <Side visible={sideVisible}></Side>
      <Sidebar.Pusher dimmed={false} className={`${style.sidebar_pusher}`}>
        <Header setSideVisible={switchSide} sideVisible={sideVisible}></Header>
        <MainContent></MainContent>
        <Footer></Footer>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default Layout;
