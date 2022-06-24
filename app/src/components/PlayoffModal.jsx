import React from 'react';
import { Icon } from '@iconify/react';

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    width:'38em',
    transform: 'translate(-50%, -50%)',
    background: "#1b2025",
    borderRadius:'4px',
    // padding: '2rem',
    zIndex: 5
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.6)',
    zIndex:5
}

export default function PlayoffModal(props) {
    if(!props.open) return null 

    return (
       <>
            <div style={OVERLAY_STYLES}>
                <div style={MODAL_STYLES}>
                    <div className="py-2 px-3">
                        <Icon icon="octicon:x-circle-fill-24" style={{fontSize:"1em", color:"#f25b57"}}onClick={props.onClose}/>
                    </div>
                </div>
            </div>
       </>
    ) 
}
