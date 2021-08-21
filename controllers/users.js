const User = require("../models/User");

// @desc    Get users
// @route   GET /api/users
// @access  Public

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
// @desc Get a specific user
// @route GET /api/users/:id
// @access Public
exports.getUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };

// @desc Create or Seed user
// @route POST /api/users
// @access Private
exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

// @desc Update a specific user
// @route PUT /api/users/:id
// @access Private
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(204).json(user);
  } catch (err) {
    next(err);
  }
};

// @desc Delete  a specific user
// @route  /api/users/:id
// @access Private
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
