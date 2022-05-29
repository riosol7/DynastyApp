import React from 'react'

export default function LeagueWidget(props) {
    const loadLeague = props.loadLeague
    const league = props.league

    return (
        <>
        {
            loadLeague ? <p>Loading </p> :
            <>
                <div className="d-flex">
                    <div className="mx-2">
                        <p className="display-6 m-0">{league.name}</p>
                        <p className="m-0 text-center">{league.season} {league.status === "pre_draft" ? "Pre-Draft" : ""}</p>
                    </div>
                </div>
            </>
        }
        </>
    )
}
