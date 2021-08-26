const Exercise = require("../models/Exercise");
const Jsrunner = require("javascript-code-runner");
const asyncHandler = require("../middleware/async");

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
exports.createExercise = asyncHandler(async (req, res, next) => {
  if (req.admin || req.rank === "intermediate" || req.rank === "master") {
    const exercise = await Exercise.create(req.body);
    res.status(201).json(exercise);
  } else {
    res.status(401).json({ success: false, message: "Unauthorized access" });
  }
});

// @desc Update a specific Exercise
// @route PUT /api/exercises/:id
// @access Private
exports.updateExercise = asyncHandler(async (req, res, next) => {
  if (req.admin || req.rank === "intermediate" || req.rank === "master") {
    const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body);
    res.status(204).json(exercise);
  } else {
    res.status(401).json({ success: false, message: "Unauthorized access" });
  }
});

// @desc    Delete  a specific Exercise
// @route   DELETE /api/exercises/:id
// @access  Private
exports.deleteExercise = asyncHandler(async (req, res, next) => {
  if (req.admin || req.rank === "intermediate" || req.rank === "master") {
    const exercise = await Exercise.findByIdAndUpdate(req.params.id);
    res.status(204).json(exercise);
  } else {
    res.status(401).json({ success: false, message: "Unauthorized access" });
  }
});

// @desc    Check user solution
// @route   POST /api/exercises/solution
// @access  Public

// POST body: {id: "Problem ID", solution: "User solution"}
// Response: {success: "true", message: "Tests passed!"}
exports.testExercise = async (req, res, next) => {
  try {
    const { test } = await Exercise.findById(req.body.id);
    const userSolution = req.body.solution;
    const problem = `${userSolution} ${test}`;
    const { result, message } = Jsrunner(problem);
    if (result === "false") {
      return res.json({
        success: false,
        message: "Solution does not match test requirements",
      });
    } else if (message) {
      return res.json({ success: false, message });
    } else {
      return res.json({
        success: true,
        message: "tests passed",
      });
    }
  } catch (err) {
    next(err);
  }
};
