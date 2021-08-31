const express = require('express');
const router = express.Router();

const {
  createBattle,
  updateBattle,
  deleteBattle,
  getBattle,
  getBattles,
  getOpenBattles
} = require('../controllers/battles');

const {
  updatePlayer
} = require('../controllers/players')

//middleware for only authorized users and admins
const authHandler = require('../middleware/auth');

router.route('/').get(getBattles).post(createBattle)
router.route("/open").get(getOpenBattles)
router.route('/:roomID').get(getBattle).put(updateBattle).delete(deleteBattle);
router.route('/updatePlayer/:roomID').put(updatePlayer)

module.exports = router;
