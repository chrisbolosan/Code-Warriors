const express = require('express');
const router = express.Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getLeaderboard,
} = require('../controllers/users');

router.route('/').get(getUsers).post(createUser);
router.route('/leaderboard').get(getLeaderboard);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
