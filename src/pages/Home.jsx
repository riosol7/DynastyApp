import React, { useEffect, useState } from "react";
import LeagueWidget from "../components/LeagueWidget";
import DynastyRankings from "../components/DynastyRankings";
import MVP from "../components/MVP";
import Transaction from "../components/Transaction";
// import DynastyRanker from "../components/DynastyRanker"

export default function Home () {
    const [isLoading, setIsLoading] = useState(true)
    const [league, setLeague] = useState({})
    const [rosters, setRosters] = useState([])
    let round = 1

    useEffect(() => {
        getRosters();
        getLeague();
        getTransactions();
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

    const getLeague = async () => {
        try {
            const call = await fetch(`http://localhost:5000/league`)
            const parsedLeague = await call.json()
            setLeague(parsedLeague)
            console.log(parsedLeague)
        } catch(err) {
            console.log(err)
        }
    }

    const getTransactions = async () => {
        try{
            const call = await fetch(`http://localhost:5000/league/transactions/${round}`)
            const parsedTransactions = await call.json()
            console.log(parsedTransactions)
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
                    <LeagueWidget
                        league={league}
                        isLoading={isLoading}
                        rosters={rosters}
                    />
                </div>
                <div className="p-2">
                    <DynastyRankings
                        isLoading={isLoading}
                        rosters={rosters}
                    />
                </div>
                <div className="p-2">
                    <MVP
                        isLoading={isLoading}
                        rosters={rosters}
                    />
                </div>
                <div className="p-2">
                    <Transaction
                        isLoading={isLoading}
                        // rosters={rosters}
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