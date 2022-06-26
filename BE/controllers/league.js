const fetch = (url) => import('node-fetch').then(({default: fetch}) => fetch(url));
const leagueController = require("express").Router({ mergeParams: true });
const League = require("../models/League")
const Owner = require("../models/Owner")
const Player = require("../models/Player")
const KCT = require("../models/KCT")

leagueController.get("/", async (req, res) => {
    try{
        const ownerFiltered = {
            user_id:1, 
            metadata:{
                team_name:1,
                avatar:1
            },
            league_id:1,
            display_name:1,
            avatar:1,
            roster_id:1
        }
        let foundOwners = await Owner.find({}, ownerFiltered)
        const past_leagues = await League.find({})

        // 2022
        const get2022League = await fetch(`https://api.sleeper.app/v1/league/${process.env.yr2022}`)
        const parsed2022League = await get2022League.json()

        const getDraft = await fetch(`https://api.sleeper.app/v1/draft/${parsed2022League.draft_id}`)
        const parsedDraft = await getDraft.json()        
       
        const league = {
            ...parsed2022League,
            owners:foundOwners,
            draft:parsedDraft,
            history:past_leagues[0].seasons
        }
        res.status(200).json(league)
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
})

leagueController.get("/transactions/:round", async (req, res) => {
    try {
        let round = req.params.round
        const getUsers = await fetch("https://api.sleeper.app/v1/league/786065005090189312/users")
        const parsedUsers = await getUsers.json()
    
        const getTransactions = await fetch(`https://api.sleeper.app/v1/league/786065005090189312/transactions/${round}`)
        const parsedTransactions = await getTransactions.json()

        const ownerFiltered = {
            user_id:1, 
            metadata:{
                team_name:1,
                avatar:1
            },
            league_id:1,
            display_name:1,
            avatar:1,
            roster_id:1
        }

        const playerFiltered = {
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

        let mappedTransactions = parsedTransactions.map(async transaction => {
            let foundOwners = await Owner.find({"roster_id": transaction.roster_ids}, ownerFiltered)
            let foundUser = parsedUsers.find(user => user.user_id === transaction.creator)
           
            let keys = Object.keys((transaction.adds || {}))
            let dropKeys = Object.keys((transaction.drops || {}))
            let addedKCT = await KCT.find({"player_id":keys})
            let addedPlayers = await Player.find({"player_id": keys}, playerFiltered)

            let droppedKCT = await KCT.find({"player_id":dropKeys})
            let droppedPlayers = await Player.find({"player_id":dropKeys}, playerFiltered)
            
            return {
                ...transaction,
                roster_ids: foundOwners,
                creator: foundUser.display_name,
                playerDB: {
                    adds:{
                        playersKCT: addedKCT,
                        players: addedPlayers
                    },
                    drops:{
                        playersKCT: droppedKCT,
                        players: droppedPlayers
                    }
                }
            }    
        })
        const promise = await Promise.all(mappedTransactions)
        res.status(200).json(promise)

    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
})

module.exports = leagueController