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
        
        let mappedRosters = rosters.map((roster) => 
       
                roster.players.map( async (player, req, res) => {

                        const foundPlayer = await Player.find({ "player_id": player})
                        console.log("foundPlayer", foundPlayer)
                        Promise.resolve(foundPlayer)
                        return foundPlayer
                

                }
                    
                    //    foundPlayers.find(foundPlayer => foundPlayer.player_id = player)
                )
    
        )


        console.log("mappedRosters", mappedRosters)
        res.status(200).json(mappedRosters)
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
})

module.exports = playerController