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
                    <p className="bold m-0" style={{fontSize:"1.2rem"}}>{league.name}</p>
                    <p className="m-0 mx-2 bold" style={{color:"#b0b0b2"}}>{league.season} {league.status === "pre_draft" ? "Pre-Draft" : ""}</p>
                </div>
            </>
        }
        </>
    )
}
