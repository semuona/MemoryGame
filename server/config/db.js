const mongoose = require("mongoose");

require("dotenv").config();

module.exports = async () => {
  try {
    mongoose.connect(process.env.DB_URI);

    console.log("-------Connected to DB--------");
  } catch (error) {
    console.error("DB connection error", error.message);

    process.exit(1);
  }
};
