import React, { useEffect, useState } from "react";
import LeagueWidget from "../components/LeagueWidget";
import DynastyRankings from "../components/DynastyRankings";
import MVP from "../components/MVP";
import Transaction from "../components/Transaction";
import Standings from "../components/Standings";
import AreaChart from "../components/AreaChart";
import Tabs from "../components/Tabs";
// import DynastyRanker from "../components/DynastyRanker"
import { Icon } from '@iconify/react';

export default function Home () {
    const [league, setLeague] = useState({})
    const [loadLeague, setLoadLeague] = useState(true)

    const [rosters, setRosters] = useState([])
    const [loadRosters, setLoadRosters] = useState(true)
    
    const [transactions, setTransactions] = useState([])
    const [loadTransactions, setLoadTransactions] = useState(true)

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
        setLoadRosters(false)
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
            setLoadLeague(false)
        } catch(err) {
            console.log(err)
        }
    }

    const getTransactions = async () => {
        try{
            const call = await fetch(`http://localhost:5000/league/transactions/${round}`)
            const parsedTransactions = await call.json()
            setTransactions(parsedTransactions)
            setLoadTransactions(false)
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
                    <Tabs
                        league={league}
                        loadLeague={loadLeague}
                    />
                </div>
                {/* Dashboard */}
                <div className="p-2">
                    <div>
                        <LeagueWidget
                            league={league}
                            loadLeague={loadLeague}
                        />
                    </div>
                    <div className="">
                        <MVP
                            loadRosters={loadRosters}
                            rosters={rosters}
                        />
                    </div>
                    <div className="d-flex">
                        <div className="col p-2">
                            <Standings
                                loadLeague={loadLeague}
                                league={league}
                                loadRosters={loadRosters}
                                rosters={rosters}
                            />
                        </div>
                        <div className="col">
                            <AreaChart
                                loadRosters={loadRosters}
                                rosters={rosters}
                            />
                        </div>
                        <div className="p-2">
                            <div className="pb-2" style={{border:"5px solid black", borderRadius:"15px", background:"#2a2c3e"}}>
                                <div className="d-flex justify-content-between align-items-center m-2">
                                    <p className="m-0" style={{fontSize:"1rem"}}>Recent Activity</p>
                                    <div className="">
                                        <Icon icon="fluent:more-circle-32-regular" style={{fontSize:"2rem"}}/>
                                    </div>
                                </div>
                                <div id="scrollBarActivity" style={{height:"30rem", width:"100%", overflow:"auto"}}>
                                {/* <div className=""> */}
                                    <Transaction
                                        loadTransactions={loadTransactions}
                                        transactions={transactions}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-2">
                    <div className="p-2" style={{border:"5px solid black", borderRadius:"15px"}}>
                        <DynastyRankings
                            loadRosters={loadRosters}
                            rosters={rosters}
                        />
                    </div>
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