import React from 'react'
import { Icon } from '@iconify/react';
import trophy from "../assets/trophy.gif";

export default function OverviewWidget(props) {
    const loadRosters = props.loadRosters
    // const rosters = props.rosters
    const league = props.league

    const getTop4 = league.previous_league? league.previous_league.winnerBracket.filter(b => b.r === 3).filter(c => Object.keys(c.t1_from).includes("l")) : []
    const getTop2 = league.previous_league? league.previous_league.winnerBracket.filter(b => b.r === 3).filter(c => Object.keys(c.t1_from).includes("w")) : []

    let findOwner = (ownerID, owners) => {
        let foundOwner = owners.filter(owner => owner.roster_id === ownerID)
        return foundOwner[0]
    }
    return (
        <>
        { loadRosters ? <p>Loading </p> :
            <div className="" style={{border:"0px solid black", borderRadius:"5px", background:"radial-gradient(circle, rgba(255,255,255,1) 35%, rgba(233,240,242,1) 70%, rgba(201,207,209,1) 100%)", color:"#4f455e"}}>
            { league.previous_league !== null || undefined?
                getTop2.map((roster, i) =>
                    <div key={i} className="d-flex justify-content-between">
                        <div>
                            <p className="m-0">{league.previous_league.season}</p>
                            <p className="m-0">{findOwner(roster.w, league.owners).display_name}</p>
                        </div>
                        <div className="" style={{width:"250px"}}>
                            <img src={trophy} alt="trophy" style={{maxWidth:"100%"}}/>
                        </div>
                        <div>
                        { getTop4.map((team, i) => 
                            <div key={i}>
                                <p className="m-0">2nd {findOwner(roster.l, league.owners).display_name}</p>
                                <p className="m-0">3rd {findOwner(team.w, league.owners).display_name}</p>
                                {/* <p className="m-0">4th {findOwner(team.l, league.owners).display_name}</p> */}
                            </div> 
                        )}
                        </div>
                    </div>
                )
            : <></>
            }
            </div>
        }
        </>
    )
}
