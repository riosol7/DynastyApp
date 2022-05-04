const fetch = (url) => import('node-fetch').then(({default: fetch}) => fetch(url));
const Player = require("../models/Player")
const KCT = require("../models/KCT")
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

        const getUsers = await fetch("https://api.sleeper.app/v1/league/786065005090189312/users")
        const parsedUsers = await getUsers.json()

        const getKCT = await fetch("https://sheetdb.io/api/v1/gultqvcl60sw9")
        const parsedKCT = await getKCT.json()

        let mergeKCT = parsedKCT.map(async kct => {
            const foundPlayers = await Player.find({"full_name":kct.player, "position": kct.position})
            let sleeperID = 0 
            for(let i=0; i < foundPlayers.length; i++){
                sleeperID = foundPlayers[i].player_id
                return {
                    ...kct,
                    player_id: sleeperID
                }
            }
       
        })
        const updatedPlayers = await Promise.all(mergeKCT)
        const cleanDB = await KCT.deleteMany({})
        const insertKCT = await KCT.insertMany(updatedPlayers)

        let mappedRosters = parsedRosters.map(async (roster) => {
            const foundPlayers = await Player.find({"player_id": roster.players})
            const kctRankings = await KCT.find({"player_id": roster.players})
            const foundStarters = await KCT.find({"player_id": roster.starters})
            const foundReserve = await Player.find({"player_id": roster.reserve})
            const foundTaxi = await Player.find({"player_id": roster.taxi})

            let foundUser = parsedUsers.find(user => user.user_id === roster.owner_id)
        
            return {...roster, 
                owner_id:foundUser,
                players:foundPlayers,
                starters:foundStarters,
                reserve:foundReserve,
                taxi:foundTaxi,
                kct:kctRankings
            } 
        })
        const promise = await Promise.all(mappedRosters)

        res.status(200).json(promise)

    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
})

module.exports = playerController