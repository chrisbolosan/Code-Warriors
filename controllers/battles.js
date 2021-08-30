const Battle = require('../models/Battle');

// @desc  Create Battle
// @route /api/battles/
// @access Private
exports.createBattle = async (req, res, next) => {
  try {
    const battle = await Battle.create(req.body);
    res.status(200).json(battle);
  } catch (error) {
    next(error);
  }
};

// @desc  Update Battle
// @route /api/battles/:roomID
// @access Private
exports.updateBattle = async (req, res, next) => {
  try {
    const battle = await Battle.findByIdAndUpdate(req.params.roomID, req.body);
    res.status(200).json(battle);
  } catch (error) {
    next(error);
  }
};

// @desc  Delete Battle
// @route /api/battles/:roomID
// @access Private
exports.deleteBattle = async (req, res, next) => {
  try {
    const battle = await Battle.deleteOne({
      roomId: req.params.roomID,
    });
    res.status(200).json(battle);
  } catch (error) {
    next(error);
  }
};

// @desc  Get Battles
// @route /api/battles/
// @access Private
exports.getBattles = async (req, res, next) => {
  try {
    const battle = await Battle.find();
    res.status(200).json(battle);
  } catch (error) {
    next(error);
  }
};

// @desc  Get Open Battles
// @route /api/battles/open
// @access Private
exports.getOpenBattles = async (req, res, next) => {
  try {
    const battle = await Battle.find({
      completed: false,
      open: true,
    });
    res.status(200).json(battle);
  } catch (error) {
    next(error);
  }
};

// @desc  Get Battles
// @route /api/battles/:roomID
// @access Private
exports.getBattle = async (req, res, next) => {
  try {
    const battle = await Battle.find({
      roomId: req.params.roomID,
    });
    res.status(200).json(battle);
  } catch (error) {
    next(error);
  }
};
