const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");

dotenv.config({ path: './config/config.env' });

// Connecting to the database
connectDB();

const PORT = process.env.PORT || 8081;
const app = express();

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

app.listen(PORT, console.log(`Running on port ${PORT}`));
