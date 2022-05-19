import React from 'react'

const MODAL_STYLES = {
    position: 'fixed',
    top: '40%',
    left: '50%',
    // width:'0rem',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    // background: 'linear-gradient(rgba(0,0,0,0.6),#FFF 30%)',
    backgroundColor: '#FFF',
    borderRadius:'4px',
    padding: '2rem',
    zIndex: 1
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex:1
}

export default function TradeModal(props) {
    if(!props.open) return null 
    const transaction = props.transaction

    let findPlayer = (activity, players, playerID) => {
        if(activity === "adds") {
            let foundPlayerKCT = players.adds.playersKCT.filter(player => player.player_id === playerID)
            let foundPlayer = players.adds.players.filter(player => player.player_id === playerID)
            if(foundPlayerKCT === [] || null){
                return foundPlayer[0]
            } else
            return foundPlayerKCT[0]
        }
    }

    let findOwner = (ownerID, owners) => {
        let foundOwner = owners.filter(owner => owner.roster_id === ownerID)
        return foundOwner[0]
    }

    var getInitials = function (name) {
        var splitName = name.split(" ");
        return splitName[0].charAt(0) + ". " + splitName[1]
    };

    return (
        <>
        {
            transaction !== {} ? 
            <div style={OVERLAY_STYLES}>
                <div style={MODAL_STYLES}>
                    <p className="m-0" onClick={props.onClose}>x</p>
                    <div className="d-flex align-items-center">
                    {
                        Object.keys(transaction.adds).map((transactionID, i) => 
                            <div key={i} className="p-2 mx-2">
                                <div className="container">
                                    <div
                                        className={
                                            findPlayer("adds", transaction.playerDB, transactionID).position === "QB" ? "smallHeadShotQB" :
                                            findPlayer("adds", transaction.playerDB, transactionID).position === "RB" ? "smallHeadShotRB" :
                                            findPlayer("adds", transaction.playerDB, transactionID).position === "WR" ? "smallHeadShotWR" :
                                            "smallHeadShotTE"
                                        }
                                        style={{
                                            backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                findPlayer("adds", transaction.playerDB, transactionID).player_id}.jpg)`,   
                                        }}>
                                        <div className="displayOwnerLogoSM">
                                            <img className="ownerLogo" alt="avatar" src={
                                                    `https://sleepercdn.com/avatars/thumbs/${
                                                        findOwner(transaction.adds[transactionID], transaction.roster_ids).avatar
                                                    }`
                                            }/>
                                        </div>    
                                    </div>
                                </div>
                                <div>
                                    <p className="bold m-0 text-center text-truncate"> {getInitials(findPlayer("adds", transaction.playerDB, transactionID).player)}</p>
                                    <p className="m-0 text-center" style={{fontSize:"12px"}}> {findPlayer("adds", transaction.playerDB, transactionID).rating}</p>      
                                </div>
                                <div>
                                    {
                                        transaction.draft_picks !== [] ?
                                            transaction.draft_picks.filter(picks => picks.owner_id === findOwner(transaction.adds[transactionID], transaction.roster_ids).roster_id)
                                            .map((transaction, i) => 
                                                <p key={i} className="m-0 text-center" style={{fontSize:"14px"}}>{transaction.season} {transaction.round}{
                                                    transaction.round === 1 ?
                                                    "st"
                                                    : transaction.round === 2 ? 
                                                    "nd"
                                                    : transaction.round === 3 ?
                                                    "rd" : "th"
                                                }</p>
                                            )
                                        :
                                        <></>
                                    }
                                </div>
                            </div>
                        )
                    }
                    </div> 
                </div>
            </div>
            :
            <>
            </>
        }
        </>
    )
}
