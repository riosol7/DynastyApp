import React,{useState} from 'react';
import Modal from "./Modal";

import { Icon } from '@iconify/react';

export default function PowerRankings(props) {
    const rosters = props.rosters
    const [team, setTeam] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const powerModal = (data) => {
        setTeam(data)
        setIsOpen(true)
    }
    const closeModal = () => {
        setTeam({})
        setIsOpen(false)
    }
    return (
        <>
        { rosters.totalRoster.map((roster, i) => 
        <div key={i} className="mt-3">
            <div className="d-flex" onClick={() => powerModal(roster)}>
                <div className="col-md-9 d-flex">
                    <div className="displayOwnerLogoMD">
                        <div className="ownerLogoMD" style={{backgroundImage:`url(https://sleepercdn.com/avatars/thumbs/${
                            roster.kct.owner.avatar})`}}>
                        </div>
                    </div>
                    <div className="text-truncate mx-1" style={{width:"100%"}}>
                    { roster.kct.owner.team_name ?
                        <div className="d-flex" style={{fontSize:"13px"}}>
                            <span className="m-0">{i + 1}.</span>
                            <div className="text-truncate mx-1">
                                <p className="m-0 bold text-truncate">{roster.kct.owner.team_name}</p>
                                <p className="m-0 text-truncate" style={{fontSize:"11px",color:"#b0b0b2"}}>{roster.kct.owner.display_name}</p>
                            </div> 
                        </div>
                    :        
                        <p className="m-0 text-truncate" style={{fontSize:"13px"}}>
                            <span>{i + 1}. </span> 
                            <span className="bold">{roster.kct.owner.display_name}</span>
                        </p>
                    }
                    </div> 
                </div>
                <div className="col-md-3">
                    <p className="m-0" style={{fontSize:"14px"}}>{roster.settings.wins} - {roster.settings.losses}</p>
                { roster.metadata.streak.includes("W") === true ?
                    <span className="mx-1" style={{fontSize:".6rem"}}>
                        <Icon icon="bi:caret-up-fill" style={{color:"#368727", fontSize:".7rem"}}/>{roster.metadata.streak}
                    </span>
                :
                    <span className="mx-1" style={{fontSize:".6rem"}}>
                        <Icon icon="bi:caret-down-fill" style={{color:"#cc1d00", fontSize:".7rem"}}/>{roster.metadata.streak}
                    </span>
                }
                </div>
            </div>
        </div>    
        )}
        <Modal
            open={isOpen}
            onClose={() => closeModal()}
            team={team}
            rosters={rosters}
            tab={"Power"}
        />
        </>
    )
}
