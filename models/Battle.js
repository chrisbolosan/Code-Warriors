const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const BattleSchema = new mongoose.Schema({
  _id: Number,
  exercise_id: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false,
  },
  players: {
    type: Array,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  open: {
    type: Boolean,
    default: true
  }
});

//BattleSchema.plugin(uniqueValidator);

const Battle = mongoose.model('Battle', BattleSchema);

module.exports = Battle;
