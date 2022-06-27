import React, { useEffect, useState } from "react";

import LeagueWidget from "../components/LeagueWidget";
import Overview from "../components/Overview";
import Analytics from "../components/Analytics";
import Tabs from "../components/Tabs";

import { Icon } from '@iconify/react';
import Rankings from "../components/Rankings";

export default function Home () {
    const [dashboard, setDashboard] = useState("Overview")

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
            <div className="d-flex" style={{height:"100vh"}}>
                {/* Menu */}
                <div className="" style={{minWidth:"4rem", marginRight:".8em"}}>
                    <Tabs/>
                </div>
            { loadRosters && loadLeague && loadTransactions? <div style={{height:"100vh"}}></div>:
                <div className="d-flex" style={{width:"1840px", background:"black"}}>
                    <div className="col-sm-10 px-2 pt-3">
                        <div className="">
                            <div className="d-flex align-items-center pb-2">
                                <div className="col-sm-9">
                                    <LeagueWidget
                                        league={league}
                                        loadLeague={loadLeague}
                                    />
                                </div>
                                <div className="col-sm-1">
                                { dashboard === "Overview"?
                                <>
                                    <div className="selectedView"></div>
                                    <div className="d-flex align-items-center justify-content-center" onClick={() => setDashboard("Overview")}>
                                        <Icon icon="fluent:content-view-gallery-24-regular" style={{fontSize:"1.5rem", color:"#a9dfd8"}}/>
                                        <p className="m-0 mx-1">Overview</p>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="selectView"></div>
                                    <div className="d-flex align-items-center justify-content-center" onClick={() => setDashboard("Overview")}>
                                        <Icon icon="fluent:content-view-gallery-24-regular" style={{fontSize:"1.5rem",color:"#686b71"}} />
                                        <p className="m-0 mx-1"style={{color:"#686b71"}}>Overview</p>
                                    </div>
                                </>
                                }
                                </div>
                                <div className="col-sm-1">
                                { dashboard === "Analytics"?
                                <>
                                    <div className="selectedView"></div>
                                    <div className="d-flex align-items-center justify-content-center" onClick={() => setDashboard("Analytics")}>
                                        <Icon icon="tabler:device-analytics" style={{fontSize:"1.5rem", color:"#a9dfd8"}}/>
                                        <p className="m-0 mx-1">Analytics</p>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="selectView"></div>
                                    <div className="d-flex align-items-center justify-content-center" onClick={() => setDashboard("Analytics")}>
                                        <Icon icon="tabler:device-analytics" style={{fontSize:"1.5rem",color:"#686b71"}} />
                                        <p className="m-0 mx-1"style={{color:"#686b71"}}>Analytics</p>
                                    </div>
                                </>
                                }
                                </div>
                                <div className="col-sm-1"></div>
                            </div>
                        { dashboard === "Overview" ?
                            <Overview
                                loadRosters={loadRosters}
                                rosters={rosters}
                                loadTransactions={loadTransactions}
                                transactions={transactions}
                                loadLeague={loadLeague}
                                league={league}
                            />
                        :
                            <Analytics
                                // loadLeague={loadLeague}
                                // league={league}
                                rosters={rosters}
                                loadRosters={loadRosters}
                            />
                        }
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <Rankings
                            rosters={rosters}
                            loadRosters={loadRosters}
                        />
                    </div>
                </div>
            }
            </div>
        </>
    );
}