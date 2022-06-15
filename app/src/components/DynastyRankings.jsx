import React, {useState} from 'react';
import DynastyModal from './DynastyModal';

export default function DynastyRankings(props) {
    const rosters = props.rosters
    const loadRosters = props.loadRosters

    const [filter, setFilter] = useState("Team")
    const [team, setTeam] = useState({})
    const [isOpen, setIsOpen] = useState(false)

    const qbRankings = () => {
        if(filter === "QB"){
            setFilter("Team")
        } else
        setFilter("QB")
    }
    const rbRankings = () => {
        if(filter === "RB"){
            setFilter("Team")
        } else
        setFilter("RB")
    }
    const wrRankings = () => {
        if(filter === "WR"){
            setFilter("Team")
        } else
        setFilter("WR")
    }
    const teRankings = () => {
        if(filter === "TE"){
            setFilter("Team")
        } else
        setFilter("TE")
    }
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
        {
            loadRosters ? <p>Loading </p> :
            <div className="" style={{maxWidth:"100%"}}>
                <div className="d-flex justify-content-center border-bottom pb-3">
                    <p 
                        style={filter === "QB"?{color:"#f8296d"}:{color:"gray"}}
                        onClick={qbRankings}
                        className="pointer m-0 mx-3">QB
                    </p>
                    <p 
                        style={filter === "RB"?{color:"#36ceb8"}:{color:"gray"}}
                        onClick={rbRankings}
                        className="pointer m-0 mx-3">RB
                    </p>
                    <p 
                        style={filter === "WR"?{color:"#58a7ff"}:{color:"gray"}}
                        onClick={wrRankings}
                        className="pointer m-0 mx-3">WR
                    </p>
                    <p
                        style={filter === "TE"?{color:"#faae58"}:{color:"gray"}}
                        onClick={teRankings} 
                        className="pointer m-0 mx-3">TE
                    </p>
                </div>
                <div id="scrollBar" style={{height:"808px", maxWidth:"100%", overflow:"auto"}}>
                { 
                    filter === "QB" ? rosters.qbRank.map((roster, i) => 
                    <div key={i} className="my-3">
                        <div className="team d-flex">
                            <div className="col-md-9 d-flex">
                                <div className="displayOwnerLogoMD">
                                    <div className="ownerLogoMD" style={{backgroundImage:`url(https://sleepercdn.com/avatars/thumbs/${
                                        roster.kct.owner.avatar})`}}>
                                    </div>
                                </div>
                                <div className="text-truncate mx-1" style={{width:"100%"}}>
                                {
                                    roster.kct.owner.team_name ?
                                    <>
                                        <div className="d-flex" style={{fontSize:"13px"}}>
                                            <span className="m-0">{roster.rank}.</span>
                                            <div className="text-truncate mx-1">
                                                <p className="m-0 bold text-truncate">{roster.kct.owner.team_name}</p>
                                                <p className="m-0 text-truncate" style={{fontSize:"11px",color:"#b0b0b2"}}>{roster.kct.owner.display_name}</p>
                                            </div> 
                                        </div>
                                    </>
                                    :        
                                    <p className="m-0 text-truncate" style={{fontSize:"13px"}}>
                                        <span>{roster.rank}. </span> 
                                        <span className="bold">{roster.kct.owner.display_name}</span>
                                    </p>
                                }
                                </div> 
                            </div>
                            <div className="col-md-3 d-flex justify-content-center">
                                <p className="m-0" style={{fontSize:"14px"}}>{roster.kct.qb.total}</p>
                            </div>
                        </div>
                    </div>   
                    ) : filter === "RB" ? rosters.rbRank.map((roster, i) => 
                    <div key={i} className="my-3">
                        <div className="team d-flex">
                            <div className="col-md-9 d-flex">
                                <div className="displayOwnerLogoMD">
                                    <div className="ownerLogoMD" style={{backgroundImage:`url(https://sleepercdn.com/avatars/thumbs/${
                                        roster.kct.owner.avatar})`}}>
                                    </div>
                                </div>
                                <div className="text-truncate mx-1" style={{width:"100%"}}>
                                {
                                    roster.kct.owner.team_name ?
                                    <>
                                        <div className="d-flex" style={{fontSize:"13px"}}>
                                            <span className="m-0">{roster.rank}.</span>
                                            <div className="text-truncate mx-1">
                                                <p className="m-0 bold text-truncate">{roster.kct.owner.team_name}</p>
                                                <p className="m-0 text-truncate" style={{fontSize:"11px",color:"#b0b0b2"}}>{roster.kct.owner.display_name}</p>
                                            </div> 
                                        </div>
                                    </>
                                    :        
                                    <p className="m-0 text-truncate" style={{fontSize:"13px"}}>
                                        <span>{roster.rank}. </span> 
                                        <span className="bold">{roster.kct.owner.display_name}</span>
                                    </p>
                                }
                                </div> 
                            </div>
                            <div className="col-md-3 d-flex justify-content-center">
                                <p className="m-0" style={{fontSize:"14px"}}>{roster.kct.rb.total}</p>
                            </div>
                        </div>
                    </div>  
                    ) : filter === "WR" ? rosters.wrRank.map((roster, i) => 
                    <div key={i} className="my-3">
                        <div className="team d-flex">
                            <div className="col-md-9 d-flex">
                                <div className="displayOwnerLogoMD">
                                    <div className="ownerLogoMD" style={{backgroundImage:`url(https://sleepercdn.com/avatars/thumbs/${
                                        roster.kct.owner.avatar})`}}>
                                    </div>
                                </div>
                                <div className="text-truncate mx-1" style={{width:"100%"}}>
                                {
                                    roster.kct.owner.team_name ?
                                    <>
                                        <div className="d-flex" style={{fontSize:"13px"}}>
                                            <span className="m-0">{roster.rank}.</span>
                                            <div className="text-truncate mx-1">
                                                <p className="m-0 bold text-truncate">{roster.kct.owner.team_name}</p>
                                                <p className="m-0 text-truncate" style={{fontSize:"11px",color:"#b0b0b2"}}>{roster.kct.owner.display_name}</p>
                                            </div> 
                                        </div>
                                    </>
                                    :        
                                    <p className="m-0 text-truncate" style={{fontSize:"13px"}}>
                                        <span>{roster.rank}. </span> 
                                        <span className="bold">{roster.kct.owner.display_name}</span>
                                    </p>
                                }
                                </div> 
                            </div>
                            <div className="col-md-3 d-flex justify-content-center">
                                <p className="m-0" style={{fontSize:"14px"}}>{roster.kct.wr.total}</p>
                            </div>
                        </div>
                    </div>    
                    ) : filter === "TE" ? rosters.teRank.map((roster, i) => 
                    <div key={i} className="my-3">
                        <div className="team d-flex">
                            <div className="col-md-9 d-flex">
                                <div className="displayOwnerLogoMD">
                                    <div className="ownerLogoMD" style={{backgroundImage:`url(https://sleepercdn.com/avatars/thumbs/${
                                        roster.kct.owner.avatar})`}}>
                                    </div>
                                </div>
                                <div className="text-truncate mx-1" style={{width:"100%"}}>
                                {
                                    roster.kct.owner.team_name ?
                                    <>
                                        <div className="d-flex" style={{fontSize:"13px"}}>
                                            <span className="m-0">{roster.rank}.</span>
                                            <div className="text-truncate mx-1">
                                                <p className="m-0 bold text-truncate">{roster.kct.owner.team_name}</p>
                                                <p className="m-0 text-truncate" style={{fontSize:"11px",color:"#b0b0b2"}}>{roster.kct.owner.display_name}</p>
                                            </div> 
                                        </div>
                                    </>
                                    :        
                                    <p className="m-0 text-truncate" style={{fontSize:"13px"}}>
                                        <span>{roster.rank}. </span> 
                                        <span className="bold">{roster.kct.owner.display_name}</span>
                                    </p>
                                }
                                </div> 
                            </div>
                            <div className="col-md-3 d-flex justify-content-center">
                                <p className="m-0" style={{fontSize:"14px"}}>{roster.kct.te.total}</p>
                            </div>
                        </div>
                    </div>    
                    ) : rosters.teamRank.map((roster, i) => 
                    <div key={i} className="my-3">
                        <div className="team d-flex" onClick={() => dynastyModal(roster)}>
                            <div className="col-md-9 d-flex">
                                <div className="displayOwnerLogoMD">
                                    <div className="ownerLogoMD" style={{backgroundImage:`url(https://sleepercdn.com/avatars/thumbs/${
                                        roster.kct.owner.avatar})`}}>
                                    </div>
                                </div>
                                <div className="text-truncate mx-1" style={{width:"100%"}}>
                                { roster.kct.owner.team_name ?
                                    <div className="d-flex" style={{fontSize:"13px"}}>
                                        <span className="m-0">{roster.rank}.</span>
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
                            <div className="col-md-3 d-flex justify-content-center">
                                <p className="m-0" style={{fontSize:"14px"}}>{roster.kct.teamTotal}</p>
                            </div>
                        </div>
                    </div>    
                    ) 
                }    
                </div>  
            </div>
        }
        <DynastyModal
            open={isOpen}
            onClose={() => closeModal()}
            team={team}
            rosters={rosters}
        />
        </>
    )
}
