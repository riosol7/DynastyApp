import React, {useState} from 'react';

import DynastyModal from "./DynastyModal";
import PowerModal from "./PowerModal";

import { Icon } from '@iconify/react';

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    width:'38em',
    transform: 'translate(-50%, -50%)',
    background: "#1b2025",
    borderRadius:'5px',
    height:"876px",
    zIndex: 1
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.6)',
    zIndex:1
}

export default function Modal(props) {
    const roster = props.team
    const rosters = props.rosters
    
    const [tab, setTab] = useState(props.tab)
    const [showQBs, setShowQBs] = useState(false)
    const [qbArrow, setQbArrow] = useState(true)
    const [showRBs, setShowRBs] = useState(false)
    const [rbArrow, setRbArrow] = useState(true)
    const [showWRs, setShowWRs] = useState(false)
    const [wrArrow, setWrArrow] = useState(true)
    const [showTEs, setShowTEs] = useState(false)
    const [teArrow, setTeArrow] = useState(true)

    const showMoreQBs = () => {
        setShowQBs(!showQBs)
        setQbArrow(!qbArrow)
    }
    const showMoreRBs = () => {
        setShowRBs(!showRBs)
        setRbArrow(!rbArrow)
    }
    const showMoreWRs = () => {
        setShowWRs(!showWRs)
        setWrArrow(!wrArrow)
    }
    const showMoreTEs = () => {
        props.setShowTEs(!showTEs)
        props.setTeArrow(!teArrow)
    }
    const closeModal = () => {
        props.onClose()
        setShowQBs(false)
        setQbArrow(true)
        setShowRBs(false)
        setRbArrow(true)
        setShowWRs(false)
        setWrArrow(true)
        setShowTEs(false)
        setTeArrow(true)
    }
  
    if(!props.open) return null 
    return (
        <>
        {  roster !== {} ? 
            <div style={OVERLAY_STYLES}>
                <div style={MODAL_STYLES}>
                    <div>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center" style={{fontWeight:"200"}}>
                                <div className="d-flex align-items-center mt-2 px-4 py-2" onClick={() => setTab("Dynasty")}
                                    style={tab ==="Dynasty"?
                                    {background:"#111111", borderRadius:"10px 10px 0px 0"}
                                :   {color:"#b0b0b2"}
                                }>
                                    <Icon icon="akar-icons:crown" style={tab==="Dynasty"?
                                        {marginRight:"5px", fontSize:"1rem", color:"#a9dfd8"}
                                    :   {marginRight:"5px", fontSize:"1rem"}
                                    }/>
                                    <p className="m-0">Dynasty</p>
                                </div>
                                <div className="d-flex align-items-center mt-2 px-4 py-2" onClick={() => setTab("Power")}
                                    style={tab === "Power"?
                                    {background:"#111111", borderRadius:"10px 10px 0px 0"}
                                :   {color:"#b0b0b2"}
                                }>
                                    <Icon icon="ic:outline-offline-bolt" style={tab==="Power"?
                                        {marginRight:"5px", fontSize:"1.3rem", color:"#a9dfd8"}
                                    :   {marginRight:"5px", fontSize:"1.3rem"}
                                    }/>
                                    <p className="m-0">Power</p>
                                </div>
                            </div>
                            <div className="py-2 px-3">
                                <Icon icon="octicon:x-circle-fill-24" style={{fontSize:"1em", color:"#f25b57"}}onClick={closeModal}/>
                            </div>
                        </div>
                        { tab === "Dynasty"?
                            <DynastyModal
                                roster={roster}
                                rosters={rosters}
                                showMoreQBs={showMoreQBs}
                                showMoreRBs={showMoreRBs}
                                showMoreWRs={showMoreWRs}
                                showMoreTEs={showMoreTEs}
                                qbArrow={qbArrow}
                                rbArrow={rbArrow}
                                wrArrow={wrArrow}
                                teArrow={teArrow}
                                showQBs={showQBs}
                                showRBs={showRBs}
                                showWRs={showWRs}
                                showTEs={showTEs}
                            />
                        :
                            <PowerModal
                                roster={roster}
                                rosters={rosters}
                            />
                        }
                    </div>
                </div>
            </div>
        :<></>
        }
        </>
    )
}
