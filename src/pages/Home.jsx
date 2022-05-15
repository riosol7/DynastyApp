import React, { useEffect, useState } from "react";
import DynastyRankings from "../components/DynastyRankings";
import TopPlayers from "../components/TopPlayers";
// import DynastyRanker from "../components/DynastyRanker"

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
        <>
            <div className="d-flex">
                {/* Menu */}
                <div className="p-2">
                    <p>Hello</p>
                </div>
                {/* Dashboard */}
                <div className="p-2">
                    <DynastyRankings
                        isLoading={isLoading}
                        rosters={rosters}
                    />
                </div>
                <div className="p-2">
                    <TopPlayers
                        isLoading={isLoading}
                        rosters={rosters}
                    />
                </div>
                {/* <div className="col-md-10">
                    <DynastyRanker 
                        isLoading={isLoading}
                        rosters={rosters}
                    />
                </div> */}
            </div>
        </>
    );
}