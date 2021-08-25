const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

//middleware protect routes

exports.protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const checkUser = User.findByToken(token);
  } catch (err) {
    return next(new ErrorResponse('Not Authorized to access this route', 401));
  }
});
