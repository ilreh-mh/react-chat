import React, { Component } from 'react';
class ChatWindow extends Component {

  render() {
    return <div className="ChatWindow h-100"
      style={{flexBasis: '100%', flexGrow: 1, overflow: 'scroll'}}
    >
      <ul>
        {this.props.messages.map(message => <li
          key={message.id} style={{listStyleType: 'none'}}
        >
          {`[${message.date}] <${message.username}> ${message.message}`}
        </li>)}
      </ul>
    </div>
  }
}

export default ChatWindow;