import React from 'react'
import { Icon } from '@iconify/react';

export default function Tabs(props) {

    return (
        <>
            <div className="" style={{background:"#1c1c1c"}}>
                <div className="my-5 d-flex justify-content-end align-items-center">
                    <Icon icon="bxs:dashboard"style={{fontSize:"2rem", marginRight:"1rem"}}/>
                    <div id="displayMenu"></div>
                </div>
            </div>
        </>
    )
}
