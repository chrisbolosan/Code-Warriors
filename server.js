const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const path = require("path");
const dotenv = require("dotenv");
const http = require("http");
const socket = require("socket.io");

dotenv.config({ path: "./config/config.env" });

// Connecting to the database
connectDB();

const PORT = process.env.PORT || 8081;
const app = express();
const server = http.createServer(app);
const io = socket(server);

// Setting up middleware
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());
app.use(morgan("dev"));

// Setting up routes
// auth and api routes
app.use("/auth", require("./routes/auth/me"));
app.use("/api/exercises", require("./routes/exercises"));
app.use("/api/users", require("./routes/users"));

app.get("/*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Run when client connects

io.on("connection", async (socket) => {
  // await io.emit("message", socket.id)
  //socket.broadcast.emit("message", "a user just joined the room")

  // listen for solution code
  socket.on("solution", async (solutionObj) => {
    //Emit solution object back to front end
    await io.emit("solution", solutionObj);
  });
});

server.listen(PORT, console.log(`Running on port ${PORT}`));
