const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Card",
    },
  ],
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
