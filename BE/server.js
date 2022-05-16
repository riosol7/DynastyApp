// =============================
//         DEPENDENCIES
// =============================
require("./db")
require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors");
const methodOverride = require("method-override");

const port = process.env.PORT || 5000;

// =============================
//        CORS/MIDDLEWARE
// =============================
const whiteList = ["http://localhost:3000"];

const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin || 1==1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by Cors"));
        }
    },
};

// =============================
//         CONTROLLERS
// =============================
const playerController = require("./controllers/player");
const leagueController = require("./controllers/league");

app.use(methodOverride("_method"));
app.use(cors(corsOptions));
app.use(express.json());

app.use("/player", playerController);
app.use("/league", leagueController);

app.listen(port, () => {
    console.log(`DynastyDB is running on port ${port}`)
})