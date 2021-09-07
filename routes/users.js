const express = require('express');
const router = express.Router();
const authHandler = require('../middleware/auth');

const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  signup,
  login,
  getLeaderboard,
  updateWinningUser,
  updateLosingUser
} = require('../controllers/users');

//middleware for only authorized users and admins

router.route('/').get(authHandler, getUsers);
router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/leaderboard').get(getLeaderboard);
router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(authHandler, deleteUser);

router.route("/updateWinningUser").put(updateWinningUser)
router.route("/updateLosingUser").put(updateLosingUser)
module.exports = router;
