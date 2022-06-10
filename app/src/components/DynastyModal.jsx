import React from 'react'
import { Icon } from '@iconify/react';

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    width:'45em',
    transform: 'translate(-50%, -50%)',
    background: "#2a2c3e",
    borderRadius:'4px',
    padding: '2rem',
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

export default function DynastyModal(props) {
    if(!props.open) return null 
    const team = props.team
    return (
        <>
        {  team !== {} ? 
            <div style={OVERLAY_STYLES}>
                <div style={MODAL_STYLES}>
                    <Icon icon="akar-icons:circle-x" style={{fontSize:"2em"}}onClick={props.onClose}/>
                </div>
            </div>
        :<></>
        }
        </>
    )
}
