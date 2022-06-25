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
        let foundOwners = await Owner.find({}, ownerFiltered)

        // 2022
        const get2022League = await fetch(`https://api.sleeper.app/v1/league/786065005090189312`)
        const parsed2022League = await get2022League.json()

        const getDraft = await fetch(`https://api.sleeper.app/v1/draft/${parsed2022League.draft_id}`)
        const parsedDraft = await getDraft.json()        

        // 2021
        const get2021League = await fetch(`https://api.sleeper.app/v1/league/${parsed2022League.previous_league_id}`)
        const parsed2021League = await get2021League.json()

        const get2021WinnerBracket = await fetch(`https://api.sleeper.app/v1/league/${parsed2022League.previous_league_id}/winners_bracket`)
        const winnerBracket2021 = await get2021WinnerBracket.json()

        const get2021LoserBracket = await fetch(`https://api.sleeper.app/v1/league/${parsed2022League.previous_league_id}/losers_bracket`)
        const loserBracket2021 = await get2021LoserBracket.json()

        // Get all 2021 matches
        const get2021WeekOne = await fetch(`https://api.sleeper.app/v1/league/${parsed2022League.previous_league_id}/matchups/1`)
        const parsed2021WeekOne = await get2021WeekOne.json()
        const foundPlayersWkOne = Player.find({"player_id":parsed2021WeekOne.players}, playerFiltered)

        const get2021WeekTwo = await fetch(`https://api.sleeper.app/v1/league/${parsed2022League.previous_league_id}/matchups/2`)
        const parsed2021WeekTwo = await get2021WeekTwo.json()
        const foundPlayersWkTwo = Player.find({"player_id":parsed2021WeekTwo.players}, playerFiltered)

        const get2021WeekThree = await fetch(`https://api.sleeper.app/v1/league/${parsed2022League.previous_league_id}/matchups/3`)
        const parsed2021WeekThree = await get2021WeekThree.json()
        const foundPlayersWkThree = Player.find({"player_id":parsed2021WeekThree.players}, playerFiltered)

        const get2021WeekFour = await fetch(`https://api.sleeper.app/v1/league/${parsed2022League.previous_league_id}/matchups/4`)
        const parsed2021WeekFour = await get2021WeekFour.json()
        const foundPlayersWkFour = Player.find({"player_id":parsed2021WeekFour.players}, playerFiltered)

        const get2021WeekFive = await fetch(`https://api.sleeper.app/v1/league/${parsed2022League.previous_league_id}/matchups/5`)
        const parsed2021WeekFive = await get2021WeekFive.json()
        const foundPlayersWkFive = Player.find({"player_id":parsed2021WeekFive.players}, playerFiltered)

        const get2021WeekSix = await fetch(`https://api.sleeper.app/v1/league/${parsed2022League.previous_league_id}/matchups/6`)
        const parsed2021WeekSix = await get2021WeekSix.json()
        const foundPlayersWkSix = Player.find({"player_id":parsed2021WeekSix.players}, playerFiltered)

        const get2021WeekSeven = await fetch(`https://api.sleeper.app/v1/league/${parsed2022League.previous_league_id}/matchups/7`)
        const parsed2021WeekSeven = await get2021WeekSeven.json()
        const foundPlayersWkSeven = Player.find({"player_id":parsed2021WeekSeven.players}, playerFiltered)

        const get2021WeekEight = await fetch(`https://api.sleeper.app/v1/league/${parsed2022League.previous_league_id}/matchups/8`)
        const parsed2021WeekEight = await get2021WeekEight.json()
        const foundPlayersWkEight = Player.find({"player_id":parsed2021WeekEight.players}, playerFiltered)

        const get2021WeekNine = await fetch(`https://api.sleeper.app/v1/league/${parsed2022League.previous_league_id}/matchups/9`)
        const parsed2021WeekNine = await get2021WeekNine.json()
        const foundPlayersWkNine = Player.find({"player_id":parsed2021WeekNine.players}, playerFiltered)

        const get2021WeekTen = await fetch(`https://api.sleeper.app/v1/league/${parsed2022League.previous_league_id}/matchups/10`)
        const parsed2021WeekTen = await get2021WeekTen.json()
        const foundPlayersWkTen = Player.find({"player_id":parsed2021WeekTen.players}, playerFiltered)

        const get2021WeekEleven = await fetch(`https://api.sleeper.app/v1/league/${parsed2022League.previous_league_id}/matchups/11`)
        const parsed2021WeekEleven = await get2021WeekEleven.json()
        const foundPlayersWkEleven = Player.find({"player_id":parsed2021WeekEleven.players}, playerFiltered)

        const get2021WeekTwelve = await fetch(`https://api.sleeper.app/v1/league/${parsed2022League.previous_league_id}/matchups/12`)
        const parsed2021WeekTwelve = await get2021WeekTwelve.json()
        const foundPlayersWkTwelve = Player.find({"player_id":parsed2021WeekTwelve.players}, playerFiltered)

        const get2021WeekThirteen = await fetch(`https://api.sleeper.app/v1/league/${parsed2022League.previous_league_id}/matchups/13`)
        const parsed2021WeekThirteen = await get2021WeekThirteen.json()
        const foundPlayersWkThirteen = Player.find({"player_id":parsed2021WeekThirteen.players}, playerFiltered)

        const get2021WeekFourteen = await fetch(`https://api.sleeper.app/v1/league/${parsed2022League.previous_league_id}/matchups/14`)
        const parsed2021WeekFourteen = await get2021WeekFourteen.json()
        const foundPlayersWkFourteen = Player.find({"player_id":parsed2021WeekFourteen.players}, playerFiltered)

        // past week 14 pts dnt account for total MAX pts
        const get2021WeekFifeteen = await fetch(`https://api.sleeper.app/v1/league/${parsed2022League.previous_league_id}/matchups/15`)
        const parsed2021WeekFifeteen = await get2021WeekFifeteen.json()
        const get2021WeekSixteen = await fetch(`https://api.sleeper.app/v1/league/${parsed2022League.previous_league_id}/matchups/16`)
        const parsed2021WeekSixteen = await get2021WeekSixteen.json()
        const get2021WeekSeventeen = await fetch(`https://api.sleeper.app/v1/league/${parsed2022League.previous_league_id}/matchups/17`)
        const parsed2021WeekSeventeen = await get2021WeekSeventeen.json()


        // 2020
        const get2020League = await fetch(`https://api.sleeper.app/v1/league/${parsed2021League.previous_league_id}`)
        const parsed2020League = await get2020League.json()

        const get2020WinnerBracket = await fetch(`https://api.sleeper.app/v1/league/${parsed2021League.previous_league_id}/winners_bracket`)
        const winnerBracket2020 = await get2020WinnerBracket.json()

        const get2020LoserBracket = await fetch(`https://api.sleeper.app/v1/league/${parsed2021League.previous_league_id}/losers_bracket`)
        const loserBracket2020 = await get2020LoserBracket.json()
        
        // Get all 2020 matches
        const get2020WeekOne = await fetch(`https://api.sleeper.app/v1/league/${parsed2021League.previous_league_id}/matchups/1`)
        const parsed2020WeekOne = await get2020WeekOne.json()
        const get2020WeekTwo = await fetch(`https://api.sleeper.app/v1/league/${parsed2021League.previous_league_id}/matchups/2`)
        const parsed2020WeekTwo = await get2020WeekTwo.json()
        const get2020WeekThree = await fetch(`https://api.sleeper.app/v1/league/${parsed2021League.previous_league_id}/matchups/3`)
        const parsed2020WeekThree = await get2020WeekThree.json()
        const get2020WeekFour = await fetch(`https://api.sleeper.app/v1/league/${parsed2021League.previous_league_id}/matchups/4`)
        const parsed2020WeekFour = await get2020WeekFour.json()
        const get2020WeekFive = await fetch(`https://api.sleeper.app/v1/league/${parsed2021League.previous_league_id}/matchups/5`)
        const parsed2020WeekFive = await get2020WeekFive.json()
        const get2020WeekSix = await fetch(`https://api.sleeper.app/v1/league/${parsed2021League.previous_league_id}/matchups/6`)
        const parsed2020WeekSix = await get2020WeekSix.json()
        const get2020WeekSeven = await fetch(`https://api.sleeper.app/v1/league/${parsed2021League.previous_league_id}/matchups/7`)
        const parsed2020WeekSeven = await get2020WeekSeven.json()
        const get2020WeekEight = await fetch(`https://api.sleeper.app/v1/league/${parsed2021League.previous_league_id}/matchups/8`)
        const parsed2020WeekEight = await get2020WeekEight.json()
        const get2020WeekNine = await fetch(`https://api.sleeper.app/v1/league/${parsed2021League.previous_league_id}/matchups/9`)
        const parsed2020WeekNine = await get2020WeekNine.json()
        const get2020WeekTen = await fetch(`https://api.sleeper.app/v1/league/${parsed2021League.previous_league_id}/matchups/10`)
        const parsed2020WeekTen = await get2020WeekTen.json()
        const get2020WeekEleven = await fetch(`https://api.sleeper.app/v1/league/${parsed2021League.previous_league_id}/matchups/11`)
        const parsed2020WeekEleven = await get2020WeekEleven.json()
        const get2020WeekTwelve = await fetch(`https://api.sleeper.app/v1/league/${parsed2021League.previous_league_id}/matchups/12`)
        const parsed2020WeekTwelve = await get2020WeekTwelve.json()
        const get2020WeekThirteen = await fetch(`https://api.sleeper.app/v1/league/${parsed2021League.previous_league_id}/matchups/13`)
        const parsed2020WeekThirteen = await get2020WeekThirteen.json()
        const get2020WeekFourteen = await fetch(`https://api.sleeper.app/v1/league/${parsed2021League.previous_league_id}/matchups/14`)
        const parsed2020WeekFourteen = await get2020WeekFourteen.json()
        // past week 14 pts dnt account for total MAX pts
        const get2020WeekFifeteen = await fetch(`https://api.sleeper.app/v1/league/${parsed2021League.previous_league_id}/matchups/15`)
        const parsed2020WeekFifeteen = await get2020WeekFifeteen.json()
        const get2020WeekSixteen = await fetch(`https://api.sleeper.app/v1/league/${parsed2021League.previous_league_id}/matchups/16`)
        const parsed2020WeekSixteen = await get2020WeekSixteen.json()
        const get2020WeekSeventeen = await fetch(`https://api.sleeper.app/v1/league/${parsed2021League.previous_league_id}/matchups/17`)
        const parsed2020WeekSeventeen = await get2020WeekSeventeen.json()

        const league2020 = {
            ...parsed2020League,
            matches:{
                week1:parsed2020WeekOne,
                week2:parsed2020WeekTwo,
                week3:parsed2020WeekThree,
                week4:parsed2020WeekFour,
                week5:parsed2020WeekFive,
                week6:parsed2020WeekSix,
                week7:parsed2020WeekSeven,
                week8:parsed2020WeekEight,
                week9:parsed2020WeekNine,
                week10:parsed2020WeekTen,
                week11:parsed2020WeekEleven,
                week12:parsed2020WeekTwelve,
                week13:parsed2020WeekThirteen,
                week14:parsed2020WeekFourteen,
            },
            playoffs:{
                week15:parsed2020WeekFifeteen,
                week16:parsed2020WeekSixteen,
                week17:parsed2020WeekSeventeen,
                winner_bracket:winnerBracket2020,
                loser_bracket:loserBracket2020
            }
        }
        // 2021
        const league2021 = {
            ...parsed2021League,
            winnerBracket:winnerBracket2021,
            loserBracket:loserBracket2021,
            previous_League:league2020
        }

        const league = {
            ...parsed2022League,
            previous_league: league2021,
            owners:foundOwners,
            draft:parsedDraft
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