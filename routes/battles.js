const express = require('express');
const router = express.Router();

const {
  createBattle,
  updateBattle,
  deleteBattle,
  getBattle,
  getBattles,
  getOpenBattles,
  updateRoom
} = require('../controllers/battles');

const {
  updatePlayer
} = require('../controllers/players')

router.route('/').get(getBattles).post(createBattle)
router.route("/open").get(getOpenBattles)
router.route("/updateRoom").put(updateRoom)
router.route('/:roomID').get(getBattle).put(updateBattle).delete(deleteBattle);
router.route('/updatePlayer/:roomID').put(updatePlayer)


module.exports = router;
