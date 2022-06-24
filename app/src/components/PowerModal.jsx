import React from 'react'
import { Icon } from '@iconify/react';

export default function PowerModal(props) {
    const roster = props.roster
    console.log(roster)
    // const rosters = props.rosters

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
        </div>
    )
}