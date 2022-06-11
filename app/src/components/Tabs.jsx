import React from 'react'
import { Icon } from '@iconify/react';

export default function Tabs(props) {
    const league = props.league
    const loadLeague = props.loadLeague

    return (
        <>
        {
            loadLeague ? <p>Loading </p> :
            <>
                <div className="" style={{background:"#1c1c1c"}}>
                    <div className="d-flex justify-content-center p-4">
                        <img className="leagueLogo rounded" alt="avatar" src={
                            `https://sleepercdn.com/avatars/thumbs/${
                                league.avatar
                        }`}/> 
                    </div>
                    <div className="my-5 d-flex justify-content-end align-items-center">
                        <Icon style={{fontSize:"2rem", marginLeft:"0rem"}}icon="radix-icons:dashboard"/>
                        <div id="displayMenu"><Icon icon="ep:arrow-left-bold" style={{color:"#a9dfd8"}}/></div>
                        {/* <div style={{background:"linear-gradient(360deg, rgba(116,178,221,1) 0%, rgba(114,202,224,1) 20%, rgba(51,193,189,1) 50%, rgba(80,204,147,1) 100%)", width:"6px", borderRadius:"2rem"}}></div> */}
                    </div>
                </div>
            </>
        }
        </>
    )
}
