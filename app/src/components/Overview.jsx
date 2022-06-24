import React from 'react';

import MVP from "../components/MVP";
import Transaction from "../components/Transaction";
import Standings from "../components/Standings";
import BannerWidget from "../components/BannerWidget";
import { Icon } from '@iconify/react';

export default function Overview(props) {
    const loadLeague = props.loadLeague
    const loadRosters = props.loadRosters 
    const loadTransactions = props.loadTransactions
    const transactions = props.transactions
    const rosters = props.rosters
    const league = props.league

    return (
        <>
            <div className="d-flex">
                <div className="col">
                    <div className="pt-2">
                        <div className="d-flex justify-content-between align-items-center mx-2 mb-2">
                            <p className="m-0" style={{fontSize:".95rem"}}>League Activity</p>
                            <div className="">
                                <Icon icon="akar-icons:more-horizontal" style={{fontSize:"1.5rem", color:"#b0b0b2"}}/>
                            </div>
                        </div>
                        <div id="scrollBar" style={{height:"858.7px", maxWidth:"100%", overflow:"auto"}}>
                        {/* <div className=""> */}
                            <Transaction
                                loadTransactions={loadTransactions}
                                transactions={transactions}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-sm-10 px-3" id="scrollBar" style={{height:"900.49px", maxWidth:"100%", overflow:"auto"}}>  
                    <div className="py-3">
                        <BannerWidget
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
       </>
    )
}
