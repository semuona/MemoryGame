const express = require("express");
const Game = require("../models/Game");
const Player = require("../models/Player");
const router = express.Router();

router.get("/list", async (req, res) => {
  try {
    const games = await Player.find();
    if (games) {
      res.send({ success: true, games: games });
    } else {
      res.send({ success: false, errorId: 7 });
    }
  } catch (error) {
    console.log("Listing results ERROR", error.message);
    res.send(error.message);
  }
});

module.exports = router;
