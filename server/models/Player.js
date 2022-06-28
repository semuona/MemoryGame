const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  playing: Boolean,
  victories: Number,
  defeat: Number,
  bestScore: Number,
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
