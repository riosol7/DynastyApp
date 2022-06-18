import React from 'react'
import { Icon } from '@iconify/react';

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    width:'45em',
    transform: 'translate(-50%, -50%)',
    background: "#1b2025",
    borderRadius:'4px',
    // padding: '2rem',
    zIndex: 5
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.6)',
    zIndex:5
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
    };
    // let findOwner = (ownerID, owners) => {
    //     console.log(ownerID)
    //     let foundOwner = owners.filter(owner => owner.roster_id === ownerID)
    //     // console.log(foundOwner[0])
    //     return foundOwner[0]
    // };
    // var getInitials = function (name) {
    //     var splitName = name.split(" ");
    //     return splitName[0].charAt(0) + ". " + splitName[1]
    // };

    // let test = transaction.roster_ids.map((roster, i) =>Object.keys(transaction.adds).filter(i => transaction.adds[i] === roster.roster_id).map((transactionID, i) =>  findPlayer("adds", transaction.playerDB, transactionID)))
    // console.log(test.map(t => t.reduce((prev,curr) => Number(prev.rating) + Number(curr.rating), 0)))
    
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
                    <div className="d-flex justify-content-between">
                        <div className="p-2">
                            <p className="m-0" style={{fontSize:"16px"}}>Trade completed</p>
                            <p className="m-0" style={{fontSize:"12px", color:"#b0b0b2"}}>{toDateTime(transaction.created)}</p>
                        </div>
                        <div className="py-1 px-2">
                            <Icon icon="octicon:x-circle-fill-24" style={{fontSize:"1em", color:"#f25b57"}}onClick={props.onClose}/>
                        </div>
                    </div>
                    <div className="container">
                        <div id="scrollBarActivity" style={{height:"100%", width:"100%", overflow:"auto"}}>
                        {
                            transaction.roster_ids.map((roster, i) =>
                            <div key={i} className="my-4 p-2" style={{borderRadius:"5px", border: "1px solid black"}}>
                                <div className="d-flex align-items-center">
                                    <div style={{border:"", borderRadius:"50%"}}>
                                        <img className="ownerLogo" alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                            roster.avatar}`
                                        }/>
                                    </div>
                                    <p className="m-0 mx-1">{roster.display_name}</p>
                                </div> 
                                <div className="d-flex my-2">
                                    <div className="col">
                                        <p className="m-0 border-bottom" style={{fontSize:"12px"}}>receive</p>
                                    {
                                        Object.keys(transaction.adds).filter(i => transaction.adds[i] === roster.roster_id).map((transactionID, i) => 
                                        <div key={i} className="my-3">
                                            <div className="d-flex">
                                                <div className={
                                                    findPlayer("adds", transaction.playerDB, transactionID).position === "QB" ? "smallHeadShotQB" :
                                                    findPlayer("adds", transaction.playerDB, transactionID).position === "RB" ? "smallHeadShotRB" :
                                                    findPlayer("adds", transaction.playerDB, transactionID).position === "WR" ? "smallHeadShotWR" : "smallHeadShotTE"
                                                } style={{ backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                    findPlayer("adds", transaction.playerDB, transactionID).player_id}.jpg)`,   
                                                }}>  
                                                    <div className="displayOwnerLogoSM">
                                                        <Icon icon="ph:user-circle-plus-duotone" style={
                                                        findPlayer("adds", transaction.playerDB, transactionID).position === "QB" ?  {fontSize:"1.7rem", backgroundColor:"whitesmoke", borderRadius:"50%", color:"#f8296d"} :
                                                        findPlayer("adds", transaction.playerDB, transactionID).position === "RB" ?  {fontSize:"1.7rem", backgroundColor:"whitesmoke", borderRadius:"50%", color:"#36ceb8"} :
                                                        findPlayer("adds", transaction.playerDB, transactionID).position === "WR" ?  {fontSize:"1.7rem", backgroundColor:"whitesmoke", borderRadius:"50%", color:"#58a7ff"} :
                                                        findPlayer("adds", transaction.playerDB, transactionID).position === "TE" ?  {fontSize:"1.7rem", backgroundColor:"whitesmoke", borderRadius:"50%", color:"#faae58"} :
                                                        findPlayer("adds", transaction.playerDB, transactionID).position === "K" ?  {fontSize:"1.7rem", backgroundColor:"whitesmoke", borderRadius:"50%", color:"#bd66ff"} : {
                                                            fontSize:"1.7rem", backgroundColor:"whitesmoke", borderRadius:"50%", color:"black"
                                                        }}/>
                                                    </div> 
                                                </div>
                                                <div className="px-4">
                                                    <p className="bold m-0 text-truncate"> {findPlayer("adds", transaction.playerDB, transactionID).player || findPlayer("adds", transaction.playerDB, transactionID).full_name}</p>
                                                    <p className="m-0" style={{fontSize:"11px", color:"#cbcbcb"}}>{findPlayer("adds", transaction.playerDB, transactionID).position} - {findPlayer("adds", transaction.playerDB, transactionID).team}</p>
                                                    <p className="m-0" style={{fontSize:"12px"}}> {findPlayer("adds", transaction.playerDB, transactionID).rating}</p>      
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    }
                                        <div className="my-3">
                                        {
                                            transaction.draft_picks !== [] ?
                                                transaction.draft_picks.filter(picks => picks.owner_id === roster.roster_id)
                                                .map((transaction, i) => 
                                                    <p key={i} className="m-0" style={{fontSize:"14px"}}>{transaction.season} {transaction.round}{
                                                        transaction.round === 1 ? "st" : 
                                                        transaction.round === 2 ? "nd" :
                                                        transaction.round === 3 ? "rd" : "th"
                                                    }</p>
                                                )
                                            :<></>
                                        }
                                        </div>
                                    </div>
                                    <div className="col">
                                        <p className="m-0 border-bottom" style={{fontSize:"12px"}}>send</p>
                                    {
                                        Object.keys(transaction.drops).filter(i => transaction.drops[i] === roster.roster_id).map((transactionID, i) => 
                                        <div key={i} className="my-3">
                                            <div className="d-flex">
                                                <div className={
                                                    findPlayer("drops", transaction.playerDB, transactionID).position === "QB" ? "smallHeadShotQB" :
                                                    findPlayer("drops", transaction.playerDB, transactionID).position === "RB" ? "smallHeadShotRB" :
                                                    findPlayer("drops", transaction.playerDB, transactionID).position === "WR" ? "smallHeadShotWR" : "smallHeadShotTE"
                                                } style={{ backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                    findPlayer("drops", transaction.playerDB, transactionID).player_id}.jpg)`,   
                                                }}>   
                                                <div className="displayOwnerLogoSM">
                                                    <Icon icon="ph:user-circle-minus-duotone" style={
                                                    findPlayer("drops", transaction.playerDB, transactionID).position === "QB" ?  {fontSize:"1.7rem", backgroundColor:"whitesmoke", borderRadius:"50%", color:"#f8296d"} :
                                                    findPlayer("drops", transaction.playerDB, transactionID).position === "RB" ?  {fontSize:"1.7rem", backgroundColor:"whitesmoke", borderRadius:"50%", color:"#36ceb8"} :
                                                    findPlayer("drops", transaction.playerDB, transactionID).position === "WR" ?  {fontSize:"1.7rem", backgroundColor:"whitesmoke", borderRadius:"50%", color:"#58a7ff"} :
                                                    findPlayer("drops", transaction.playerDB, transactionID).position === "TE" ?  {fontSize:"1.7rem", backgroundColor:"whitesmoke", borderRadius:"50%", color:"#faae58"} :
                                                    findPlayer("drops", transaction.playerDB, transactionID).position === "K" ?  {fontSize:"1.7rem", backgroundColor:"whitesmoke", borderRadius:"50%", color:"#bd66ff"} : {
                                                        fontSize:"1.7rem", backgroundColor:"whitesmoke", borderRadius:"50%", color:"black"
                                                    }}/>
                                                </div> 
                                                </div>
                                                <div className="px-4">
                                                    <p className="bold m-0 text-truncate"> {findPlayer("drops", transaction.playerDB, transactionID).player || findPlayer("drops", transaction.playerDB, transactionID).full_name}</p>
                                                    <p className="m-0" style={{fontSize:"11px", color:"#cbcbcb"}}>{findPlayer("drops", transaction.playerDB, transactionID).position} - {findPlayer("drops", transaction.playerDB, transactionID).team}</p>
                                                    <p className="m-0" style={{fontSize:"12px"}}> {findPlayer("drops", transaction.playerDB, transactionID).rating}</p>      
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    }
                                        <div className="my-3">
                                        {
                                            transaction.draft_picks !== [] ?
                                                transaction.draft_picks.filter(picks => picks.previous_owner_id === roster.roster_id)
                                                .map((transaction, i) => 
                                                    <p key={i} className="m-0" style={{fontSize:"14px"}}>{transaction.season} {transaction.round}{
                                                        transaction.round === 1 ? "st" : 
                                                        transaction.round === 2 ? "nd" :
                                                        transaction.round === 3 ? "rd" : "th"
                                                    }</p>
                                                )
                                            :<></>
                                        }
                                        </div>
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
