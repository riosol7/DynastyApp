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
                    <div>
                        <img className="leagueLogo rounded" alt="avatar" src={
                            `https://sleepercdn.com/avatars/thumbs/${
                                league.avatar
                        }`}/> 
                    </div>
                    <div className="mx-2">
                        <p className="display-6 m-0">{league.name}</p>
                        <p className="m-0 text-center">{league.season} {league.status === "pre_draft" ? "Pre-Draft" : ""}</p>
                    </div>
                </div>
                <div className="d-flex">
                    <div>
                        <p className="m-0">{league.metadata ? league.metadata.division_1 : ""}</p>
                        {
                            league.divisions.division_1_owners.map((owner, i) => 
                                <div key={i}>
                                    <p className="m-0">{owner}</p>
                                </div>
                            )
                        }
                    </div>
                    <div>
                        <p  className="m-0">{league.metadata ? league.metadata.division_2 : ""}</p>
                        {
                            league.divisions.division_2_owners.map((owner, i) => 
                                <div key={i}>
                                    <p className="m-0">{owner}</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </>
        }
        </>
    )
}
