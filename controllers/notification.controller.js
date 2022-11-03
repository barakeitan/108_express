const io = require("socket.io");
const {logger} = require('./logger.js');
const port = process.env.PORT || 3000;
const socket = io();
let message, header;


logger.log({level: 'info', message: `socket.io client is up!`});

socket.on('connect', () => {
    logger.log({level: 'info', message: `connect to server: socket id: ${socket.id}`});

});

socket.on('message', msg => {
    logger.log({level: 'info', message: `server said:  ${msg}`});
    message = msg;
    header = msg.header;
});

const startTimer = () => {
    timerVar = setInterval(countTimer, 1000);
    var totalSeconds = 0;
    function countTimer() {
               ++totalSeconds;
               var hour = Math.floor(totalSeconds /3600);
               var minute = Math.floor((totalSeconds - hour*3600)/60);
               var seconds = totalSeconds - (hour*3600 + minute*60);
               if(hour < 10)
                 hour = "0"+hour;
               if(minute < 10)
                 minute = "0"+minute;
               if(seconds < 10)
                 seconds = "0"+seconds;
               totalTimer = hour + ":" + minute + ":" + seconds;
               $("#timer").text('' + totalTimer);
            }
  
}

exports.renderNotifications = (req, res) => {
    res.render("/", {
        startTimer: startTimer,
        message: message,
        header: header
    });
};