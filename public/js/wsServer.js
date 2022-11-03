const app = require('../../index');
const http = require('http').createServer(app);

const {logger} = require('./logger.js');

const io = require('socket.io')(http);


const users = new Map(); //<user.id, socket.id>

io.on('connection', (socket) => {
    logger.log({level: 'info', message:`user ${socket.id} connected`});
    users.set(user.id ,socket.id);
    brodcastMessage(socket, {header: `hi ${socket.id}` , message: `Hello ${socket.id} :)`});

    socket.on('message', (message) =>     {
        logger.info({level: 'info', message:`user ${getByValue(socket.id)} with socket id: ${socket.id} said: ${message}`});
    });
    
    socket.on('disconnect', () => {
        logger.log({level: 'info', message:`user ${getByValue(socket.id)} with socket id: ${socket.id} disconnected`});
        users.delete(getByValue(socket.id));
    });
});


function brodcastMessage(socket, message) {
    logger.log({level: 'info', message: `user ${getByValue(socket.id)} brodcast message: ${message.message}`});
    socket.broadcast.emit('message', message);
}

function getByValue(searchValue) {
    for (let [key, value] of users.entries()) {
      if (value === searchValue)
        return key;
    }
  }
