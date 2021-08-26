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

ExerciseSchema.statics.getRandomExercise = async function () {
  const count = await this.count();
  const rand = Math.floor(Math.random() * count);
  const randomDoc = await this.findOne().skip(rand);
  return randomDoc;
};
const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;
