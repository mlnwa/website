import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { cloneDeep } from 'lodash';
import { IdUtil } from '../../utils';
import { IMessageFC } from '../base/Message';

type IMessageConfig = {
  title?: string;
  content?: string;
  list?: string[];
  duiration?: number;
  position?: 'top' | 'bottom';
};
export type MessageType = 'info' | 'warning' | 'success' | 'error';
// export const iMessageTypes = ['info', 'warning', 'success', 'error'] as const;
// export type MessageType = (typeof iMessageTypes)[number];
export type IMessageProps = IMessageConfig & { type: MessageType; id: string };

const CONTAINER_ID = 'i-message__container';
const createContainer = function () {
  let container = document.getElementById(CONTAINER_ID);
  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', CONTAINER_ID);
    document.body.appendChild(container);
  }
  return container;
};
let root: any;
const renderMessage = function (messageQueue: IMessageProps[]) {
  const container = createContainer();
  const MessageComponents = messageQueue.map((props) => {
    return <IMessageFC {...props} key={props.id}></IMessageFC>;
  });
  if (!root) {
    root = createRoot(container);
  }
  root.render(MessageComponents);
};

const MESSAGE_QUEUE: Array<IMessageProps> = [];
const addMessage = function (props: IMessageProps) {
  MESSAGE_QUEUE.push(props);
  renderMessage(MESSAGE_QUEUE);
};

export const removeMessage = function (id: string) {
  const position = MESSAGE_QUEUE.findIndex((item) => id == item.id);
  MESSAGE_QUEUE.splice(position, 1);
  renderMessage(MESSAGE_QUEUE);
};

export class IMessage {
  private static iMessageConfig: IMessageConfig = {
    title: '提示',
    content: '',
    duiration: 2000,
    position: 'top',
    list: [],
  };
  // private static BaseCompnent: MessageComponentType = SMessage;
  static info(options?: IMessageConfig | string): void {
    IMessage.notice('info', options);
  }
  static warning(options?: IMessageConfig | string): void {
    IMessage.notice('warning', options);
  }
  static success(options?: IMessageConfig | string): void {
    IMessage.notice('success', options);
  }
  static error(options?: IMessageConfig | string): void {
    IMessage.notice('error', options);
  }
  static config(iMessageConfig: IMessageConfig): void {
    IMessage.iMessageConfig = {
      ...IMessage.iMessageConfig,
      ...iMessageConfig,
    };
  }
  static destory() {}

  private static notice(type: MessageType, config?: IMessageConfig | string): void {
    let props: IMessageProps;
    const id = IdUtil.uuid();
    if (typeof config == 'string') {
      props = {
        ...IMessage.iMessageConfig,
        content: config,
        type,
        id,
      };
    } else {
      props = {
        ...IMessage.iMessageConfig,
        ...config,
        type,
        id,
      };
    }
    addMessage(props);
  }
}
