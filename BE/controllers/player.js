const fetch = (url) => import('node-fetch').then(({default: fetch}) => fetch(url));
const Owner = require("../models/Owner")
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
        //piraiojeda@gmail.com
        // const getKCT = await fetch("https://sheetdb.io/api/v1/gultqvcl60sw9")
        //CSUN
        // const getKCT = await fetch("https://sheetdb.io/api/v1/vgfjvvvo0ao4p")
        // notriosol
        // const getKCT = await fetch("https://sheetdb.io/api/v1/gzyqw2qiluj5k")
        const getKCT = await fetch("https://api.sheety.co/fa27cea4aebee399c58753e7b1c0fcf7/kctRankings/sheet1")
        const parsedKCT = await getKCT.json()

        let mergeKCT = parsedKCT.sheet1.map(async kct => {
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
                    // player:kct.Player,
                    // team:kct.Team,
                    // position:kct.Position,
                    // age:kct.Age,
                    // rating:kct.Rating,
                    player_id: sleeperID
                }
            }
        })
        const updatedKCT = await Promise.all(mergeKCT)
        const cleanDB = await KCT.deleteMany({})
        const insertKCT = await KCT.insertMany(updatedKCT)
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
            const foundStarters = await Player.find({"player_id": roster.starters}, filtered)
            const foundReserve = await Player.find({"player_id": roster.reserve}, filtered)
            const foundTaxi = await Player.find({"player_id": roster.taxi}, filtered)

            //make an update where parsedUsers is no longer needed...
            //have all the previous owners in the DB and find by roster ID
            let foundUser = parsedUsers.find(user => user.user_id === roster.owner_id)

            let qbFiltered = kctRankings.filter(player => player.position === "QB")
            let qbTotal = qbFiltered.map(player => player.rating)
            .reduce((a, b) => Number(a) + Number(b), 0)

            let rbFiltered = kctRankings.filter(player => player.position === "RB")
            let rbTotal = rbFiltered.map(player => player.rating)
            .reduce((a, b) => Number(a) + Number(b), 0)

            let wrFiltered = kctRankings.filter(player => player.position === "WR")
            let wrTotal = wrFiltered.map(player => player.rating)
            .reduce((a, b) => Number(a) + Number(b), 0)

            let teFiltered = kctRankings.filter(player => player.position === "TE")
            let teTotal = teFiltered.map(player => player.rating)
            .reduce((a, b) => Number(a) + Number(b), 0)
        
            let teamTotal = qbTotal + rbTotal + wrTotal + teTotal

            //Collect the previous yrs value of per team
            const updateOwner = await Owner.findOneAndUpdate(
                {
                    "user_id":foundUser.user_id,
                    "dynasty.date":{$ne: new Date(Date.now()).toLocaleDateString().split('T')[0]}
                },
                {
                    $addToSet:{
                       "dynasty":{
                            "date": new Date(Date.now()).toLocaleDateString().split('T')[0],
                            "value": teamTotal
                        }
                    } 
                },{new:true})

            const foundOwner = await Owner.findOne({"user_id":foundUser.user_id})

            return {...roster, 
                owner_id:updateOwner || foundOwner,
                players:foundPlayers,
                starters:foundStarters,
                reserve:foundReserve,
                taxi:foundTaxi,
                kct:{
                    owner:{
                        avatar:foundUser ? foundUser.avatar : "8fcf0e0e6a75e96a591d2a4a4a400f41",
                        display_name:foundUser ? foundUser.display_name : undefined,
                        team_name:foundUser ? foundUser.metadata.team_name : undefined
                    },
                    teamTotal:teamTotal,
                    qb:{
                        total:qbTotal,
                        players:qbFiltered,
                    },
                    rb:{
                        total:rbTotal,
                        players:rbFiltered
                    },
                    wr:{
                        total:wrTotal,
                        players:wrFiltered,
                    },
                    te:{
                        total:teTotal,
                        players:teFiltered
                    }
                },
            } 
        })
        const promise = await Promise.all(mappedRosters)
        let totalRoster = promise.sort((a, b) => parseFloat(b.kct.teamTotal) - parseFloat(a.kct.teamTotal)).map(roster => roster);
        let teamRank = promise.sort((a, b) => parseFloat(b.kct.teamTotal) - parseFloat(a.kct.teamTotal)).map((roster, idx) => {return {rank: idx + 1, kct:roster.kct}});
        let qbRank = promise.sort((a, b) => parseFloat(b.kct.qb.total) - parseFloat(a.kct.qb.total)).map((roster, idx) => {return {rank: idx + 1, kct:roster.kct}});
        let rbRank = promise.sort((a, b) => parseFloat(b.kct.rb.total) - parseFloat(a.kct.rb.total)).map((roster, idx) => {return {rank: idx + 1, kct:roster.kct}});
        let wrRank = promise.sort((a, b) => parseFloat(b.kct.wr.total) - parseFloat(a.kct.wr.total)).map((roster, idx) => {return {rank: idx + 1, kct:roster.kct}});
        let teRank = promise.sort((a, b) => parseFloat(b.kct.te.total) - parseFloat(a.kct.te.total)).map((roster, idx) => {return {rank: idx + 1, kct:roster.kct}});
        let rankings = {
            totalRoster: totalRoster,
            teamRank: teamRank,
            qbRank: qbRank,
            rbRank: rbRank,
            wrRank: wrRank,
            teRank: teRank
        }
        res.status(200).json(rankings)
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
})

module.exports = playerController