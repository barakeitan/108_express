const http = require('http').createServer();
const port = process.env.PORT || 3001;

const {logger} = require('./logger.js');

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

const user = {id: '1234'};

const users = new Map(); // in the future the users should be taken from DB - every time client connect to the website

io.on('connection', (socket) => {
    logger.log({level: 'info', message:`user ${socket.id} connected`});
    users.set(user.id ,socket.id);
    brodcastMessage(socket, `Hello ${socket.id} :)`);

    socket.on('message', (message) =>     {
        logger.info({level: 'info', message:`user ${getByValue(socket.id)} with socket id: ${socket.id} said: ${message}`});
    });
    
    socket.on('disconnect', () => {
        logger.log({level: 'info', message:`user ${getByValue(socket.id)} with socket id: ${socket.id} disconnected`});
        users.delete(getByValue(socket.id));
    });
});


function brodcastMessage(socket, message) {
    logger.log({level: 'info', message: `user ${getByValue(socket.id)} brodcast message: ${message}`});
    socket.broadcast.emit('server-message', message);
}

function getByValue(searchValue) {
    for (let [key, value] of users.entries()) {
      if (value === searchValue)
        return key;
    }
  }

http.listen(port, () => console.log(`ws listening on http://localhost:${port}`) );