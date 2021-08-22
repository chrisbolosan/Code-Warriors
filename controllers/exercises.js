const Exercise = require("../models/Exercise");

// @desc    Get Exercise
// @route   GET /api/exercises
// @access  Public
exports.getExercises = async (req, res, next) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  } catch (err) {
    next(err);
  }
};

// @desc Get a specific Exercise
// @route GET /api/exercises/:id
// @access Public
exports.getExercise = async (req, res, next) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    res.status(200).json(exercise);
  } catch (err) {
    next(err);
  }
};

// @desc Create or Seed Exercise
// @route POST /api/exercises
// @access Private
exports.createExercise = async (req, res, next) => {
  try {
    const exercise = await Exercise.create(req.body);
    res.status(201).json(exercise);
  } catch (err) {
    next(err);
  }
};

// @desc Update a specific Exercise
// @route PUT /api/exercises/:id
// @access Private
exports.updateExercise = async (req, res, next) => {
  try {
    const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body);
    res.status(204).json(exercise);
  } catch (err) {
    next(err);
  }
};

// @desc Delete  a specific Exercise
// @route  /api/exercises/:id
// @access Private
exports.deleteExercise = async (req, res, next) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    res.status(200).json(exercise);
  } catch (err) {
    next(err);
  }
};
