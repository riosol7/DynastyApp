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
        console.log("parsedRosters",parsedRosters)

        const getUsers = await fetch("https://api.sleeper.app/v1/league/786065005090189312/users")
        const parsedUsers = await getUsers.json()

        const getKCT = await fetch("https://sheetdb.io/api/v1/gultqvcl60sw9")
        const parsedKCT = await getKCT.json()

        let mergeKCT = parsedKCT.map(async kct => {
            const foundPlayers = await Player.find({"full_name":kct.player, "position": kct.position})
            // console.log("foundPlayer",foundPlayers)
            let sleeperID = 0 
            for(let i=0; i < foundPlayers.length; i++){
                // console.log("foundPlayer",foundPlayers[i].player_id)
                sleeperID = foundPlayers[i].player_id
            
                return {
                    ...kct,
                    player_id: sleeperID
                }
            }
            // return {
            //     ...kct,
            //     player_id: foundPlayers
            // }
        })
        const updatedPlayers = await Promise.all(mergeKCT)
        // console.log("updatedPlayers:",updatedPlayers)

        // let mapRosters = parsedRosters.map((roster) => {
        //     let test = []
        //     for (let i = 0; i < roster.length; i ++){
        //         for(let j = 0; j < roster[i].players.length; j ++){
        //             console.log("foundPlayers:", roster[i].players[j])
        //             const foundPlayers = updatedPlayers.find(player => player.player_id === roster[i].players[j])
        //             // console.log("foundPlayers:", foundPlayers)
        //             //     const foundStarters = await Player.find({"player_id": roster.starters})
        //             //     const foundReserve = await Player.find({"player_id": roster.reserve})
        //             //     const foundTaxi = await Player.find({"player_id": roster.taxi})
        //             test = foundPlayers
        //             return test
        //         }
        //     return test
        //     }
        // })





        // let testRosters = parsedRosters.map(async (roster) => {
        //     const foundPlayers = await Player.find({"player_id": roster.players})
        //     // console.log("foundPlayers:", foundPlayers)
        //     return foundPlayers
            
        // })
        // const testPromise = await Promise.all(testRosters)
        // // console.log("testRosters:", testPromise[0])
        // let updateKCT = testPromise
        // // console.log("updateKCT",updateKCT)
        // if(updateKCT.length > 1){
        //     let ranking = updateKCT.forEach((roster, i) => {
        //         let kct = parsedKCT.find((KCTplayer, x) => KCTplayer.player === roster[i].full_name)
        //         // console.log("kct:", kct)
        //         let value = kct ? kct.rating : 0
        //         return kct
            
        //     })
        //     console.log("ranking:", ranking)
        // }
       

        // let mappedRosters = parsedRosters.map(async (roster) => {
        //     const foundPlayers = await Player.find({"player_id": roster.players})
        //     // console.log("foundPlayers:", foundPlayers)
        //     const foundStarters = await Player.find({"player_id": roster.starters})
        //     const foundReserve = await Player.find({"player_id": roster.reserve})
        //     const foundTaxi = await Player.find({"player_id": roster.taxi})

        //     let foundUser = parsedUsers.find(user => user.user_id === roster.owner_id)
           
        //     for(let i = 0; i < foundPlayers.length; i ++){
              
        //         let kctPlayer = parsedKCT.find((KCTplayer) => KCTplayer.player === foundPlayers[i].full_name)
        //             // console.log("kctPlayer",kctPlayer)
        //         let value = kctPlayer ? kctPlayer.rating : 0
    
        //         return {...roster, 
        //             owner_id:foundUser,
        //             players:foundPlayers,
        //             starters:foundStarters,
        //             reserve:foundReserve,
        //             taxi:foundTaxi
        //         } 

               
        //     }

        //     // let kctRankings = foundPlayers.map((player) => {
        //     //     let kctPlayer = parsedKCT.find((KCTplayer) => KCTplayer.player === player.full_name)
        //     //     let value = kctPlayer ? kctPlayer.rating : 0
        //     //     // console.log("kctPlayer:",kctPlayer)
        //     //     return { 
        //     //         ...player,
        //     //         kct: value
        //     //     }
        //     // })
        //     // console.log("kctRankings:", kctRankings)


        //     // return {...roster, 
        //     //     owner_id:foundUser,
        //     //     players:kctRankings,
        //     //     starters:foundStarters,
        //     //     reserve:foundReserve,
        //     //     taxi:foundTaxi
        //     // } 
        //     // console.log("foundKCTPlayer:", foundKCTPlayer)


        
        //     // let foundKCTPlayer = parsedKCT.find(player => player.Player === roster)

        //     // return {...roster, 
        //     //     owner_id:foundUser,
        //     //     players:foundPlayers,
        //     //     starters:foundStarters,
        //     //     reserve:foundReserve,
        //     //     taxi:foundTaxi
        //     // }
        // })
        // const promise = await Promise.all(mappedRosters)
        // console.log("mappedRosters:", promise)

        // if(promise){
        //     let updatedRosters = promise.map((roster) => 
        //         roster.players.map(player => {
                 
        //                 let foundKCTPlayer = parsedKCT.find((KCTplayer) => KCTplayer.Player === player.full_name)
        //                 // console.log("foundKCTPlayer:",foundKCTPlayer)
        //                 return {
        //                     ...player,
        //                     KCT:foundKCTPlayer
        //                 }
        
        //         })  
        //         // const updatedKCTv = await Promise.all(KCTv)
        //         // console.log("updatedKCTv:", updatedKCTv)
               
        //     )
        //     // const updatedPromise = await Promise.all(updatedRosters)
        //     // console.log("updatedRosters:", updatedRosters)
        //     res.status(200).json(updatedRosters)
        // } else {
            res.status(200).json(updatedPlayers)

        // }

    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
})

module.exports = playerController