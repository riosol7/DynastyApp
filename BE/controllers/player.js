const fetch = (url) => import('node-fetch').then(({default: fetch}) => fetch(url));
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
        const getRosters = await fetch("https://api.sleeper.app/v1/league/786065005090189312/rosters")
        const parsedRosters = await getRosters.json()
        let mappedRosters = parsedRosters.map(async (roster) => {
            const foundPlayers = await Player.find({"player_id": roster.players})
            const foundStarters = await Player.find({"player_id": roster.starters})
            const foundReserve = await Player.find({"player_id": roster.reserve})
            const foundTaxi = await Player.find({"player_id": roster.taxi})
            return {...roster, 
                players:foundPlayers,
                starters:foundStarters,
                reserve:foundReserve,
                taxi:foundTaxi
            }
        })
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