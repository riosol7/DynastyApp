import React, { useEffect, useState } from "react"

export default function Home () {
    const [isLoading, setIsLoading] = useState(true)
    const [rosters, setRosters] = useState([])

    useEffect(() => {
        getRosters();
        // return () => {setRosters([])};
        // eslint-disable-next-line 
      }, [])
    
    const getRosters = async () => {
      try{
        const call = await fetch("http://localhost:5000/player/rosters")
        const parsedRosters = await call.json()
        setRosters(parsedRosters)
        console.log(parsedRosters)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    }

    function qbRankings (roster) {
        let foundTeam = rosters.qbRank.find(team => team.kct.owner.display_name === roster.kct.owner.display_name)
        return foundTeam.rank
    }

  return (
    <div className="">
        {
            isLoading ? <p>Loading </p> :
            <div>
                {
                    rosters.teamRank.map((roster, idx) => 
                        <div key={idx}>
                            {
                                roster.kct.owner.team_name ?
                                <p>{idx + 1}{idx === 0?  "st" : idx === 1? "nd" : idx === 2? "rd" : "th"}: {roster.kct.owner.team_name}</p>
                                :
                                <p>{idx + 1}{idx === 0?  "st" : idx === 1? "nd" : idx === 2? "rd" : "th"}: {roster.kct.owner.display_name}</p>
                            }
                            <p>Team total: {roster.teamTotal}</p>
                            <img alt="avatar" src={
                                `https://sleepercdn.com/avatars/thumbs/${
                                    roster.kct.owner.avatar
                                }`
                            }/>
                            <p>QB rank:{qbRankings(roster)} - {roster.kct.qb.total}</p>
                            {
                                roster.kct.qb.players.map((player, i) =>
                                <div key={i}>
                                    <p>{player.position} {player.player}</p>
                                    <p>{player.team}</p>
                                    <p>age: {player.age}</p>
                                    <p>value: {player.rating}</p>
                                </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        }
    </div>
  );
}