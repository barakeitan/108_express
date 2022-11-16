var webSocketServer = require('websocket').server;
const wsServerPort = process.env.wsServerPort || 6835;
var server = require('http').createServer().listen(wsServerPort);
var wsServer = new webSocketServer({httpServer: server});
console.log("wss is working");

const clients = {};

wsServer.on('request', (request) => {
    var userID = getUniqueID();
    const connection = request.accept(null, request.origin);
    clients[userID] = connection;
    console.log(`user ${userID} connected`);

    connection.on('message', (message) =>     {
        console.log(`server accepted new message: ${message.utf8Data}`);
    });
    
    connection.on('close', (connection) => {
        let userID = getByValue(connection);
        console.log(`client ${userID} disconnected`);
        delete clients[userID];
    });
    
});

function broadcast(msg) {
    for (let [key, value] of Object.entries(clients)) {
        value.sendUTF(msg);
      }
 };

 const getByValue = (searchValue) => {
    for (let [key, value] of Object.entries(clients)) {
      if (value === searchValue)
        return key;
    }
  }

  // This code generates unique userid for everyuser.
const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
  };

module.exports = { clients: clients, broadcast };