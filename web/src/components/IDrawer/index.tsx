import { Drawer, DrawerProps } from 'antd';
import React from 'react';
import { Panel } from '../../class/FormStructs';
import { Divider, Form, Grid, Header, Icon, Input, Segment } from 'semantic-ui-react';
import style from './style.module.scss';
import { FormFieldEnum } from '../../class/FormStructs/formField';
type IDrawerProps = {
  children?: React.ReactNode | React.ReactNode[];
} & DrawerProps;
type IDrawerHeaderProps = {
  title?: string;
};
type IDrawerPanelProps = {
  data: Panel;
  onChange: (contentIndex: number, value: any) => void;
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
IDrawer.Panel = ({ data, onChange }: IDrawerPanelProps) => {
  return (
    <div>
      <Divider horizontal>
        <Header as="h5">
          <Icon name={data.icon}></Icon>
          {data.title}
        </Header>
      </Divider>
      <Grid>
        {data.content.map((item, index) => {
          if (item.getType() === FormFieldEnum.INPUT) {
            return (
              <Form.Input
                fluid
                className={style.input_item}
                label={item.getLabel()}
                disabled={item.getDisabled()}
                key={item.getKey()}
                placeholder={item.getPlaceholder()}
                size="small"
                value={item.getValue()}
                onChange={(e) => {
                  onChange(index, e.target.value);
                }}
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
