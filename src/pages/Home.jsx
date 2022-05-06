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
        let rank = 0
        foundTeam.rank === 1?
        rank = foundTeam.rank + "st"
        :
        foundTeam.rank === 2?
        rank = foundTeam.rank + "nd"
        :
        foundTeam.rank === 3?
        rank = foundTeam.rank + "rd"
        :
        rank = foundTeam.rank + "th"
        return rank
    }

    function rbRankings (roster) {
        let foundTeam = rosters.rbRank.find(team => team.kct.owner.display_name === roster.kct.owner.display_name)
        let rank = 0
        foundTeam.rank === 1?
        rank = foundTeam.rank + "st"
        :
        foundTeam.rank === 2?
        rank = foundTeam.rank + "nd"
        :
        foundTeam.rank === 3?
        rank = foundTeam.rank + "rd"
        :
        rank = foundTeam.rank + "th"
        return rank
    }

    function wrRankings (roster) {
        let foundTeam = rosters.wrRank.find(team => team.kct.owner.display_name === roster.kct.owner.display_name)
        let rank = 0
        foundTeam.rank === 1?
        rank = foundTeam.rank + "st"
        :
        foundTeam.rank === 2?
        rank = foundTeam.rank + "nd"
        :
        foundTeam.rank === 3?
        rank = foundTeam.rank + "rd"
        :
        rank = foundTeam.rank + "th"
        return rank
    }

    function teRankings (roster) {
        let foundTeam = rosters.teRank.find(team => team.kct.owner.display_name === roster.kct.owner.display_name)
        let rank = 0
        foundTeam.rank === 1?
        rank = foundTeam.rank + "st"
        :
        foundTeam.rank === 2?
        rank = foundTeam.rank + "nd"
        :
        foundTeam.rank === 3?
        rank = foundTeam.rank + "rd"
        :
        rank = foundTeam.rank + "th"
        return rank
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
                                <p>{roster.rank}
                                {
                                    roster.rank === 1? "st" : 
                                    roster.rank === 2? "nd" : 
                                    roster.rank === 3? "rd" : "th"
                                }: {roster.kct.owner.team_name}
                                </p>
                                :
                                <p>{roster.rank}
                                {
                                    roster.rank === 1?  "st" : 
                                    roster.rank === 2? "nd" : 
                                    roster.rank === 3? "rd" : "th"
                                }: {roster.kct.owner.display_name}</p>
                            }
                            <p>Team total: {roster.kct.teamTotal}</p>
                            <img alt="avatar" src={
                                `https://sleepercdn.com/avatars/thumbs/${
                                    roster.kct.owner.avatar
                                }`
                            }/>
                            <p>QB rank: {qbRankings(roster)} - {roster.kct.qb.total}</p>
                            {
                                roster.kct.qb.players.map((player, i) =>
                                <div key={i}>
                                    <img alt="thumb" src={`https://sleepercdn.com/content/nfl/players/thumb/${player.player_id}.jpg`}/>
                                    <p>{player.position} {player.player}</p>
                                    <p>{player.team}</p>
                                    <p>age: {player.age}</p>
                                    <p>value: {player.rating}</p>
                                </div>
                                )
                            }
                            <p>RB rank: {rbRankings(roster)} - {roster.kct.rb.total}</p>
                            {
                                roster.kct.rb.players.map((player, i) =>
                                <div key={i}>
                                    <img alt="thumb" src={`https://sleepercdn.com/content/nfl/players/thumb/${player.player_id}.jpg`}/>
                                    <p>{player.position} {player.player}</p>
                                    <p>{player.team}</p>
                                    <p>age: {player.age}</p>
                                    <p>value: {player.rating}</p>
                                </div>
                                )
                            }
                            <p>WR rank: {wrRankings(roster)} - {roster.kct.wr.total}</p>
                            {
                                roster.kct.wr.players.map((player, i) =>
                                <div key={i}>
                                    <img alt="thumb" src={`https://sleepercdn.com/content/nfl/players/thumb/${player.player_id}.jpg`}/>
                                    <p>{player.position} {player.player}</p>
                                    <p>{player.team}</p>
                                    <p>age: {player.age}</p>
                                    <p>value: {player.rating}</p>
                                </div>
                                )
                            }
                             <p>TE rank: {teRankings(roster)} - {roster.kct.te.total}</p>
                            {
                                roster.kct.te.players.map((player, i) =>
                                <div key={i}>
                                    <img alt="thumb" src={`https://sleepercdn.com/content/nfl/players/thumb/${player.player_id}.jpg`}/>
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