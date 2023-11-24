import React from 'react';
export class MessageComponentClass extends React.Component {
  state: { messageList: any[] };
  add(item: any) {
    const messageList = this.state.messageList;
    messageList.push(item);
    this.setState({
      messageList,
    });
  }
  remove() {
    const messageList = this.state.messageList;
    messageList.shift();
    this.setState({
      messageList,
    });
  }
  destory() {}
}
export type MessageComponentType = typeof MessageComponentClass;
