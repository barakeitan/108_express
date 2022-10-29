const { io } = require("socket.io-client");
const {logger} = require('./logger.js');
const port = process.env.PORT || 3001;
const socket = io(`ws://localhost:${port}`);

logger.log({level: 'info', message: `socket.io client is up!`});


socket.on('connect', () => {
    logger.log({level: 'info', message: `connect to server: socket id: ${socket.id}`});
	
});

socket.on('server-message', msg => {
    logger.log({level: 'info', message: `server said:  ${msg}`});
});
