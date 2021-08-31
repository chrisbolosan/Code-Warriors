const Battle = require("../models/Battle");

// @desc  Update Battles
// @route /api/battles/updatePlayer/:roomID
// @access Public
exports.updatePlayer = async (req, res, next) => {
  try {
    const { battleId, updatedPlayer } = req.body;
    const playerId = updatedPlayer.id;

    const updated = await Battle.findOneAndUpdate(
      { _id: battleId, "players.id": playerId },
      {
        $set: {
          "players.$": updatedPlayer,
        },
      }
    );
    console.log("this is the updated back in backend", updated)
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};
