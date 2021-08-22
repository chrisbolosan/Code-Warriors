const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  frame: {
    type: String,
    required: true,
  },
  tests: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    default: '',
  },
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;
