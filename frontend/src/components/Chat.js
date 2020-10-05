import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import 'bootstrap/dist/css/bootstrap.css';
import ChatWindow from './ChatWindow';
import UserArea from './UserArea';
import EnterArea from './EnterArea';
import EnterUsername from './EnterUsername';

// must match the port of backend-server
const serverURL = 'ws://localhost:8280';

const client = new W3CWebSocket(serverURL);

client.onopen = () => {
  console.log('WebSocket Client Connected');
};

const addSiteCSS = () => {
  return <style>{`
    html, body, #root, .windowWrapper {
      height: 100%;
    }
    .windowWrapper {
      display: flex;
      overflow: scroll
    }
  `}</style>
}

class Chat extends Component {

  state = {
    username: "",
    messages: [],
    users: []
  }

  componentDidMount = () => {
    // Connecting the socket-responses
    client.onmessage = message => {
      let messageParsed = JSON.parse(message.data);
      if (messageParsed.type === 'MESSAGE') {
        messageParsed = {
          // id is needed in client for key-prop on map / ChatWindow
          id: Math.round(Math.random() * 10000000),
          username: messageParsed.contents.username,
          message: messageParsed.contents.message,
          date: messageParsed.date
        }
        this.setState({messages: [...this.state.messages, messageParsed]});

        // scrolling to bottom of text on every post
        let chatWindowNode = document.querySelector(".ChatWindow");
        if (chatWindowNode) {
          chatWindowNode.scrollTop = chatWindowNode.scrollHeight;
        }
      }
      else if (messageParsed.type === 'USERS') {
        this.setState({users: messageParsed.users});
      }
    };
  }

  // For the Wrapper-Node of the chat
  addChatClasses = () => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }
  }

  // This is passed/used in component EnterArea
  sendMessage = messageText => {
    let message = {
      username: this.state.username,
      message: messageText
    }
    client.send(JSON.stringify({...{type: 'MESSAGE', ...message}}));    
  }

  // This is passed/used in component EnterUsername
  sendUsername = username => {
    client.send(JSON.stringify({...{type: 'USERNAME', username: username}}));
  }
  // This is passed/used in component EnterUsername
  setUsername = username => {
    if (!username) {
      alert("Empty username is not allowed!");
      return false;
    }
    else if (this.state.users.find(user => user == username)) {
      alert ("Username already taken!");
      return false;
    }

    this.setState({username: username});
    return true;
  }

  render() {
    return <div className="Chat" style={this.addChatClasses()}>
      {addSiteCSS()}
      {this.state.username && <React.Fragment>
        <div className="windowWrapper">
          <ChatWindow messages={this.state.messages} />
          <UserArea users={this.state.users} />
        </div>
        <EnterArea
          setMessages={this.setMessages}
          sendMessage={this.sendMessage}
          username={this.state.username}
          serverURL={serverURL}
        />
      </React.Fragment>}
      {!this.state.username && <EnterUsername
        setUsername={this.setUsername}
        sendUsername={this.sendUsername}
      />}
    </div>
  }
}

export default Chat;
