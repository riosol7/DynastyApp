import React, {useState} from 'react';

import { Icon } from '@iconify/react';
import trophy from "../assets/trophy2.png";
import wreath from "../assets/wreath.png";
import PlayoffModal from './PlayoffModal';

export default function BannerWidget(props) {
    const loadRosters = props.loadRosters
    const rosters = props.rosters
    const league = props.league

    const previous_league = league.history.find(l => l.league.league_id === league.previous_league_id)

    const getTop4 = previous_league? previous_league.league.brackets.winner.bracket.filter(b => b.r === 3).filter(c => Object.keys(c.t1_from).includes("l")) : []
    const getTop2 = previous_league? previous_league.league.brackets.winner.bracket.filter(b => b.r === 3).filter(c => Object.keys(c.t1_from).includes("w")) : []

    // const getTop4 = league.previous_league? league.previous_league.winnerBracket.filter(b => b.r === 3).filter(c => Object.keys(c.t1_from).includes("l")) : []
    // const getTop2 = league.previous_league? league.previous_league.winnerBracket.filter(b => b.r === 3).filter(c => Object.keys(c.t1_from).includes("w")) : []
   
    const [isOpen, setIsOpen] = useState(false)
    const playoffModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    let findOwner = (ownerID, owners) => {
        let foundOwner = owners.filter(owner => owner.roster_id === ownerID)
        return foundOwner[0]
    }
    return (
        <>
        { loadRosters ? <p>Loading </p> :
            <div>
                <div className="d-flex"> 
                    <div className="col-sm-12" style={{border:"0px solid black", borderRadius:"5px", backgroundColor: "#abe9cd", backgroundImage:"linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)", color:"white", opacity:"0.9"}}>
                    { league.previous_league !== null || undefined?
                        getTop2.map((roster, i) =>
                            <div key={i} className="d-flex">
                                <div className="col-sm-10 d-flex">
                                    <div className="col-sm-8 p-5 m-2" style={{backgroundImage:`url(${wreath})`, backgroundSize:"45%", backgroundPosition:"center", backgroundRepeat:"no-repeat"}}>
                                        <p className="m-0 bold d-flex justify-content-center" style={{fontSize:"2.5rem", textShadow:"6px 6px 0px rgba(0,0,0,0.2)"}}>{previous_league.year} CHAMPION</p>
                                        <div className="d-flex align-items-center justify-content-center">  
                                        { findOwner(roster.w, league.owners).metadata.team_name ?
                                            <div className="bold">
                                                <p className="m-0" style={{fontSize:"1.2rem"}}>
                                                    <Icon icon="noto:1st-place-medal" style={{fontSize:"2rem"}}/>
                                                    {findOwner(roster.w, league.owners).metadata.team_name}
                                                </p>
                                                <p className="m-0 text-center bold" style={{color:"#383838", fontSize:".9rem"}}>
                                                    {((findOwner(roster.w, rosters.totalRoster).metadata.record).match(/W/g) || []).length} - {((findOwner(roster.w, rosters.totalRoster).metadata.record).match(/L/g) || []).length}
                                                </p>
                                            </div>
                                        : <p className="m-0">{findOwner(roster.w, league.owners).display_name}</p>
                                        }
                                        </div>
                                    </div>
                                    <div id="trophy" className="" style={{backgroundImage:`url(${trophy})`}}></div>
                                </div>
                                <div className="col-sm-2">
                                { getTop4.map((team, i) => 
                                    <div key={i} className="m-3 bold">
                                        <div className="d-flex justify-content-end">
                                            <Icon icon="tabler:tournament" onClick={() => playoffModal()} style={{fontSize:"1.7rem", color:"#18204a"}}/>
                                        </div>
                                        {/* <div className="mb-3 d-flex align-items-center">
                                            <div className="d-flex align-items-center justify-content-end">
                                                <Icon icon="noto:2nd-place-medal" style={{fontSize:"2rem"}}/>
                                                <p className="m-0">{findOwner(roster.l, league.owners).display_name}</p>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-end">
                                                <Icon icon="noto:3rd-place-medal" style={{fontSize:"2rem"}}/>
                                                <p className="m-0">{findOwner(team.w, league.owners).display_name}</p>
                                            </div>
                                        </div> */}
                                    </div> 
                                )}
                                </div>
                            </div>
                        )
                    : <></>
                    }
                    </div>
                </div>
            </div>
        }
         <PlayoffModal
            open={isOpen}
            onClose={() => closeModal()}
            league={league}
            rosters={rosters}
        />
        </>
    )
}
