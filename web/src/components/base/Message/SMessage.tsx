import React, { useRef } from 'react';
import { Message } from 'semantic-ui-react';
import { MessageComponentClass } from './prototype';
export class SMessage extends MessageComponentClass {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = { messageList: [] };
  }
  render(): React.ReactNode {
    return (
      <div>
        {this.state.messageList.map((item, index) => {
          return (
            <Message key={index} info size="small" floating>
              {item}
            </Message>
          );
        })}
      </div>
    );
  }
}
