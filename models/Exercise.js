const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  exerciseBody: {
    type: String,
    required: true,
  },
  test: {
    type: String,
    required: true,
  },
  problemDescription: {
    type: String,
    required: true,
  },
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;
