import React, { ReactNode, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, solarizedlight, darcula, dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import style from './style.module.scss';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css';
import './markdown.css';
import { Form, TextArea } from 'semantic-ui-react';
type IMarkdownProps = {
  children?: React.ReactNode;
};
const them = {
  dark: vscDarkPlus,
  light: solarizedlight,
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
  const textAreaRef = useRef(null);
  const handleKeyDown = (e: any) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      props.onChange(props.value.substring(0, start) + '\t' + props.value.substring(end));
      setTimeout(() => {
        textAreaRef.current.ref.current.setSelectionRange(start + 1, start + 1);
      });
    }
  };
  return (
    <Form className={style.edit}>
      <TextArea
        ref={textAreaRef}
        className={style.textarea}
        style={{ height: '100%', resize: 'none' }}
        value={props.value}
        onChange={(e, data) => {
          props.onChange(String(data.value));
        }}
        onKeyDown={handleKeyDown}
      ></TextArea>
    </Form>
  );
};
type IMarkdownPreviewProps = {
  value: string;
  darkMode?: boolean;
};
IMarkdown.Preview = (props: IMarkdownPreviewProps) => {
  const { darkMode, value } = props;
  return (
    <ReactMarkdown
      components={{
        code({ node, className, children, ...rest }) {
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <SyntaxHighlighter
              PreTag="div"
              showInlineLineNumbers={true}
              style={darkMode ? them.dark : them.light}
              language={match[1]}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code {...rest} className={`${className} default_code`}>
              {children}
            </code>
          );
        },
      }}
      className={style.preview}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeRaw, rehypeKatex]}
      children={value}
    ></ReactMarkdown>
  );
};

export default IMarkdown;
