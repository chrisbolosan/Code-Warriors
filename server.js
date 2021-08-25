const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const http = require("http")
const socket = require("socket.io")

dotenv.config({ path: './config/config.env' });

// Connecting to the database
connectDB();

const PORT = process.env.PORT || 8081;
const app = express();
const server = http.createServer(app)
const io = socket(server)

//Cookie parser
app.use(cookieParser());

// Setting up middleware
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
app.use(morgan('dev'));

// Setting up routes
app.use('/api/exercises', require('./routes/exercises'));
app.use('/api/users', require('./routes/users'));

app.get("/*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"))
})

// Run when client connects
io.on("connection", async (socket) => {
  console.log(socket.id)
  await io.emit("message", socket.id)
  //socket.broadcast.emit("message", "a user just joined the room")

  // listen for solution code
  socket.on("solution", async (solutionText) => {
    await io.emit("solution", {
      id: socket.id,
      solutionText
    })
  })
})

server.listen(PORT, console.log(`Running on port ${PORT}`));

