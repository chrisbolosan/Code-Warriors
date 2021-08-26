const User = require("../models/User");
const jwt = require("jsonwebtoken");

//
exports.getMe = async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
};
