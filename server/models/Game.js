const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  players: [
    {
      name: String,
      score: Number,
      victories: Number,
    },
  ],
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
