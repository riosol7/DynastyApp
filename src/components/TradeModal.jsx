import React from 'react'
// import { Icon } from '@iconify/react';

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
            
            if(foundPlayerKCT[0] === undefined || null){
                return foundPlayer[0]
            } else {return foundPlayerKCT[0]}
        
        } else if(activity === "drops") {
            let foundPlayerKCT = players.drops.playersKCT.filter(player => player.player_id === playerID)
            let foundPlayer = players.drops.players.filter(player => player.player_id === playerID)
        
            if(foundPlayerKCT[0] === undefined || null){
                return foundPlayer[0]
            } else {return foundPlayerKCT[0]}
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

    function toDateTime(secs) {
        var t = Number(secs);
        let dateObj = new Date(t);
        var month = dateObj.getUTCMonth() + 1;
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        return  month + "/" + day + "/" + year
    }


    return (
        <>
        {
            transaction !== {} ? 
            <div style={OVERLAY_STYLES}>
                <div style={MODAL_STYLES}>
                    <p className="m-0" onClick={props.onClose}>x</p>
                    <div className="container">
                        <p className="m-0" style={{fontSize:"14.9px"}}>Trade completed</p>
                        <p className="m-0" style={{fontSize:"12px"}}>{toDateTime(transaction.created)}</p>
                        <div className="">
                        {
                            transaction.roster_ids.map((roster, i) =>
                            <div key={i} className="my-4 p-2" style={{borderRadius:"5px", border: "1px solid black"}}>
                                <div className="d-flex align-items-center">
                                    <div style={{border:".5px solid black", borderRadius:"50%"}}>
                                        <img className="ownerLogo" alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                            roster.avatar}`
                                        }/>
                                    </div>
                                    <p className="m-0 mx-1">{roster.display_name}</p>
                                </div> 
                                <div className="d-flex my-2">
                                    <div>
                                        <p className="m-0 border-bottom" style={{fontSize:"12px"}}>receive</p>
                                    {
                                        Object.keys(transaction.adds).filter(i => transaction.adds[i] === roster.roster_id).map((transactionID, i) => 
                                        <div key={i} className="my-2">
                                            <div className="d-flex">
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
                                                </div>
                                                <div className="px-2">
                                                    <p className="bold m-0 truncate"> {getInitials(findPlayer("adds", transaction.playerDB, transactionID).player)}</p>
                                                    <p className="m-0" style={{fontSize:"12px"}}>{findPlayer("adds", transaction.playerDB, transactionID).position} - {findPlayer("adds", transaction.playerDB, transactionID).team}</p>
                                                    <p className="m-0" style={{fontSize:"12px"}}> {findPlayer("adds", transaction.playerDB, transactionID).rating}</p>      
                                                </div>
                                            </div>
                                            <div className="my-3">
                                            {
                                                transaction.draft_picks !== [] ?
                                                    transaction.draft_picks.filter(picks => picks.owner_id === findOwner(transaction.adds[transactionID], transaction.roster_ids).roster_id)
                                                    .map((transaction, i) => 
                                                        <p key={i} className="m-0" style={{fontSize:"14px"}}>{transaction.season} {transaction.round}{
                                                            transaction.round === 1 ?
                                                            "st"
                                                            : transaction.round === 2 ? 
                                                            "nd"
                                                            : transaction.round === 3 ?
                                                            "rd" : "th"
                                                        }</p>
                                                    )
                                                :<></>
                                            }
                                            </div>
                                        </div>
                                        )
                                    }
                                    </div>
                                    <div>
                                        <p className="m-0 border-bottom" style={{fontSize:"12px"}}>send</p>
                                    {
                                        Object.keys(transaction.drops).filter(i => transaction.drops[i] === roster.roster_id).map((transactionID, i) => 
                                        <div key={i} className="m-2">
                                            <div className="d-flex">
                                                <div
                                                    className={
                                                        findPlayer("drops", transaction.playerDB, transactionID).position === "QB" ? "smallHeadShotQB" :
                                                        findPlayer("drops", transaction.playerDB, transactionID).position === "RB" ? "smallHeadShotRB" :
                                                        findPlayer("drops", transaction.playerDB, transactionID).position === "WR" ? "smallHeadShotWR" :
                                                        "smallHeadShotTE"
                                                    }
                                                    style={{
                                                        backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                            findPlayer("drops", transaction.playerDB, transactionID).player_id}.jpg)`,   
                                                    }}>   
                                                </div>
                                                <div className="px-2">
                                                    <p className="bold m-0 truncate"> {getInitials(findPlayer("drops", transaction.playerDB, transactionID).player)}</p>
                                                    <p className="m-0" style={{fontSize:"12px"}}>{findPlayer("drops", transaction.playerDB, transactionID).position} - {findPlayer("drops", transaction.playerDB, transactionID).team}</p>
                                                    <p className="m-0" style={{fontSize:"12px"}}> {findPlayer("drops", transaction.playerDB, transactionID).rating}</p>      
                                                </div>
                                            </div>
                                            <div className="my-3">
                                            {
                                                transaction.draft_picks !== [] ?
                                                    transaction.draft_picks.filter(picks => picks.previous_owner_id === findOwner(transaction.drops[transactionID], transaction.roster_ids).roster_id)
                                                    .map((transaction, i) => 
                                                        <p key={i} className="m-0" style={{fontSize:"14px"}}>{transaction.season} {transaction.round}{
                                                            transaction.round === 1 ?
                                                            "st"
                                                            : transaction.round === 2 ? 
                                                            "nd"
                                                            : transaction.round === 3 ?
                                                            "rd" : "th"
                                                        }</p>
                                                    )
                                                :<></>
                                            }
                                            </div>
                                        </div>
                                        )
                                    }
                                    </div>
                                </div>
                            </div>
                            )
                        }
                        </div> 
                    </div>
                </div>
            </div>
            :<></>
        }
        </>
    )
}
