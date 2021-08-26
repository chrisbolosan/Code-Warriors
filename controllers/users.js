const User = require("../models/User");
//middleware for try/catch
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get users
// @route   GET /api/users
// @access  Public
exports.getUsers = asyncHandler(async (req, res, next) => {
  if (req.admin) {
    const users = await User.find().select("username totalPoints rank ");
    res.status(200).json(users);
  } else {
    const user = await User.findById(req._id);
    res.status(200).json(user);
  }
});

// @desc Get a specific user
// @route GET /api/users/:id
// @access Public
//if request is coming from admin token,  admin can see all params.
exports.getUser = asyncHandler(async (req, res, next) => {
  if (req.admin) {
    const user = await User.findById(req.params.id).select(
      "username totalPoints rank email"
    );
    res.status(200).json(user);
    //if requestID matches userid, send response is information for the matching id
  } else if (req._id === req.params.id) {
    const user = await User.findById(req.params.id).select(
      "username totalPoints rank email"
    );
    res.status(200).json(user);
  } else {
    req.status(401).send("Not authorized");
  }
});

// @desc Create new user
// @route POST /api/auth/signup
// @access Public
exports.signup = asyncHandler(async (req, res, next) => {
  //   const user = await User.create(req.body);
  //   res.status(201).json({ data: user });
  // });
  const { username, password, email } = req.body;

  //create user
  const user = await User.create({
    username,
    password,
    email,
    //default other fields
  });
  //create token
  //   const token = user.getSignedJwtToken();

  //   res.status(200).json({ success: true, token });
  sendTokenResponse(user, 200, res);
});

//@desc     Login user
// @route   POST /api/users/login
//@access   Public
exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  //Validate email & password

  if (!username || !password) {
    return next(
      new ErrorResponse("Please provide an username and password", 400)
    );
  }
  //Check for user plus validation password
  const user = await User.findOne({ username });
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  //Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    console.log(isMatch);
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  //create token
  //   const token = user.getSignedJwtToken();

  //   res.status(200).json({ success: true, token });
  sendTokenResponse(user, 200, res);
});

// @desc Update a specific user
// @route PUT /api/users/:id
// @access Private only to user's own id.
exports.updateUser = asyncHandler(async (req, res, next) => {
  if (req.admin) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(204).json(user);
  } else if (req.params.id === req._id) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(204).json(user);
  } else {
    res.status(401).json({ success: false, message: "Unauthorized request" });
  }
});

// @desc Delete  a specific user
// @route  /api/users/:id
// @access Private only to either Admins or User's by their id
exports.deleteUser = asyncHandler(async (req, res, next) => {
  if (req.admin) {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
  } else if (req.params.id === req._id) {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
  } else {
    res.status(401).json({ success: false, message: "Unauthorized request" });
  }
});

// @desc  Get leaderboard
// @route /api/users/leaderboard
// @access Public
exports.getLeaderboard = asyncHandler(async (req, res, next) => {
  const leaderboard = await User.find()
    .sort({ totalPoints: -1 })
    .limit(10)
    .select("username totalPoints");
  res.status(200).json(leaderboard);
});

const sendTokenResponse = (user, statusCode, res) => {
  //create token
  const token = user.getSignedJwtToken();
  //parameters for cookie JWT
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  //cookie environment when in production, we'll have a secure route
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res
    .status(statusCode)
    .cookie("token", token, options)
    //send token back to response
    .json({
      success: true,
      token,
    });
};
