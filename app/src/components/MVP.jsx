import React from 'react';

export default function MVP(props) {
    const rosters = props.rosters
    const loadRosters = props.loadRosters

    function getMVP(display_name){
        let foundTeam = rosters.teamRank.find(roster => roster.kct.owner.display_name === display_name)
        let topPlayers = [
            foundTeam.kct.qb.players[0],
            foundTeam.kct.rb.players[0],
            foundTeam.kct.wr.players[0],
            foundTeam.kct.te.players[0]
        ]
        let topPlayer = topPlayers.reduce((prev, current) => {
            return (prev.rating > current.rating) ? prev : current
        })
        return topPlayer
    }

    var getInitials = function (name) {
        var splitName = name.split(" ");
        return splitName[0].charAt(0) + ". " + splitName[1]
    };


    return (
        <>
        {
            loadRosters ? <p>Loading </p> :
                <div className="d-flex">
                    {rosters.teamRank.map((roster, i) => 
                        <div key={i} className={"mx-2"}>
                            <div className="">
                                <div className="displayOwnerLogo">
                                    <img className="ownerLogo" alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                        roster.kct.owner.avatar}`}/>
                                </div> 
                                <div className="">
                                    <div
                                        className="headShot" 
                                        style={{
                                            backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                getMVP(roster.kct.owner.display_name).player_id}.jpg)`,
                                        }}>
                                            <div className="backgroundShot"></div>
                                    </div> 
                                    <div className="displayHUD">
                                        <span 
                                            className={
                                                getMVP(roster.kct.owner.display_name).position === "QB" ? "qbHUD" :
                                                getMVP(roster.kct.owner.display_name).position === "RB" ? "rbHUD" :
                                                getMVP(roster.kct.owner.display_name).position === "WR" ? "wrHUD" :
                                                "teHUD"
                                            }>
                                                {getMVP(roster.kct.owner.display_name).position}
                                        </span>
                                    </div>
                                    <p className="bold m-0 text-center">{getInitials(getMVP(roster.kct.owner.display_name).player)}</p>
                                    <p className="m-0 text-center">{getMVP(roster.kct.owner.display_name).rating}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    </div>
        }
        </>
    )
}
