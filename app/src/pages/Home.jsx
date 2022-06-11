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
                <div className="col-md-11 p-3" style={{background:"#1c1c1c"}}>
                    <div className="d-flex p-4" style={{background:"black",  borderRadius:"25px"}}>
                        <div className="col-md-10">
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
                                <div className=" p-2">
                                    <div className="pt-1 pb-4" style={{borderRadius:"15px", background:"#2a2c3e"}}>
                                        <div className="d-flex justify-content-between align-items-center m-2">
                                            <p className="m-0" style={{fontSize:"1rem"}}>Recent Activity</p>
                                            <div className="">
                                                <Icon icon="fluent:more-circle-32-regular" style={{fontSize:"2rem"}}/>
                                            </div>
                                        </div>
                                        <div id="scrollBarActivity" style={{height:"30rem", maxWidth:"100%", overflow:"auto"}}>
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
                            <div className="p-2">
                                <div className="d-flex mb-3">
                                    <div className="" style={{border:"0px solid white", borderRadius:"10px", background:"linear-gradient(90deg, rgba(116,178,221,1) 0%, rgba(114,202,224,1) 20%, rgba(51,193,189,1) 50%, rgba(80,204,147,1) 100%)", color:"#2a2c3e"}}>
                                        <p className="m-2 d-flex align-items-center bold" style={{fontSize:"13px"}}>
                                            <Icon icon="akar-icons:crown" style={{marginRight:"5px", fontSize:"1rem"}}/>
                                            DYNASTY
                                        </p>
                                    </div>
                                    <div className="mx-3" style={{border:"1px solid grey", borderRadius:"10px", background:"#1c1c1c"}}>
                                        <p className="m-2 d-flex align-items-center bold" style={{fontSize:"13px"}}>
                                            <Icon icon="ic:outline-offline-bolt" style={{marginRight:"5px", fontSize:"1.3rem"}}/>
                                            POWER
                                        </p>
                                    </div>
                                </div>
                                <DynastyRankings
                                    loadRosters={loadRosters}
                                    rosters={rosters}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}