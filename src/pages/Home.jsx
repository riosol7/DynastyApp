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

  return (
    <div className="">
        {
            isLoading ? <p>Loading </p> :
            <div>
                {
                    rosters.teamRank.map((roster, idx) => 
                        <div key={idx}>
                            {
                                roster.owner.team_name ?
                                <p>{roster.owner.team_name}</p>
                                :
                                <p>{roster.owner.display_name}</p>
                            }
                            <p>Team total: {roster.teamTotal}</p>
                            <img alt="avatar" src={
                                `https://sleepercdn.com/avatars/thumbs/${
                                    roster.owner.avatar
                                }`
                            }/>
                            <p>QB total: {roster.qb.total}</p>
                            {
                                roster.qb.players.map((player, i) =>
                                <div key={i}>
                                    <p>{player.player}</p>
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