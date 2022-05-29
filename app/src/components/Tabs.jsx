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
                <div className="p-2">
                    <div>
                        <img className="leagueLogo rounded" alt="avatar" src={
                            `https://sleepercdn.com/avatars/thumbs/${
                                league.avatar
                        }`}/> 
                    </div>
                    <div className="my-5 d-flex justify-content-center">
                        <Icon style={{fontSize:"2rem"}}icon="radix-icons:dashboard"/>
                    </div>
                </div>
            </>
        }
        </>
    )
}
