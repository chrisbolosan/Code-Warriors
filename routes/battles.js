const express = require('express');
const router = express.Router();

const {
  createBattle,
  updateBattle,
  deleteBattle,
  getBattle,
  getBattles,
} = require('../controllers/battles');

//middleware for only authorized users and admins
const authHandler = require('../middleware/auth');

router.route('/').get(getBattles).post(createBattle);
router.route('/:roomID').get(getBattle).put(updateBattle).delete(deleteBattle);

module.exports = router;
