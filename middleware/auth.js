const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

// gatekeeping middleware protect routes
//adds requests to the req variables along with try catch
exports.protect = asyncHandler(async (req, res, next) => {
  try {
    const { isAdmin, username, _id, rank } = await User.findByToken(
      req.headers.authorization
    );

    if (!username) {
      return next(new ErrorResponse("No token found", 401));
    }

    req.rank = rank;
    req.admin = isAdmin;
    req._id = _id;
  } catch (err) {
    console.error(err);
    return next(new ErrorResponse("Not Authorized to access this route", 401));
  }
});
