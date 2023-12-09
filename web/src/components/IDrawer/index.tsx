import { Drawer, DrawerProps } from 'antd';
import React from 'react';
import { Panel } from '../../class/FormStructs';
import { Divider, Form, Grid, Header, Icon, Input, Segment } from 'semantic-ui-react';
import style from './style.module.scss';
type IDrawerProps = {
  children?: React.ReactNode | React.ReactNode[];
} & DrawerProps;
type IDrawerHeaderProps = {
  title?: string;
};
type IDrawerPanelProps = {
  data: Panel;
};
type IDrawerFooterProps = {
  children?: React.ReactNode | React.ReactNode[];
};
const IDrawer = ({ children, ...drawerProps }: IDrawerProps) => {
  let footerComponent = null;
  const newChildren = React.Children.map(children, (child) => {
    if ((child as React.ReactElement).type === IDrawer.Footer) {
      footerComponent = child;
      return null;
    }
    return child;
  });
  return (
    <Drawer closable={false} width={800} placement="right" footer={footerComponent} {...drawerProps}>
      {newChildren}
    </Drawer>
  );
};
IDrawer.Header = ({ title }: IDrawerHeaderProps) => {
  return <div>{title}</div>;
};
IDrawer.Panel = ({ data }: IDrawerPanelProps) => {
  return (
    <div>
      <Divider horizontal>
        <Header as="h5">
          <Icon name={data.icon}></Icon>
          {data.title}
        </Header>
      </Divider>
      <Grid>
        {data.content.map((item) => {
          if (item.type === 'input') {
            return (
              <Form.Input
                fluid
                className={style.input_item}
                label={item.label}
                disabled={item.disabled}
                key={item.key}
                placeholder={item.placeholder}
                size="small"
                value={item.value}
                onChange={(e) => {}}
              ></Form.Input>
            );
          }
        })}
      </Grid>
    </div>
  );
};
IDrawer.Footer = ({ children }: IDrawerFooterProps) => {
  return <div className={style.footer}>{children}</div>;
};
export default IDrawer;
