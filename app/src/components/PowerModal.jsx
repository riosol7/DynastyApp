import React from 'react'
import { Icon } from '@iconify/react';

export default function PowerModal(props) {
    const roster = props.roster
    const rosters = props.rosters

    const findTotalRoster = rosters.totalRoster.filter(team => team.owner_id.display_name === roster.kct.owner.display_name)[0]
    console.log(findTotalRoster)

    return (
        <div style={{background:"#111111"}}>
            <div className="d-flex pt-3">
                <div className="d-flex">
                    <div className="px-3">
                        <img style={{border:"4px solid #203a43", background:"#acb6c3", borderRadius:"15px"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                            roster.kct.owner.avatar}`
                        }/>
                    </div>
                    <div className="">
                        <div className="d-flex align-items-center">
                            <Icon icon="icon-park-outline:ranking"style={{color:"#a9dfd8",fontSize:"1.2rem", marginRight:"2px"}}/>
                        { roster.kct.owner.team_name ?
                            <p className="m-0" style={{color:"#b0b0b2"}}>{roster.rank}
                                <span style={{fontSize:"12px"}}>
                                {   roster.rank === 1? "st" : 
                                    roster.rank === 2? "nd" : 
                                    roster.rank === 3? "rd" : "th"
                                }
                                </span>
                                <span className="bold mx-1 mb-0" style={{fontSize:"21px", color:"white"}}>{roster.kct.owner.team_name}</span> 
                                <span style={{color:"#7f7f7f", fontWeight:"lighter",marginLeft:"6px"}}>@{roster.kct.owner.display_name}</span>
                            </p>
                        :
                            <p className="m-0" style={{color:"#b0b0b2"}}>{roster.rank}
                                <span style={{fontSize:"12px"}}>
                                {   roster.rank === 1? "st" : 
                                    roster.rank === 2? "nd" : 
                                    roster.rank === 3? "rd" : "th"
                                }
                                </span>
                                <span className="bold mx-1 mb-0" style={{fontSize:"21px", color:"white"}}>{roster.kct.owner.display_name}</span> 
                            </p>
                        }
                        </div>
                    </div>
                </div>
            </div>

            <div id="scrollBar" className="py-2" style={{height:"555px", overflow:"auto", background:"#111111"}}>
                <div>
                    <p className="m-0 bold" style={{fontSize:"13px", color:"#dbdbde"}}>Starters</p>
                { findTotalRoster.starters.filter(player => player.position === "QB").map((playerQB, i) =>
                    <div key={i}>
                        <p className="m-0">{playerQB.full_name}</p>
                    </div>
                )}
                { findTotalRoster.starters.filter(player => player.position === "RB").map((playerRB, i) =>
                    <div key={i}>
                        <p className="m-0">{playerRB.full_name}</p>
                    </div>
                )}
                { findTotalRoster.starters.filter(player => player.position === "WR").map((playerWR, i) =>
                    <div key={i}>
                        <p className="m-0">{playerWR.full_name}</p>
                    </div>
                )}
                { findTotalRoster.starters.filter(player => player.position === "TE").map((playerTE, i) =>
                    <div key={i}>
                        <p className="m-0">{playerTE.full_name}</p>
                    </div>
                )}
                </div>
            </div>

        </div>
    )
}
