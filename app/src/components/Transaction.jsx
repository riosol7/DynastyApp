import React, {useState} from 'react'
import TradeModal from './TradeModal'
import { Icon } from '@iconify/react';
import {logos} from "../assets/logos";

export default function Transaction(props) {
    const transactions = props.transactions
    const loadTransactions = props.loadTransactions

    const [isOpen, setIsOpen] = useState(false)
    const [transaction, setTransaction] = useState({})

    let findLogo = (activity, DB) => {
        if(activity === "adds"){
            let foundTeam = DB.adds.players[0].team
            let foundLogo = logos.filter(logo => logo[foundTeam])
            return Object.values(foundLogo[0])[0]
        } else if (activity === "drops") {
            let foundTeam = DB.drops.players[0].team
            let foundLogo = logos.filter(logo => logo[foundTeam])
            return Object.values(foundLogo[0])[0]
        }
    }
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
        if(name !== undefined){
        var splitName = name.split(" ");
        return splitName[0].charAt(0) + ". " + splitName[1]
        }
    };
    function toDateTime(secs) {
        var t = Number(secs);
        let dateObj = new Date(t);
        var month = dateObj.getUTCMonth() + 1;
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        return  month + "/" + day + "/" + year
    }
    const transactionModal = (data) => {
        setTransaction(data)
        setIsOpen(true)
    }
    const closeModal = () => {
        setTransaction({})
        setIsOpen(false)
    }
    function getKeyByValue(object, value, players) {
        let playerID = Object.keys(object).find(key => object[key] === value);
        let foundPlayerKCT = players.adds.playersKCT.filter(player => player.player_id === playerID)
        let foundPlayer = players.adds.players.filter(player => player.player_id === playerID)
        if(foundPlayerKCT[0] === undefined || null){
            return foundPlayer[0]
        } else {return foundPlayerKCT[0]}
    }
    return (
        <>
        {   loadTransactions ? <p>Loading </p> :
                transactions.map((transaction, i) => 
                    <div key={i} className="my-2">
                    { transaction.type === "trade" ?
                        <div className="">
                            <div className="container">
                                <p className="m-0" style={{fontSize:"12px"}}>Trade completed</p>
                                <p className="m-0 pb-2" style={{fontSize:"11px", color:"#b0b0b2"}}>{toDateTime(transaction.created)}</p>
                            </div>
                            <div className="d-flex align-items-center container">
                            { 
                                Object.keys(transaction.adds).length > 2 ?
                                transaction.roster_ids.map((roster,idx) =>
                                <div key={idx} className={idx === 1? "mx-4 pb-2": "pb-2"}>
                                     <div className="container">
                                        <div className={
                                            getKeyByValue(transaction.adds ,roster.roster_id, transaction.playerDB).position === "QB" ? "smallHeadShotQB" :
                                            getKeyByValue(transaction.adds ,roster.roster_id, transaction.playerDB).position === "RB" ? "smallHeadShotRB" :
                                            getKeyByValue(transaction.adds ,roster.roster_id, transaction.playerDB).position === "WR" ? "smallHeadShotWR" :
                                            getKeyByValue(transaction.adds ,roster.roster_id, transaction.playerDB).position === "TE" ? "smallHeadShotTE" : 
                                            getKeyByValue(transaction.adds ,roster.roster_id, transaction.playerDB).position === "K" ? "smallHeadShotK" : "smallHeadShot"
                                        } style={{ backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                            getKeyByValue(transaction.adds ,roster.roster_id, transaction.playerDB).player_id}.jpg)`,   
                                        }}>
                                            <div className="displayOwnerLogoSM">
                                                <img className="ownerLogo" alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                    roster.avatar}`
                                                }/>
                                            </div>    
                                        </div>
                                    </div>
                                    <div>
                                        <p className="bold m-0 text-center truncate" style={{fontSize:"14px"}}> {getInitials(getKeyByValue(transaction.adds ,roster.roster_id, transaction.playerDB).player)}</p>
                                        <p className="m-0 text-center" style={{fontSize:"10px", color:"#cbcbcb"}}>{getKeyByValue(transaction.adds ,roster.roster_id, transaction.playerDB).position} - {getKeyByValue(transaction.adds ,roster.roster_id, transaction.playerDB).team}</p>      
                                        <p className="m-0 d-flex align-items-center justify-content-center" style={{fontSize:"12px"}}>
                                            <Icon icon="fluent:tag-32-regular" style={{marginRight:"2px"}}/>
                                            {getKeyByValue(transaction.adds ,roster.roster_id, transaction.playerDB).rating}</p>      
                                    </div>
                                    <div>
                                    {
                                        Object.keys(transaction.adds).filter(i => transaction.adds[i] === roster.roster_id).length > 1?
                                            <p style ={{fontSize:".8rem"}} className="m-0 text-center">+{ 
                                            Object.keys(transaction.adds).filter(i => transaction.adds[i] === roster.roster_id).length + transaction.draft_picks.filter(picks => picks.owner_id === roster.roster_id).length - 1
                                            } assets
                                            </p>
                                        : <></>
                                    }
                                    </div>
                                </div>
                                )
                                : Object.keys(transaction.adds).map((transactionID, idx) => 
                                <div key={idx} className={idx === 1 ? "mx-4 pb-2":"pb-2"}>
                                    <div className="container">
                                        <div className={
                                                findPlayer("adds", transaction.playerDB, transactionID).position === "QB" ? "smallHeadShotQB" :
                                                findPlayer("adds", transaction.playerDB, transactionID).position === "RB" ? "smallHeadShotRB" :
                                                findPlayer("adds", transaction.playerDB, transactionID).position === "WR" ? "smallHeadShotWR" :
                                                findPlayer("adds", transaction.playerDB, transactionID).position === "TE" ? "smallHeadShotTE" : 
                                                findPlayer("adds", transaction.playerDB, transactionID).position === "K" ? "smallHeadShotK" : "smallHeadShot"
                                            } style={{
                                                backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                    findPlayer("adds", transaction.playerDB, transactionID).player_id}.jpg)`,   
                                            }}>
                                            <div className="displayOwnerLogoSM">
                                                <img className="ownerLogo" alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                    findOwner(transaction.adds[transactionID], transaction.roster_ids).avatar}`
                                                }/>
                                            </div>    
                                        </div>
                                    </div>
                                    <div>
                                        <p className="bold m-0 text-center truncate" style={{fontSize:"14px"}}> {getInitials(findPlayer("adds", transaction.playerDB, transactionID).player)}</p>
                                        <p className="m-0 text-center" style={{fontSize:"10px",color:"#cbcbcb"}}>{findPlayer("adds", transaction.playerDB, transactionID).position} - {findPlayer("adds", transaction.playerDB, transactionID).team || "FA"}</p>
                                        <p className="m-0 d-flex justify-content-center align-items-center" style={{fontSize:"12px"}}> 
                                        <Icon icon="fluent:tag-32-regular" style={{marginRight:"2px"}}/>
                                        {findPlayer("adds", transaction.playerDB, transactionID).rating}</p>      
                                    </div>
                                    <div>
                                    { transaction.draft_picks !== [] ?
                                        transaction.draft_picks.filter(picks => picks.owner_id === findOwner(transaction.adds[transactionID], transaction.roster_ids).roster_id)
                                        .map((transaction, i) => 
                                            <p key={i} className="m-0 text-center" style={{fontSize:"14px"}}>{transaction.season} {transaction.round}{
                                                transaction.round === 1 ? "st" : 
                                                transaction.round === 2 ? "nd" : 
                                                transaction.round === 3 ? "rd" : "th"
                                            }</p>
                                        ):<></>
                                    }
                                    </div>
                                </div>
                                )
                            }
                            </div> 
                            <div className="d-flex justify-content-start container">
                                <button id="tradeBtn" onClick={() => transactionModal(transaction)}>
                                    <p className="m-0">view trade</p>
                                </button>
                            </div>
                            <div className="tradeIcon">
                                <Icon style={{fontSize:"1.8rem", marginRight:"1.8rem"}} icon="gg:arrows-exchange"/>
                            </div>
                        </div>
                        :
                        // adds && drops via waiver/commissioner/free agent
                        transaction.adds !== null && transaction.drops !== null && transaction.type !== "trade"?
                        <div className="container">
                        { transaction.type === "commissioner" ?
                            <p className="m-0" style={{fontSize:"14px"}}>Commissioner made a move</p> 
                        :
                        <div className="d-flex align-items-center">
                            <div className="">
                                <img style={{width:"22px"}}className="ownerLogo" alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                    findOwner(transaction.roster_ids[0].roster_id, transaction.roster_ids).avatar}`
                                }/>
                            </div>
                            <p className="m-0 mx-1 text-truncate" style={{fontSize:"14px"}}>{transaction.creator}<span style={{color:"#cbcbcb"}}> made a move</span></p> 
                        </div>
                        }
                            <div className="d-flex align-items-center py-3">
                            { Object.keys(transaction.adds).map((transactionID, i) => 
                                <div key={i} className="">
                                    <div>
                                        <div className="d-flex justify-content-center">
                                            <div
                                                className={
                                                    findPlayer("adds", transaction.playerDB, transactionID).position === "QB" ? "smallHeadShotQB" :
                                                    findPlayer("adds", transaction.playerDB, transactionID).position === "RB" ? "smallHeadShotRB" :
                                                    findPlayer("adds", transaction.playerDB, transactionID).position === "WR" ? "smallHeadShotWR" :
                                                    findPlayer("adds", transaction.playerDB, transactionID).position === "TE" ? "smallHeadShotTE" : 
                                                    findPlayer("adds", transaction.playerDB, transactionID).position === "K" ? "smallHeadShotK" : "smallHeadShot"
                                                }
                                                style={ transaction.playerDB.adds.players[0].position === "DEF" ? 
                                                    {backgroundImage: `url(${findLogo("adds", transaction.playerDB)})`, backgroundSize:"100%"}:
                                                    {backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${findPlayer("adds", transaction.playerDB, transactionID).player_id}.jpg)`}
                                            }>
                                            {
                                                transaction.type === "commissioner" ?
                                                <div className="displayOwnerLogoSM">
                                                    <img className="ownerLogo" alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                        findOwner(transaction.adds[transactionID], transaction.roster_ids).avatar}`
                                                    }/>
                                                </div> 
                                                :
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
                                            }   
                                            </div>
                                        </div>
                                        <div>
                                            <p className="bold m-0 text-center truncate text-center" style={{fontSize:"14px"}}> {getInitials(findPlayer("adds", transaction.playerDB, transactionID).player || findPlayer("adds", transaction.playerDB, transactionID).full_name)}</p>
                                            <p className="m-0 text-center" style={{fontSize:"10px",color:"#cbcbcb"}}>{findPlayer("adds", transaction.playerDB, transactionID).position} - {findPlayer("adds", transaction.playerDB, transactionID).team || "FA"}</p>
                                            <p className="m-0 d-flex align-items-center justify-content-center" style={{fontSize:"12px"}}>
                                            <Icon icon="fluent:tag-32-regular" style={{marginRight:"2px"}}/>
                                            {findPlayer("adds", transaction.playerDB, transactionID).rating || 0}</p>  
                                        </div>
                                    </div>
                                </div>
                                )
                            }
                            { Object.keys(transaction.drops).map((transactionID, i) => 
                                <div key={i} className="mx-4">
                                    <div>
                                        <div className="d-flex justify-content-center">
                                            <div
                                                className={
                                                    findPlayer("drops", transaction.playerDB, transactionID).position === "QB" ? "smallHeadShotQB" :
                                                    findPlayer("drops", transaction.playerDB, transactionID).position === "RB" ? "smallHeadShotRB" :
                                                    findPlayer("drops", transaction.playerDB, transactionID).position === "WR" ? "smallHeadShotWR" :
                                                    findPlayer("drops", transaction.playerDB, transactionID).position === "TE" ? "smallHeadShotTE" :
                                                    findPlayer("drops", transaction.playerDB, transactionID).position === "K" ? "smallHeadShotK" : "smallHeadShot"
                                                }
                                                style={ transaction.playerDB.drops.players[0].position === "DEF" ? 
                                                    {backgroundImage: `url(${findLogo("drops", transaction.playerDB)})`, backgroundSize:"100%"}:
                                                    {backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${findPlayer("drops", transaction.playerDB, transactionID).player_id}.jpg)`}
                                            }>
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
                                        </div>
                                        <div>
                                            <p className="bold m-0 text-center truncate text-center" style={{fontSize:"14px"}}> {getInitials(findPlayer("drops", transaction.playerDB, transactionID).player || findPlayer("drops", transaction.playerDB, transactionID).full_name)}</p>
                                            <p className="m-0 text-center" style={{fontSize:"10px",color:"#cbcbcb"}}>{findPlayer("drops", transaction.playerDB, transactionID).position} - {findPlayer("drops", transaction.playerDB, transactionID).team || "FA"}</p>
                                            <p className="m-0 text-center" style={{fontSize:"12px"}}>
                                            <Icon icon="fluent:tag-32-regular" style={{marginRight:"2px"}}/>
                                            {findPlayer("drops", transaction.playerDB, transactionID).rating || 0}</p>  
                                        </div>
                                    </div>
                                </div>
                            )}
                            </div>
                        </div>
                        :
                        // only drops - FA / commissioner 
                        transaction.adds === null ?    
                        Object.keys(transaction.drops).map((transactionID, i) =>
                        <div key={i} className="container">
                        { transaction.type === "commissioner" ?
                            <p className="m-0" style={{fontSize:"14px"}}>Commissioner released FA</p> 
                        :
                            <div className="d-flex align-items-center">
                                <div className="">
                                    <img style={{width:"22px"}}className="ownerLogo" alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                        findOwner(transaction.drops[transactionID], transaction.roster_ids).avatar}`
                                    }/>
                                </div>
                                <p className="m-0 mx-1 text-truncate" style={{fontSize:"14px"}}>{transaction.creator}<span style={{color:"#cbcbcb"}}> released FA</span></p> 
                            </div>                        
                        }
                            <div className="container d-flex p-2 py-3">
                                <div className={
                                    findPlayer("drops", transaction.playerDB, transactionID).position === "QB" ? "smallHeadShotQB" :
                                    findPlayer("drops", transaction.playerDB, transactionID).position === "RB" ? "smallHeadShotRB" :
                                    findPlayer("drops", transaction.playerDB, transactionID).position === "WR" ? "smallHeadShotWR" :
                                    findPlayer("drops", transaction.playerDB, transactionID).position === "TE" ? "smallHeadShotTE" :
                                    findPlayer("drops", transaction.playerDB, transactionID).position === "K" ? "smallHeadShotK" : "smallHeadShot"
                                } style={ transaction.playerDB.drops.players[0].position === "DEF" ? 
                                    {backgroundImage: `url(${findLogo("drops", transaction.playerDB)})`, backgroundSize:"100%"}:
                                    {backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${findPlayer("drops", transaction.playerDB, transactionID).player_id}.jpg)`}
                                }>
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
                                    <p className="m-0 bold text-center" style={{fontSize:"14px"}}>{getInitials(findPlayer("drops", transaction.playerDB, transactionID).player || findPlayer("drops", transaction.playerDB, transactionID).full_name)}</p>
                                    <p className="m-0" style={{fontSize:"10px",color:"#cbcbcb"}}>{findPlayer("drops", transaction.playerDB, transactionID).position} - {findPlayer("drops", transaction.playerDB, transactionID).team}</p>
                                    <p className="m-0 d-flex align-items-center" style={{fontSize:"12px"}}>
                                        <Icon icon="mdi:tag-minus" style={{marginRight:"2px"}}/>
                                        {findPlayer("drops", transaction.playerDB, transactionID).rating || 0}</p>
                                </div>  
                            </div>
                        </div>
                        )
                        :
                        // only adds FA / commissioner 
                        transaction.drops === null ?
                        Object.keys(transaction.adds).map((transactionID, i) =>
                        <div key={i} className="container">
                        { transaction.type === "commissioner" ?
                            <p className="m-0" style={{fontSize:"14px"}}>Commissioner signed</p> 
                        :
                            <div className="d-flex align-items-center">
                                <div className="">
                                    <img style={{width:"22px"}}className="ownerLogo" alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                        findOwner(transaction.adds[transactionID], transaction.roster_ids).avatar}`
                                    }/>
                                </div>
                                <p className="m-0 mx-1 text-truncate" style={{fontSize:"14px"}}>{transaction.creator} <span style={{color:"#cbcbcb"}}>signed</span></p> 
                            </div>  
                        }
                            <div className="container d-flex p-2 py-3">
                                <div className={
                                    findPlayer("adds", transaction.playerDB, transactionID).position === "QB" ? "smallHeadShotQB" :
                                    findPlayer("adds", transaction.playerDB, transactionID).position === "RB" ? "smallHeadShotRB" :
                                    findPlayer("adds", transaction.playerDB, transactionID).position === "WR" ? "smallHeadShotWR" :
                                    findPlayer("adds", transaction.playerDB, transactionID).position === "TE" ? "smallHeadShotTE" : 
                                    findPlayer("adds", transaction.playerDB, transactionID).position === "K" ? "smallHeadShotK" : "smallHeadShot"
                                } style={ transaction.playerDB.adds.players[0].position === "DEF" ? 
                                    {backgroundImage: `url(${findLogo("adds", transaction.playerDB)})`, backgroundSize:"100%"}:
                                    {backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${findPlayer("adds", transaction.playerDB, transactionID).player_id}.jpg)`}
                                }>
                                { transaction.type === "commissioner" ?
                                    <div className="displayOwnerLogoSM">
                                        <img className="ownerLogo" alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                            findOwner(transaction.adds[transactionID], transaction.roster_ids).avatar}`
                                        }/>
                                    </div>  
                                :
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
                                }  
                                </div>
                                <div className="px-4">
                                    <p className="m-0 bold text-center" style={{fontSize:"14px"}}>{getInitials(findPlayer("adds", transaction.playerDB, transactionID).player || findPlayer("adds", transaction.playerDB, transactionID).full_name)}</p>
                                    <p className="m-0" style={{fontSize:"10px",color:"#cbcbcb"}}>{findPlayer("adds", transaction.playerDB, transactionID).position} - {findPlayer("adds", transaction.playerDB, transactionID).team}</p>
                                    <p className="m-0 d-flex align-items-center" style={{fontSize:"12px"}}>
                                        <Icon icon="mdi:tag-plus" style={{marginRight:"2px"}}/>
                                        {findPlayer("adds", transaction.playerDB, transactionID).rating || 0}</p>
                                </div>  
                            </div>
                        </div>
                        ): <></>
                    }
                    </div>
                )
        }
        <TradeModal
            open={isOpen}
            onClose={() => closeModal()}
            transaction={transaction}
        />
        </>
    )
}