const User = require('../models/User');

// gatekeeping middleware protect routes
//adds requests to the req variables along with try catch
const authHandler = async (req, res, next) => {
  try {
    const { isAdmin, username, _id, rank } = await User.findByToken(
      req.headers.authorization
    );

    if (!username) {
      res.status(401).send('Invalid token, no user found');
    }

    req.admin = isAdmin;
    req.id = _id;
    req.rank = rank;
    next();
  } catch (err) {
    res.status(401).send('Invalid token or no token found');
    next(err);
  }
};

module.exports = authHandler;
