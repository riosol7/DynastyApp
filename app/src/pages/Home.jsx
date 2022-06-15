import React, { useEffect, useState } from "react";
import LeagueWidget from "../components/LeagueWidget";
import DynastyRankings from "../components/DynastyRankings";
import MVP from "../components/MVP";
import Transaction from "../components/Transaction";
import Standings from "../components/Standings";
// import AreaChart from "../components/AreaChart";
import Tabs from "../components/Tabs";
import PowerRankings from "../components/PowerRankings";
import OverviewWidget from "../components/OverviewWidget";

import { Icon } from '@iconify/react';
import vs from "../assets/vs.png";

export default function Home () {
    const [league, setLeague] = useState({})
    const [loadLeague, setLoadLeague] = useState(true)

    const [rosters, setRosters] = useState([])
    const [loadRosters, setLoadRosters] = useState(true)
    
    const [transactions, setTransactions] = useState([])
    const [loadTransactions, setLoadTransactions] = useState(true)

    const [rankings, setRankings] = useState("Dynasty")

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
                <div className="" style={{width:"5rem"}}>
                    <Tabs/>
                </div>
                <div className="col py-2" style={{background:"#1c1c1c", paddingRight:".5rem"}}>
                    <div className="d-flex py-4" style={{background:"black",  borderRadius:"25px"}}>
                        <div className="col-md-10 px-4">
                            <div className="">
                                <LeagueWidget
                                    league={league}
                                    loadLeague={loadLeague}
                                />
                            </div>
                            <div className="mt-4">
                                <div className="d-flex view pb-2">
                                    <div className="col-sm-1">
                                        <div className="d-flex align-items-center justify-content-center">
                                            <Icon icon="fluent:content-view-gallery-24-regular" style={{fontSize:"1.5rem", color:"#a9dfd8"}}/>
                                            <p className="m-0 mx-1">Overview</p>
                                        </div>
                                        <div className="selectedView"></div>
                                    </div>
                                    <div className="col-sm-1">
                                        <div className="d-flex align-items-center justify-content-center">
                                            <img src={vs} alt="test" style={{}}/>
                                            <p className="m-0 mx-1"style={{color:"#686b71"}}>Matchups</p>
                                        </div>
                                        <div className=""></div>
                                    </div>
                                    <div className="col-sm-1">
                                        <div className="d-flex align-items-center justify-content-center">
                                            <Icon icon="carbon:blog" style={{fontSize:"1.5rem", color:"#686b71"}}/>
                                            <p className="m-0 mx-1"style={{color:"#686b71"}}>Blog</p>
                                        </div>
                                        <div className=""></div>
                                    </div>
                                    <div className="col-sm-9"></div>
                                </div>
                                <div className="d-flex">
                                    <div className="col">
                                        <div className="pt-2" style={{borderRight:"1px solid #686b71"}}>
                                            <div className="d-flex justify-content-between align-items-center mx-2">
                                                <p className="m-0" style={{fontSize:"1rem"}}>Recent Activity</p>
                                                <div className="">
                                                    <Icon icon="akar-icons:more-horizontal" style={{fontSize:"1.5rem", color:"#b0b0b2"}}/>
                                                </div>
                                            </div>
                                            <div id="scrollBar" style={{height:"780.7px", maxWidth:"100%", overflow:"auto"}}>
                                            {/* <div className=""> */}
                                                <Transaction
                                                    loadTransactions={loadTransactions}
                                                    transactions={transactions}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-10 px-3" id="scrollBar" style={{height:"814px", maxWidth:"100%", overflow:"auto"}}>  
                                        <div className="py-3">
                                            <OverviewWidget
                                                loadRosters={loadRosters}
                                                rosters={rosters}
                                                league={league}
                                            />
                                        </div>
                                        <div className="pt-2"> 
                                            <MVP
                                                loadRosters={loadRosters}
                                                rosters={rosters}
                                            />
                                            <div className="d-flex align-items-center  MVP">
                                                <Icon icon="fluent:star-line-horizontal-3-24-regular" style={{color:"#a9dfd8", fontSize:"1.1rem"}}/>
                                                <p className="m-0 mx-1 bold">MVPs</p>
                                            </div>
                                        </div>
                                        {/* <div className="col pt-2 pb-4">
                                            <AreaChart
                                                loadRosters={loadRosters}
                                                rosters={rosters}
                                            />
                                        </div> */}
                                        <div className="m-0 mt-2">
                                            <Standings
                                                loadLeague={loadLeague}
                                                league={league}
                                                loadRosters={loadRosters}
                                                rosters={rosters}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 px-1">
                            <div className="px-2">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div className={rankings ==="Dynasty"? "btnAction" : "btnOff"} onClick={() => setRankings("Dynasty")}>
                                        <p className="m-2 d-flex align-items-center bold" style={{fontSize:"13px"}}>
                                            <Icon icon="akar-icons:crown" style={{marginRight:"5px", fontSize:"1rem"}}/>
                                            DYNASTY
                                        </p>
                                    </div>
                                    <div className={rankings ==="Power"? "btnAction" : "btnOff"} onClick={() => setRankings("Power")}>
                                        <p className="m-2 d-flex align-items-center bold" style={{fontSize:"13px"}}>
                                            <Icon icon="ic:outline-offline-bolt" style={{marginRight:"5px", fontSize:"1.3rem"}}/>
                                            POWER
                                        </p>
                                    </div>
                                    <Icon icon="akar-icons:more-vertical" style={{color:"#b0b0b2", fontSize:"1.5rem"}}/>
                                </div>
                                <div className="">
                                {/* <div id="scrollBar" style={{height:"851.5px", maxWidth:"100%", overflow:"auto"}}> */}
                                { rankings === "Dynasty"?
                                    <DynastyRankings
                                        loadRosters={loadRosters}
                                        rosters={rosters}
                                    />
                                :
                                    <PowerRankings
                                        loadRosters={loadRosters}
                                        rosters={rosters}
                                    />
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}