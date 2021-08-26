const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');
const path = require('path');
const dotenv = require('dotenv');
const http = require('http');
const socket = require('socket.io');

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
app.use('/api/exercises', require('./routes/exercises'));
app.use('/api/users', require('./routes/users'));

app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Run when client connects

let rooms = []

io.on("connection", async (socket) => {
  socket.on('createGame', (roomId) => {
    rooms.push(roomId)
    socket.join(roomId);
    // console.log('create room roomId', roomId)
    io.emit('roomId', roomId)
    io.emit('rooms', rooms)
  })

socket.on('joinRoom', (roomId) => {
  console.log('join room roomId', roomId)
  socket.join(roomId)
})


  // listen for solution code
  socket.on("solution", async (solutionObj) => {
    //Emit solution object back to front end
    await io.emit("solution", solutionObj)
  })
})


server.listen(PORT, console.log(`Running on port ${PORT}`));
