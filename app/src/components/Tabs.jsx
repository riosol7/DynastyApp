import React from 'react'
import { Icon } from '@iconify/react';

export default function Tabs(props) {

    return (
        <>
            <div className="">
                <div className="my-5 d-flex justify-content-between align-items-center">
                    <div id="displayMenu"></div>
                    <Icon icon="bxs:dashboard"style={{fontSize:"2rem"}}/>
                    <div></div>
                </div>
            </div>
        </>
    )
}
