const express = require("express");
const Card = require("../models/Card");

const router = express.Router();

const pic = require("../data/data.json");

router.get("/getPic", (req, res) => {
  try {
    res.send(pic);
  } catch (error) {
    console.log("Message ERROR:", error.message);
    res.send(error.message);
  }
});

module.exports = router;
