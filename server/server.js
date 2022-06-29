const express = require("express");
const app = express();
const cors = require('cors');
require("dotenv").config();

// allow specific domains to fetch data from this server
const allowedOrigins = [
    'http://localhost:3000',
    'http://yourapp.com'
];

// apply cors with settings and check that the origins are set, otherwise throw an understandable error
app.use(cors({
    origin: function(origin, callback){
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(express.json());

app.use("/players", require("./api/players"));
app.use("/cards", require("./api/cards"));
app.use("/games", require("./api/games"));

/* const connectToDb = require("./config/db");
connectToDb();
 */
const port = process.env.PORT || 8080;

app.listen(port, () => console.log("server is up and running at port", port));
