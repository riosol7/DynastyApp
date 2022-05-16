const fetch = (url) => import('node-fetch').then(({default: fetch}) => fetch(url));
const leagueController = require("express").Router({ mergeParams: true });

leagueController.get("/", async (req, res) => {
    try{
        const getLeague = await fetch(`https://api.sleeper.app/v1/league/786065005090189312`)
        const parsedLeague = await getLeague.json()

        const getRosters = await fetch("https://api.sleeper.app/v1/league/786065005090189312/rosters")
        const parsedRosters = await getRosters.json()

        const getUsers = await fetch("https://api.sleeper.app/v1/league/786065005090189312/users")
        const parsedUsers = await getUsers.json()

        let division_1 = parsedRosters.filter(roster => roster.settings.division === 1).map((roster) => {
            let foundUser = parsedUsers.find(user => user.user_id === roster.owner_id)
            if(foundUser){
                return foundUser.display_name
            } else
            return ""
        })

        let division_2 = parsedRosters.filter(roster => roster.settings.division === 2).map((roster) => {
            let foundUser = parsedUsers.find(user => user.user_id === roster.owner_id)
            if(foundUser){
                return foundUser.display_name
            } else 
            return ""
        })

        const league = {
            ...parsedLeague,
            divisions: {
                division_1_owners:division_1,
                division_2_owners:division_2
            }
        }

        res.status(200).json(league)
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
})

module.exports = leagueController