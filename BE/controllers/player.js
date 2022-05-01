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

playerController.get("/rosters", async (req, res) => {
    try {
        // find rosters
        const rosters = req.body
        // find all players
        const foundPlayers = await Player.find()
        // map foundPlayers by player_id
        // Use For Each to iterate through the rosters, then map over the starters field and set the found player
        
        // function updateRoster(rosters, foundPlayers) {
        //     return rosters.map(roster =>
        //         roster.players.map(function (player) {
        //             foundPlayers.find(foundPlayer => foundPlayer.player_id = player)
                    
        //             return player
        //         })
        //     )
        // }

        let mappedRosters = rosters.map(async (roster) => {
            const found = await Player.find({"player_id": roster.players})
            console.log("found", found)
            return found
        })
        
        // let mappedRosters = rosters.map((roster) => {
        //     try{
        //         roster.players.map( async (player) => {
        //             const foundPlayer = await Player.find({ "player_id": player})
        //             console.log("foundPlayer", foundPlayer)
        //             return foundPlayer

        //         })
        //     } catch (err) {
        //         console.log(err)
        //     }
        // })
        const promise = await Promise.all(mappedRosters)
        console.log("mappedRosters", promise)
        res.status(200).json(promise)
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
})

module.exports = playerController