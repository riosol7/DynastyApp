import React, {useState} from 'react';
import Modal from "./Modal";

export default function DynastyRankings(props) {
    const rosters = props.rosters
    const loadRosters = props.loadRosters
    const loadLeague = props.loadLeague
    const league = props.league
    const filter = props.filter

    const [team, setTeam] = useState({})
    const [isOpen, setIsOpen] = useState(false)


    const dynastyModal = (data) => {
        setTeam(data)
        setIsOpen(true)
    }
    const closeModal = () => {
        setTeam({})
        setIsOpen(false)
    }

    return (
        <>
        { loadRosters ? <p>Loading </p> :
            <div className="" style={{maxWidth:"100%"}}>
                <div>
                {/* <div id="scrollBar" style={{height:"883.7px", maxWidth:"100%", overflow:"auto"}}> */}
                { filter === "QB" ? rosters.qbRank.map((roster, i) => 
                    <div key={i} style={{marginTop:"1.1em", marginBottom:"1.1em"}}>
                        <div className="team d-flex" onClick={() => dynastyModal(roster)}>
                            <div className="col-sm-9 d-flex">
                                <div className="">
                                    <div className="ownerLogoMD" style={{backgroundImage:`url(https://sleepercdn.com/avatars/thumbs/${
                                        roster.kct.owner.avatar})`}}>
                                    </div>
                                </div>
                                <div className="text-truncate mx-1" style={{width:"100%"}}>
                                { roster.kct.owner.team_name ?
                                        <div className="d-flex" style={{fontSize:"13px"}}>
                                            <span className="m-0">{roster.rank}. </span>
                                            <div className="text-truncate mx-1">
                                                <p className="m-0 bold text-truncate">{roster.kct.owner.team_name}</p>
                                                <p className="m-0 text-truncate" style={{fontSize:"11px",color:"#b0b0b2"}}>{roster.kct.owner.display_name}</p>
                                            </div> 
                                        </div>
                                    :        
                                    <p className="m-0 text-truncate" style={{fontSize:"13px"}}>
                                        <span>{roster.rank}. </span> 
                                        <span className="bold">{roster.kct.owner.display_name}</span>
                                    </p>
                                }
                                </div> 
                            </div>
                            <div className="col-sm-3 d-flex justify-content-center">
                                <p className="m-0" style={{fontSize:"14px"}}>{roster.kct.qb.total}</p>
                            </div>
                        </div>
                    </div>   
                    ) : filter === "RB" ? rosters.rbRank.map((roster, i) => 
                    <div key={i} style={{marginTop:"1.1em", marginBottom:"1.1em"}}>
                        <div className="team d-flex" onClick={() => dynastyModal(roster)}>
                            <div className="col-sm-9 d-flex">
                                <div className="">
                                    <div className="ownerLogoMD" style={{backgroundImage:`url(https://sleepercdn.com/avatars/thumbs/${
                                        roster.kct.owner.avatar})`}}>
                                    </div>
                                </div>
                                <div className="text-truncate mx-1" style={{width:"100%"}}>
                                { roster.kct.owner.team_name ?
                                        <div className="d-flex" style={{fontSize:"13px"}}>
                                            <span className="m-0">{roster.rank}. </span>
                                            <div className="text-truncate mx-1">
                                                <p className="m-0 bold text-truncate">{roster.kct.owner.team_name}</p>
                                                <p className="m-0 text-truncate" style={{fontSize:"11px",color:"#b0b0b2"}}>{roster.kct.owner.display_name}</p>
                                            </div> 
                                        </div>
                                    :        
                                    <p className="m-0 text-truncate" style={{fontSize:"13px"}}>
                                        <span>{roster.rank}. </span> 
                                        <span className="bold">{roster.kct.owner.display_name}</span>
                                    </p>
                                }
                                </div> 
                            </div>
                            <div className="col-sm-3 d-flex justify-content-center">
                                <p className="m-0" style={{fontSize:"14px"}}>{roster.kct.rb.total}</p>
                            </div>
                        </div>
                    </div>  
                    ) : filter === "WR" ? rosters.wrRank.map((roster, i) => 
                    <div key={i} style={{marginTop:"1.1em", marginBottom:"1.1em"}}>
                        <div className="team d-flex" onClick={() => dynastyModal(roster)}>
                            <div className="col-sm-9 d-flex">
                                <div className="">
                                    <div className="ownerLogoMD" style={{backgroundImage:`url(https://sleepercdn.com/avatars/thumbs/${
                                        roster.kct.owner.avatar})`}}>
                                    </div>
                                </div>
                                <div className="text-truncate mx-1" style={{width:"100%"}}>
                                { roster.kct.owner.team_name ?
                                        <div className="d-flex" style={{fontSize:"13px"}}>
                                            <span className="m-0">{roster.rank}. </span>
                                            <div className="text-truncate mx-1">
                                                <p className="m-0 bold text-truncate">{roster.kct.owner.team_name}</p>
                                                <p className="m-0 text-truncate" style={{fontSize:"11px",color:"#b0b0b2"}}>{roster.kct.owner.display_name}</p>
                                            </div> 
                                        </div>
                                    :        
                                    <p className="m-0 text-truncate" style={{fontSize:"13px"}}>
                                        <span>{roster.rank}. </span> 
                                        <span className="bold">{roster.kct.owner.display_name}</span>
                                    </p>
                                }
                                </div> 
                            </div>
                            <div className="col-sm-3 d-flex justify-content-center">
                                <p className="m-0" style={{fontSize:"14px"}}>{roster.kct.wr.total}</p>
                            </div>
                        </div>
                    </div>    
                    ) : filter === "TE" ? rosters.teRank.map((roster, i) => 
                    <div key={i} style={{marginTop:"1.1em", marginBottom:"1.1em"}}>
                        <div className="team d-flex" onClick={() => dynastyModal(roster)}>
                            <div className="col-sm-9 d-flex">
                                <div className="">
                                    <div className="ownerLogoMD" style={{backgroundImage:`url(https://sleepercdn.com/avatars/thumbs/${
                                        roster.kct.owner.avatar})`}}>
                                    </div>
                                </div>
                                <div className="text-truncate mx-1" style={{width:"100%"}}>
                                { roster.kct.owner.team_name ?
                                    <div className="d-flex" style={{fontSize:"13px"}}>
                                        <span className="m-0">{roster.rank}. </span>
                                        <div className="text-truncate mx-1">
                                            <p className="m-0 bold text-truncate">{roster.kct.owner.team_name}</p>
                                            <p className="m-0 text-truncate" style={{fontSize:"11px",color:"#b0b0b2"}}>{roster.kct.owner.display_name}</p>
                                        </div> 
                                    </div>
                                :        
                                    <p className="m-0 text-truncate" style={{fontSize:"13px"}}>
                                        <span>{roster.rank}. </span> 
                                        <span className="bold">{roster.kct.owner.display_name}</span>
                                    </p>
                                }
                                </div> 
                            </div>
                            <div className="col-sm-3 d-flex justify-content-center">
                                <p className="m-0" style={{fontSize:"14px"}}>{roster.kct.te.total}</p>
                            </div>
                        </div>
                    </div>    
                    ) : rosters.teamRank.map((roster, i) => 
                    <div key={i} style={{marginTop:"1.1em", marginBottom:"1.1em"}}>
                        <div className="team d-flex" onClick={() => dynastyModal(roster)}>
                            <div className="col-sm-9 d-flex">
                                <div className="">
                                    <div className="ownerLogoMD" style={{backgroundImage:`url(https://sleepercdn.com/avatars/thumbs/${
                                        roster.kct.owner.avatar})`}}>
                                    </div>
                                </div>
                                <div className="text-truncate mx-1" style={{width:"100%"}}>
                                { roster.kct.owner.team_name ?
                                    <div className="d-flex" style={{fontSize:"13px"}}>
                                        <span className="m-0">{roster.rank}. </span>
                                        <div className="text-truncate mx-1">
                                            <p className="m-0 bold text-truncate">{roster.kct.owner.team_name}</p>
                                            <p className="m-0 text-truncate" style={{fontSize:"11px",color:"#b0b0b2"}}>{roster.kct.owner.display_name}</p>
                                        </div> 
                                    </div>
                                :        
                                    <p className="m-0 text-truncate" style={{fontSize:"13px"}}>
                                        <span>{roster.rank}. </span> 
                                        <span className="bold">{roster.kct.owner.display_name}</span>
                                    </p>                                   
                                }
                                </div> 
                            </div>
                            <div className="col-sm-3 d-flex justify-content-center">
                                <p className="m-0" style={{fontSize:"14px"}}>{roster.kct.teamTotal}</p>
                            </div>
                        </div>
                    </div>    
                )}    
                </div>  
            </div>
        }
        <Modal
            open={isOpen}
            onClose={() => closeModal()}
            team={team}
            rosters={rosters}
            loadLeague={loadLeague}
            league={league}
            tab={"Dynasty"}
        />
        </>
    )
}
