import React from 'react'

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

export default function RankModal(props) {
    const filter = props.filter
     
    if(!props.open) return null 
    return (
        <div style={MODAL_STYLES}>
            <div className="d-flex align-items-center justify-content-center bold" style={{fontSize:"16px"}}>
                <p style={filter === "QB"?{color:"#f8296d"}:{color:"gray"}}
                    onClick={props.qbRankings()}
                    className="pointer m-0 mx-3">QB
                </p>
                <p style={filter === "RB"?{color:"#36ceb8"}:{color:"gray"}}
                    onClick={props.rbRankings()}
                    className="pointer m-0 mx-3">RB
                </p>
                <p style={filter === "WR"?{color:"#58a7ff"}:{color:"gray"}}
                    onClick={props.wrRankings()}
                    className="pointer m-0 mx-3">WR
                </p>
                <p style={filter === "TE"?{color:"#faae58"}:{color:"gray"}}
                    onClick={props.teRankings()} 
                    className="pointer m-0 mx-3">TE
                </p>
            </div>
        </div>
    )
}
