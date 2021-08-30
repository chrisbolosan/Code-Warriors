const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');
const path = require('path');
const dotenv = require('dotenv');
const http = require('http');
const socket = require('socket.io');
const { getMinutes, getSeconds } = require("./utils/socketfunctions")

dotenv.config({ path: './config/config.env' });

// Connecting to the database
connectDB();

const PORT = process.env.PORT || 8081;
const app = express();
const server = http.createServer(app);
const io = socket(server);

// Setting up middleware
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
app.use(morgan('dev'));

// Setting up routes
// auth and api routes
app.use('/auth/me', require('./routes/auth/me'));
app.use('/api/exercises', require('./routes/exercises'));
app.use('/api/users', require('./routes/users'));
app.use('/api/battles', require('./routes/battles'));

app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Run when client connects


let rooms = [];

io.on('connection', async (socket) => {
  socket.on('createGame', (roomId) => {
    rooms.push(roomId);
    socket.join(roomId);
    console.log('create room roomId', roomId)
    io.emit('roomId', roomId);
    io.emit('rooms', rooms);
  });

  socket.on('joinRoom', (roomId) => {
    console.log('join room roomId', roomId);
    socket.join(roomId);
    console.log("roomID", roomId)
    io.in(roomId).emit('roomFull', false)
  });


  // listen for solution code
  socket.on('solution', async (solutionObj) => {
    //Emit solution object back to front end
    await io.emit('solution', solutionObj);
  });

  // // listen for timer started
  // socket.on("timer", async (roomId) => {
  //   console.log(roomId.roomId)
  //   await socket.to(roomId.roomId).emit({
  //     minutes: getMinutes(),
  //     seconds: getSeconds()
  //   })
  // })

  //listen for leave room
  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId);
  })
});

server.listen(PORT, console.log(`Running on port ${PORT}`));
