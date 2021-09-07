const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @desc    Get users
// @route   GET /api/users
// @access  Public
exports.getUsers = async (req, res, next) => {
  try {
    if (req.admin) {
      const users = await User.find().select(
        'username totalPoints rank isAdmin email'
      );
      return res.status(200).json(users);
    } else {
      const user = await User.findById(req.id).select(
        'rank totalPoints username email'
      );
      return res.status(200).json(user);
    }
  } catch (error) {
    next();
  }
};

// @desc Get a specific user
// @route GET /api/users/:id
// @access Public
//if request is coming from admin token,  admin can see all params.
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select(
      'username totalPoints rank email'
    );
    res.status(200).json(user);
  } catch (error) {
    next();
  }
};

// @desc Create new user
// @route POST /api/auth/signup
// @access Public
exports.signup = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    //create user
    const user = await User.create({
      username,
      password,
      email,
      //default other fields
    });
    const token = user.getSignedJwtToken();
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(404).json({ success: false, message: `${error}` });
    next();
  }
};

//@desc     Login user
// @route   POST /api/users/login
//@access   Public
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    //Validate email & password

    if (!username || !password) {
      return res.status(401).send('Please add both username and password');
    }
    //Check for user plus validation password
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send('Invalid username');
    }
    //Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      res.status(401).send('Invalid Password');
    }
    //create token
    const token = user.getSignedJwtToken();
    res.status(200).json({ success: true, token });
  } catch (error) {
    next();
  }
};

// @desc Update a specific user
// @route PUT /api/users/:id
// @access Public only to user's own id.
exports.updateUser = async (req, res, next) => {
  try {
    const { totalPoints } = req.body;
    let newRank;
    const user = await User.findById(req.params.id);
    const newPoints = totalPoints + user.totalPoints;
    if (newPoints >= 50 && newPoints < 150) newRank = 'Novice';
    else if (newPoints >= 150 && newPoints < 300) newRank = 'Intermediate';
    else newRank = 'master';
    const changed = await User.findByIdAndUpdate(req.params.id, {
      totalPoints: newPoints,
      rank: newRank,
    });
    res.status(200).json(changed);
  } catch (error) {
    next();
  }
};

// @desc Delete  a specific user
// @route  /api/users/:id
// @access Private only to either Admins or User's by their id
exports.deleteUser = async (req, res, next) => {
  try {
    if (req.admin) {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json(user);
    } else if (String(req.params.id) === String(req._id)) {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json(user);
    } else {
      res.status(401).json({ success: false, message: 'Unauthorized request' });
    }
  } catch (error) {
    next();
  }
};

// @desc  Get leaderboard
// @route /api/users/leaderboard
// @access Public
exports.getLeaderboard = async (req, res, next) => {
  try {
    const leaderboard = await User.find()
      .sort({ totalPoints: -1 })
      .limit(10)
      .select('username totalPoints rank');
    res.status(200).json(leaderboard);
  } catch (error) {
    next();
  }
};
