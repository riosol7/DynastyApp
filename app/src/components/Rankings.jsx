import React, {useState} from 'react';

import DynastyRankings from "../components/DynastyRankings";
import PowerRankings from "../components/PowerRankings";

import { Icon } from '@iconify/react';
// import RankModal from './RankModal';
const MODAL_STYLES = {
    position: 'fixed',
    top: '4.5%',
    left: '91.7%',
    width:'19em',
    height:"4em",
    transform: 'translate(-50%, -50%)',
    background: "black" ||"#1b2025",
    borderRadius:'0px',
    borderBottom:"1px solid #a9dfd8",
    fontSize:"16px",
    zIndex: 1
}
export default function Rankings(props) {
    const rosters = props.rosters
    const loadRosters = props.loadRosters
    
    const [rankings, setRankings] = useState("Dynasty")
    const [filter, setFilter] = useState("Team")
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
    const closeMenu = () => {
        setIsOpen(false)
        setFilter("Team")
    }
    return (
        <>
            <div className="px-2">
                <div className="d-flex align-items-center justify-content-between my-4">
                    <div className={rankings ==="Dynasty"? "btnAction" : "btnOff"} onClick={() => setRankings("Dynasty")}>
                        <p className="m-2 d-flex align-items-center bold" style={{fontSize:"13px"}}>
                            <Icon icon="akar-icons:crown" style={{marginRight:"5px", fontSize:"1rem"}}/>
                            DYNASTY
                        </p>
                    </div>
                    <div className={rankings ==="Power"? "btnAction" : "btnOff"} onClick={() => setRankings("Power")}>
                        <p className="m-2 d-flex align-items-center bold" style={{fontSize:"13px"}}>
                            <Icon icon="ic:outline-offline-bolt" style={{marginRight:"5px", fontSize:"1.3rem"}}/>
                            POWER
                        </p>
                    </div>
                    <Icon icon="akar-icons:more-vertical" style={{color:"#b0b0b2", fontSize:"1.5rem"}} onClick={rankings === "Dynasty"? () => setIsOpen(true) : null}/>
                </div>
                <div className="">
                {/* <div id="scrollBar" style={{height:"851.5px", maxWidth:"100%", overflow:"auto"}}> */}
                { rankings === "Dynasty"?
                    <DynastyRankings
                        loadRosters={loadRosters}
                        rosters={rosters}
                        filter={filter}
                    />
                :
                    <div className="">
                        <PowerRankings
                            loadRosters={loadRosters}
                            rosters={rosters}
                            filter={filter}
                        />
                    </div>
                }
                </div>
            </div>
            { !isOpen ?
                null
            :
                <div open={isOpen} onClose={() => setIsOpen(false)}>
                    <div className="d-flex align-items-center justify-content-between bold" style={MODAL_STYLES}>
                        <p style={filter === "QB"?{color:"#f8296d"}:{color:"gray"}}
                            onClick={() => qbRankings()}
                            className="pointer m-0 mx-3">QB
                        </p>
                        <p style={filter === "RB"?{color:"#36ceb8"}:{color:"gray"}}
                            onClick={() => rbRankings()}
                            className="pointer m-0 mx-3">RB
                        </p>
                        <p style={filter === "WR"?{color:"#58a7ff"}:{color:"gray"}}
                            onClick={() => wrRankings()}
                            className="pointer m-0 mx-3">WR
                        </p>
                        <p style={filter === "TE"?{color:"#faae58"}:{color:"gray"}}
                            onClick={() => teRankings()} 
                            className="pointer m-0 mx-3">TE
                        </p>
                        <Icon className="mx-1" icon="bi:x-lg" style={{color:"#b0b0b2",fontSize:"1.3rem"}} onClick={closeMenu}/>
                    </div>
                </div>
            }
        </>
    )
}
