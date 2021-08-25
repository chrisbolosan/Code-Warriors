const express = require('express');
const router = express.Router();

const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  signup,
  login,
  getLeaderboard,
} = require('../controllers/users');

//protect middleware
const{protect} =require('../middleware/auth')

router.route('/').get(getUsers);
router.post("/signup", signup);
router.route('/login').post(login);
router.route('/leaderboard').get(getLeaderboard);
router.route('/:id').get(getUser).put(protect, updateUser).delete(deleteUser);


module.exports = router;
