const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  image: String,
  open: Boolean,
  guesses: Number,
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
