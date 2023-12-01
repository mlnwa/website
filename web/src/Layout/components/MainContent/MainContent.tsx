import React from 'react';
import { Outlet } from 'react-router-dom';

const MainContent = () => {
  return (
    <div style={{ flex: 1 }}>
      <Outlet></Outlet>
    </div>
  );
};

export default MainContent;
