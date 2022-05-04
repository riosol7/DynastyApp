const mongoose = require("mongoose");

const kctPlayerSchema = new mongoose.Schema({
    player: String,
    team: String,
    position: String,
    age: String,
    rating: String,
    player_id: String
})
module.exports = mongoose.model("KCT", kctPlayerSchema);