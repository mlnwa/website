import React, { useRef, useEffect } from 'react';
import { IMessageProps, MessageType, removeMessage } from '../../IMessage';
import { Message } from 'semantic-ui-react';
import './mesage.scss';
import { useCssClassManager } from '../hooks';
export const IMessageFC: React.FC<IMessageProps> = function (props) {
  const { type, content, title, list, id, duiration } = props;
  const iMessageRef = useRef<any>();

  const classMap = {
    base: '',
    visible: 'i-message__visible',
    hidden: 'i-message__hidden',
  };
  const { addClassName, classList } = useCssClassManager(classMap);

  const clear = () => removeMessage(id);
  const handleHidden = () => {
    if (iMessageRef.current) {
      iMessageRef.current.addEventListener('animationend', clear, {
        once: true,
      });
      addClassName('hidden');
    }
  };

  const typesBool: Record<MessageType, boolean> = {
    info: false,
    warning: false,
    success: false,
    error: false,
  };
  typesBool[type] = true;
  useEffect(() => {
    addClassName('visible');
    setTimeout(() => {
      handleHidden();
    }, duiration);
  }, []);

  return (
    <div ref={iMessageRef} className={`i-message ${classList}`}>
      <Message
        floating
        info={typesBool.info}
        warning={typesBool.warning}
        success={typesBool.success}
        error={typesBool.error}
        list={list}
        content={content}
        header={title}
        size="mini"
      ></Message>
    </div>
  );
};
