import React from 'react'

export default function LeagueWidget(props) {
    const loadLeague = props.loadLeague
    const league = props.league

    return (
        <>
        {
            loadLeague ? <p>Loading </p> :
            <>
                <div className="d-flex align-items-center">
                    <div className="d-flex justify-content-center mx-2">
                        <img className="leagueLogo rounded" style={{width:"36px"}} alt="avatar" src={
                            `https://sleepercdn.com/avatars/thumbs/${
                                league.avatar
                        }`}/> 
                    </div>
                    <p className="bold m-0" style={{fontSize:"1.2rem"}}>{league.name}</p>
                    <p className="m-0 mx-2 bold" style={{color:"#b0b0b2"}}>{league.season} {league.status === "pre_draft" ? "Pre-Draft" : ""}</p>
                </div>
            </>
        }
        </>
    )
}
