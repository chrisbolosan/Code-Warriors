const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');
const path = require('path');
const dotenv = require('dotenv');
const http = require('http');
const socket = require('socket.io');
const Battle = require("./models/Battle")

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
    io.in(roomId).emit('roomFull', false)
  });

  socket.on('startGame', async (roomId) => {
    console.log("ROOMID is ", roomId)
    io.emit('gameStarted', true)
  })

  // listen for when a user submits code
  socket.on("submitted", async (info) => {
    io.in(info.roomId).emit("submitted", info)
  })

  // listen for when the game is ovaaaaaa
  socket.on("gameOver", async (roomId) => {
    const battle = await Battle.findOne({roomId});
    await Battle.findByIdAndUpdate(
      { _id: battle._id },
      { completed: "true" }
    )
    io.in(roomId).emit("endGame", battle._id)

    console.log("GAME OVER", roomId)
  })

  // listen for solution code
  socket.on('solution', async (solutionObj) => {
    //Emit solution object back to front end
    await io.emit('solution', solutionObj);
  });


  //listen for leave room
  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId);
  })

  //listen for when winner  needs to be determined
  socket.on('determineWinner', (roomId) => {
    io.in(roomId).emit("winner")
  })
  
  //Listen for game clock running out
  socket.on('outOfTime', (roomId) => {
    socket.leave(roomId);
  })
});

server.listen(PORT, console.log(`Running on port ${PORT}`));
