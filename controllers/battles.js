const Battle = require('../models/Battle');

exports.createBattle = async (req, res, next) => {
  try {
    const battle = await Battle.create(req.body);
    res.status(200).json(battle);
  } catch (e) {
    next(e);
  }
};

exports.updateBattle = async (req, res, next) => {
  try {
    const battle = await Battle.findByIdAndUpdate(req.params.roomID, req.body);
    res.status(200).json(battle);
  } catch (e) {
    next(e);
  }
};

exports.deleteBattle = async (req, res, next) => {
  try {
    const battle = await Battle.findByIdAndDelete(req.params.roomID);
    res.status(200).json(battle);
  } catch (e) {
    next(e);
  }
};

exports.getBattles = async (req, res, next) => {
  try {
    const battle = await Battle.find();
    res.status(200).json(battle);
  } catch (e) {
    next(e);
  }
};

exports.getOpenBattles = async (req, res, next) => {
  try {
    const battle = await Battle.find({
      completed: false,
      open: true
    });
    res.status(200).json(battle);
  } catch (e) {
    next(e);
  }
};

exports.getBattle = async (req, res, next) => {
  try {
    const battle = await Battle.findById(req.params.roomID);
    res.status(200).json(battle);
  } catch (e) {
    next(e);
  }
};
