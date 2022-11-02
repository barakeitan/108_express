require("dotenv").config();
// import * as dotenv from 'dotenv';
// dotenv.config();
const express = require("express");
// import express from 'express';
const path = require("path");
const url = require("url");
// import path from 'path';

const app = express();

// view engine setup
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 3001;
app.set("port", port);
// app.listen(port, () => {
//   console.log("Server running at port " + port);
// });


//-------------- socket io notification -----------------//


// const http = require('http').createServer();

// const io = require('socket.io')(http, {
//     cors: { origin: "*" }
// });
// const user = {id: '1234'};

// const users = new Map(); // in the future the users should be taken from DB - every time client connect to the website

// io.on('connection', (socket) => {
//     console.log(`user ${socket.id} connected`);
//     users.set(user.id ,socket.id);
// });

// socket.on('message', (message) =>     {
//     console.log(`${socket.id} said:  ${message}`);
//     // io.emit('message', `${socket.id} said ${message}` );   
// });

// socket.on('disconnect', () => {
//     socket.broadcast.emit('user-disconnected', users[socket.id])
//     delete users[socket.id]
//   })

// http.listen(port, () => console.log(`ws listening on http://localhost:${port}`) );


//--------------------- Looger -----------------------//

const winston = require('winston');
// import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.json()
  ),
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console(),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

module.exports = { logger };