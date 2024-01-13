import { Drawer, DrawerProps } from 'antd';
import React from 'react';
import { Panel } from '../../class/FormStructs';
import { Divider, Form, Grid, Header, Icon, Input, Segment } from 'semantic-ui-react';
import style from './style.module.scss';
import { FormField, FormFieldEnum } from '../../class/FormStructs/formField';
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
          switch (item.getType()) {
            case FormFieldEnum.INPUT:
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
                  onChange={(e, val) => {
                    onChange(index, val.value);
                  }}
                ></Form.Input>
              );
            case FormFieldEnum.SELECT:
              return (
                <Form.Select
                  label={item.getLabel()}
                  options={item.getOptions()}
                  value={item.getValue()}
                  onChange={(e, val) => {
                    onChange(index, val.value);
                  }}
                ></Form.Select>
              );
            case FormFieldEnum.RADIO:
              const radioItem = item as FormField<boolean>;
              return (
                <Form.Radio
                  checked={radioItem.getValue()}
                  label={radioItem.getLabel()}
                  key={radioItem.getKey()}
                  disabled={radioItem.getDisabled()}
                  onChange={(e, val) => {
                    onChange(index, val.value);
                  }}
                ></Form.Radio>
              );
            case FormFieldEnum.TEXTAREA:
            default:
              return null;
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
