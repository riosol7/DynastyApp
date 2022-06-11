import React, { useEffect, useState } from "react";
import LeagueWidget from "../components/LeagueWidget";
import DynastyRankings from "../components/DynastyRankings";
import MVP from "../components/MVP";
import Transaction from "../components/Transaction";
import Standings from "../components/Standings";
// import AreaChart from "../components/AreaChart";
import Tabs from "../components/Tabs";
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
                <div className="col-md-1">
                    <Tabs
                        league={league}
                        loadLeague={loadLeague}
                    />
                </div>
                <div className="col-md-11 py-4" style={{background:"#1c1c1c", paddingRight:"1.5rem"}}>
                    <div className="d-flex p-4 px-3" style={{background:"black",  borderRadius:"25px"}}>
                        <div className="col-md-10 px-4">
                            <div className="">
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
                            <div className="d-flex my-4">
                                <div className="col-md-5 p-2">
                                    <Standings
                                        loadLeague={loadLeague}
                                        league={league}
                                        loadRosters={loadRosters}
                                        rosters={rosters}
                                    />
                                </div>
                                {/* <div className="col">
                                    <AreaChart
                                        loadRosters={loadRosters}
                                        rosters={rosters}
                                    />
                                </div> */}
                                <div className="p-2">
                                    <div className="pt-1 pb-4" style={{borderRadius:"15px", background:"#2a2c3e"}}>
                                        <div className="d-flex justify-content-between align-items-center m-2">
                                            <p className="m-0" style={{fontSize:"1rem"}}>Recent Activity</p>
                                            <div className="">
                                                <Icon icon="fluent:more-circle-32-regular" style={{fontSize:"2rem"}}/>
                                            </div>
                                        </div>
                                        <div id="scrollBarActivity" style={{height:"30.5rem", maxWidth:"100%", overflow:"auto"}}>
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
                        <div className="col-md-2">
                            <div className="px-2">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div className={"btnAction p-1"}>
                                        <p className="m-2 d-flex align-items-center bold" style={{fontSize:"13px"}}>
                                            <Icon icon="akar-icons:crown" style={{marginRight:"5px", fontSize:"1rem"}}/>
                                            DYNASTY
                                        </p>
                                    </div>
                                    <div className={"btnOff p-1"}>
                                        <p className="m-2 d-flex align-items-center bold" style={{fontSize:"13px"}}>
                                            <Icon icon="ic:outline-offline-bolt" style={{marginRight:"5px", fontSize:"1.3rem"}}/>
                                            POWER
                                        </p>
                                    </div>
                                    <Icon icon="akar-icons:more-vertical" style={{color:"#b0b0b2", fontSize:"1.5rem"}}/>
                                </div>
                                <div>
                                    <DynastyRankings
                                        loadRosters={loadRosters}
                                        rosters={rosters}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}