const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const Exercise = require('./models/Exercise');
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const exercises = JSON.parse(fs.readFileSync(`${__dirname}/exercises.json`));

const importData = async () => {
  try {
    await Exercise.create(exercises);
    console.log('seeded database');
  } catch (err) {
    console.error(err, 'Failed to seed databse');
  }
};

importData();
