import React from 'react'

export default function DynastyRankings(props) {
    const rosters = props.rosters
    const isLoading = props.isLoading


    
    return (
        <>
        {
            isLoading ? <p>Loading </p> :
            <div>
                {
                    rosters.teamRank.map((roster, i) => 
                    <div key={i}>
                        <div className="d-flex">
                            <div className="col-md-9 d-flex">
                                <p className="px-2">{roster.rank}</p>
                                <div className="text-truncate">
                                {
                                    roster.kct.owner.team_name ?
                                    <p className="m-0 text-truncate">{roster.kct.owner.team_name}</p>
                                    :
                                    <p className="m-0 text-truncate">{roster.kct.owner.display_name}</p>
                                }
                                </div>
                            </div>
                            <div className="col-md-3 d-flex justify-content-center">
                                <p className="m-0">{roster.kct.teamTotal}</p>
                            </div>
                        </div>
                    </div>    
                    )
                }           
            </div>
        }
        </>
    )
}
