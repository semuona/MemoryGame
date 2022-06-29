const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

app.use("/players", require("./api/players"));
app.use("/cards", require("./api/cards"));
app.use("/games", require("./api/games"));

/* const connectToDb = require("./config/db");
connectToDb();
 */
const port = process.env.PORT || 8080;

app.listen(port, () => console.log("server is up and running at port", port));
