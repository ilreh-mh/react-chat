"use strict";

let users = [];

const serverPort = 8280,
    http = require("http"),
    express = require("express"),
    app = express(),
    server = http.createServer(app),
    WebSocket = require("ws"),
    websocketServer = new WebSocket.Server({ server });

websocketServer.on('connection', (webSocketClient) => {
    webSocketClient.send('{ "connection" : "ok"}');
    let username = "";

    //at this point user needs userlist for dupecheck
    webSocketClient.send(`{ "type": "USERS", "users": ${JSON.stringify(
      users.map(user => user.username)
    )}}`);
    
    webSocketClient.on('message', (message) => {
        console.log("received message:", message)
        let parsedMessage = JSON.parse(message);
        if (parsedMessage.type === 'MESSAGE') {
          let dateString = new Date().toLocaleTimeString();
          websocketServer
          .clients
          .forEach( client => {
              //send the clients the current message
              client.send(`{ "type": "MESSAGE", "date": "${dateString}", "contents": ${message} }`);
          });
        }
        if (parsedMessage.type === 'USERNAME') {
          username = parsedMessage.username;
          webSocketClient.username = username;
          users.push(webSocketClient);
          websocketServer
          .clients
          .forEach( client => {
              client.send(`{ "type": "USERS", "users": ${JSON.stringify(
                users.map(user => user.username)
              )} }`);
          });
        }
    });
    webSocketClient.on('close', (connection) => {
      let currentUserIndex = users.findIndex(client => client.username == webSocketClient.username);
      delete users[currentUserIndex];
      users = users.filter(user => user);
      websocketServer
      .clients
      .forEach( client => {
        client.send(`{ "type": "USERS", "users": ${JSON.stringify(
          users.map(user => user.username)
        )} }`);
    });
    })
});

//start the web server
server.listen(serverPort, () => {
    console.log(`Websocket server started on port ` + serverPort);
});