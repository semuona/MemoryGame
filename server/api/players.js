const express = require("express");

const Player = require("../models/Player");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name)
      return res.send({
        success: false,
        errorId: 1,
        message: "Name is required",
      });

    //registered user
    let player = await Player.findOne({ name }).select("-__v");

    if (player) {
      res.send({ success: true, player: player });
      console.log("old player login:", player);
    }
    //new user
    if (!player) {
      const newPlayer = new Player(req.body);

      player = await newPlayer.save();

      if (player) {
        res.send({ success: true, player: player });
        console.log("player new created:", player);

        if (!player) return res.send({ success: false, errorId: 2 });
      }
    }
  } catch (error) {
    console.log("Register/LOGIN ERROR:", error.message);
    res.send(error.message);
  }
});

router.patch("/addinfo/:playerid", async (req, res) => {
  const playerid = req.params.playerid;

  const { totalScore, victories } = req.body;

  try {
    const player = await Player.findByIdAndUpdate(
      playerid,
      { victories: victories, totalScore: totalScore },
      { new: true }
    );
    if (player) {
      res.send({ success: true, player: player });
      console.log("player updated---------------:", player);
    }

    if (!player) return res.send({ success: false, errorId: 6 });
  } catch (error) {
    res.send("UPDATE Players scores and victories error", error.message);
  }
});

module.exports = router;
