import React from 'react'
import { Icon } from '@iconify/react';
import vs from "../assets/vs.png";

export default function Tabs(props) {

    return (
        <>
            <div className="">
                <div className="mt-4 mb-5 d-flex justify-content-end align-items-center">
                    {/* <div id="displayMenu"></div> */}
                    <div></div>
                    <Icon icon="charm:menu-hamburger"style={{fontSize:"2rem", color:"#7f7f7f"}}/>
                    <div></div>
                </div>
                <div className="my-5 d-flex justify-content-between align-items-center">
                    <div id="displayMenu"></div>
                    <Icon icon="bxs:dashboard"style={{fontSize:"2rem"}}/>
                </div>
                <div className="my-5 d-flex justify-content-between align-items-center">
                    {/* <div id="displayMenu"></div> */}
                    <div></div>
                    <div>
                        <img src={vs} alt="vs" style={{width:"2rem"}}/>
                    </div>
                </div>
                <div className="my-5 d-flex justify-content-between align-items-center">
                    {/* <div id="displayMenu"></div> */}
                    <div></div>
                    <Icon icon="fa-solid:history" style={{fontSize:"2rem", color:"#7f7f7f"}}/>
                </div>
                <div className="my-5 d-flex justify-content-between align-items-center">
                    {/* <div id="displayMenu"></div> */}
                    <div></div>
                    <Icon icon="carbon:blog" style={{fontSize:"2rem", color:"#7f7f7f"}}/>
                </div>
            </div>
        </>
    )
}
