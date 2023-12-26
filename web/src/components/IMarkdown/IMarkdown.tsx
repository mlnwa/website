import React, { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import style from './style.module.scss';
import { Form, TextArea } from 'semantic-ui-react';
type IMarkdownProps = {
  children?: React.ReactNode;
};
const IMarkdown = ({ children }: IMarkdownProps) => {
  const outBodyChilds: ReactNode[] = [];
  const bodyChilds = React.Children.map(children, (child) => {
    const childType = (child as React.ReactElement).type;
    if (childType === IMarkdown.Editer || childType == IMarkdown.Preview) {
      return child;
    }
    outBodyChilds.push(child);
    return null;
  });

  return (
    <div className={style.container}>
      {outBodyChilds}
      <div className={style.body}>{bodyChilds}</div>
    </div>
  );
};
IMarkdown.Header = () => {};
type IMarkdownEditerProps = {
  value: string;
  onChange: (value: string) => void;
};
IMarkdown.Editer = (props: IMarkdownEditerProps) => {
  return (
    <Form className={style.edit}>
      <TextArea
        style={{ height: '100%', resize: 'none' }}
        value={props.value}
        onChange={(e, data) => {
          props.onChange(String(data.value));
        }}
      ></TextArea>
    </Form>
  );
};
type IMarkdownPreviewProps = {
  value: string;
};
IMarkdown.Preview = (props: IMarkdownPreviewProps) => {
  return (
    <div className={style.preview}>
      <ReactMarkdown children={props.value}></ReactMarkdown>
    </div>
  );
};

export default IMarkdown;
