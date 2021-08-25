const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

//middleware protect routes

exports.protect = asyncHandler(async (req, res, next) => {
  try {
    const { isAdmin, username, _id } = User.findByToken(req.headers.authorization);

    if (!username) {
      return next(new ErrorResponse("No token found", 401));
    }

    req.admin = isAdmin;
    req._id = _id
  } catch (err) {
    return next(new ErrorResponse("Not Authorized to access this route", 401));
  }
});
