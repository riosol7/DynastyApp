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
            const foundPlayers = await Player.find(
                {  
                    "full_name": kct.player, 
                    "position": kct.position
                }
            )
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

        const filtered = {
            age:1, 
            college:1,
            fantasy_data_id:1,
            full_name:1,
            height:1,
            number:1,
            player_id:1,
            position:1,
            team:1, 
            weight:1,
            years_exp:1
        }

        let mappedRosters = parsedRosters.map(async (roster) => {
            const foundPlayers = await Player.find({"player_id": roster.players}, filtered)
            const kctRankings = await KCT.find({"player_id": roster.players})
            const foundStarters = await KCT.find({"player_id": roster.starters})
            const foundReserve = await Player.find({"player_id": roster.reserve}, filtered)
            const foundTaxi = await Player.find({"player_id": roster.taxi}, filtered)

            let foundUser = parsedUsers.find(user => user.user_id === roster.owner_id)

            let qbTotal = kctRankings.filter(player => player.position === "QB")
            .map(player => player.rating)
            .reduce((a, b) => Number(a) + Number(b), 0)

            let rbTotal = kctRankings.filter(player => player.position === "RB")
            .map(player => player.rating)
            .reduce((a, b) => Number(a) + Number(b), 0)

            let wrTotal = kctRankings.filter(player => player.position === "WR")
            .map(player => player.rating)
            .reduce((a, b) => Number(a) + Number(b), 0)

            let teTotal = kctRankings.filter(player => player.position === "TE")
            .map(player => player.rating)
            .reduce((a, b) => Number(a) + Number(b), 0)
        
            let teamTotal = qbTotal + rbTotal + wrTotal + teTotal

            return {...roster, 
                owner_id:foundUser,
                players:foundPlayers,
                starters:foundStarters,
                reserve:foundReserve,
                taxi:foundTaxi,
                kct:kctRankings,
                teamTotal:teamTotal,
                qbTotal:qbTotal,
                rbTotal:rbTotal,
                wrTotal:wrTotal,
                teTotal:teTotal
            } 
        })
        const promise = await Promise.all(mappedRosters)

        res.status(200).json(promise)
        // console.log("promise:", promise)
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
})

module.exports = playerController