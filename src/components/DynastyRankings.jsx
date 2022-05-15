import React, {useState} from 'react';

export default function DynastyRankings(props) {
    const rosters = props.rosters
    const isLoading = props.isLoading

    const [filter, setFilter] = useState("Team")

    const qbRankings = () => {
        if(filter === "QB"){
            setFilter("Team")
        } else
        setFilter("QB")
    }


    const rbRankings = () => {
        if(filter === "RB"){
            setFilter("Team")
        } else
        setFilter("RB")
    }

    const wrRankings = () => {
        if(filter === "WR"){
            setFilter("Team")
        } else
        setFilter("WR")
    }

    const teRankings = () => {
        if(filter === "TE"){
            setFilter("Team")
        } else
        setFilter("TE")
    }

    return (
        <>
        {
            isLoading ? <p>Loading </p> :
            <div>
                <div className="d-flex justify-content-center">
                    <p 
                        onClick={qbRankings}
                        className="m-0 mx-2">QB
                    </p>
                    <p 
                        onClick={rbRankings}
                        className="m-0 mx-2">RB
                    </p>
                    <p 
                        onClick={wrRankings}
                        className="m-0 mx-2">WR
                    </p>
                    <p
                        onClick={teRankings} 
                        className="m-0 mx-2">TE
                    </p>
                </div>
                <div>
                { 
                    filter === "QB" ?
                        rosters.qbRank.map((roster, i) => 
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
                                    <p className="m-0">{roster.kct.qb.total}</p>
                                </div>
                            </div>
                        </div>    
                        )  
                    :
                    filter === "RB" ?
                        rosters.rbRank.map((roster, idx) => 
                        <div key={idx}>
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
                                    <p className="m-0">{roster.kct.rb.total}</p>
                                </div>
                            </div>
                        </div>    
                        )  
                    :
                    filter === "WR" ?
                        rosters.wrRank.map((roster, j) => 
                        <div key={j}>
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
                                    <p className="m-0">{roster.kct.wr.total}</p>
                                </div>
                            </div>
                        </div>    
                        ) 
                    :
                    filter === "TE" ?
                        rosters.teRank.map((roster, k) => 
                        <div key={k}>
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
                                    <p className="m-0">{roster.kct.te.total}</p>
                                </div>
                            </div>
                        </div>    
                        ) 
                    :
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
            </div>
        }
        </>
    )
}
