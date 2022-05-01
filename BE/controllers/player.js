const Player = require("../models/Player")
const playerController = require("express").Router({ mergeParams: true });

playerController.get("/all" , async (req, res) => {
    try{
        const foundPlayers = await Player.find()
        res.status(200).json(foundPlayers)
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
})

module.exports = playerController