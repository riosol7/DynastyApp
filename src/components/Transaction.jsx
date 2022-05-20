import React, {useState} from 'react'
import TradeModal from './TradeModal'
import { Icon } from '@iconify/react';

export default function Transaction(props) {
    const transactions = props.transactions
    const loadTransactions = props.loadTransactions

    const [isOpen, setIsOpen] = useState(false)
    const [transaction, setTransaction] = useState({})

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

    return (
        <>
        {
            loadTransactions ? <p>Loading </p> :
                transactions.map((transaction, i) => 
                    <div key={i} className="my-2">
                    {
                        transaction.type === "trade" ?
                        <div className="container">
                            <p className="m-0" style={{fontSize:"14.9px"}}>Trade completed</p>
                            <p className="m-0 pb-2" style={{fontSize:"12px"}}>{toDateTime(transaction.created)}</p>
                            <div className="d-flex align-items-center">
                            {
                                Object.keys(transaction.adds).map((transactionID, i) => 
                                <div key={i} className={i === 1? "mx-4 pb-2": "pb-2"}>
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
                                                <img className="ownerLogo" alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                    findOwner(transaction.adds[transactionID], transaction.roster_ids).avatar}`
                                                }/>
                                            </div>    
                                        </div>
                                    </div>
                                    <div>
                                        <p className="bold m-0 text-center truncate"> {getInitials(findPlayer("adds", transaction.playerDB, transactionID).player)}</p>
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
                            <div className="d-flex justify-content-start">
                                <button
                                    onClick={() => transactionModal(transaction)}
                                    style={{
                                        width:"195px",
                                        borderRadius:"25px",
                                        paddingTop:".5rem",
                                        paddingBottom:'.5rem',
                                        paddingLeft: "14px",
                                        paddingRight: "14px",
                                        border:"1px solid black"
                                    }}
                                >
                                    <p className="m-0">view trade</p>
                                </button>
                            </div>
                            <div className="tradeIcon">
                                <Icon style={{fontSize:"1.8rem", marginRight:"1.9rem"}} icon="gg:arrows-exchange"/>
                            </div>
                        </div>
                        :
                        // adds && drops via waiver/commissioner/free agent
                        transaction.adds !== null && transaction.drops !== null && transaction.type !== "trade"?
                        <div className="container">
                        {
                            transaction.type === "commissioner" ?
                            <p className="m-0" style={{fontSize:"14.9px"}}>Commissioner made a move</p> 
                            :
                            <p className="m-0" style={{fontSize:"14.9px"}}>{transaction.creator} made a move</p> 
                        }
                            <div className="d-flex align-items-center">
                            {
                                Object.keys(transaction.adds).map((transactionID, i) => 
                                <div key={i} className="py-2">
                                    <div>
                                        <div className="d-flex justify-content-center">
                                            <div
                                                className={
                                                    findPlayer("adds", transaction.playerDB, transactionID).position === "QB" ? "smallHeadShotQB" :
                                                    findPlayer("adds", transaction.playerDB, transactionID).position === "RB" ? "smallHeadShotRB" :
                                                    findPlayer("adds", transaction.playerDB, transactionID).position === "WR" ? "smallHeadShotWR" : "smallHeadShotTE"
                                                }
                                                style={{
                                                    backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                        findPlayer("adds", transaction.playerDB, transactionID).player_id}.jpg)`,   
                                                }}>
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
                                                    findPlayer("adds", transaction.playerDB, transactionID).position === "TE" ?  {fontSize:"1.7rem", backgroundColor:"whitesmoke", borderRadius:"50%", color:"#faae58"} :{
                                                        fontSize:"1.7rem", backgroundColor:"whitesmoke", borderRadius:"50%", color:"black"
                                                    }}/>
                                                </div>
                                            }   
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <p className="bold m-0 text-center truncate text-center"> {getInitials(findPlayer("adds", transaction.playerDB, transactionID).player || findPlayer("adds", transaction.playerDB, transactionID).full_name)}</p>
                                                <p className="m-0 text-center" style={{fontSize:"12px"}}> {findPlayer("adds", transaction.playerDB, transactionID).rating || 0} </p>      
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )
                            }
                            {
                                Object.keys(transaction.drops).map((transactionID, i) => 
                                <div key={i} className="py-2 mx-4">
                                    <div>
                                        <div className="d-flex justify-content-center">
                                            <div
                                                className={
                                                    findPlayer("drops", transaction.playerDB, transactionID).position === "QB" ? "smallHeadShotQB" :
                                                    findPlayer("drops", transaction.playerDB, transactionID).position === "RB" ? "smallHeadShotRB" :
                                                    findPlayer("drops", transaction.playerDB, transactionID).position === "WR" ? "smallHeadShotWR" : "smallHeadShotTE"
                                                }
                                                style={{
                                                    backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                        findPlayer("drops", transaction.playerDB, transactionID).player_id}.jpg)`,   
                                                }}>
                                               <div className="displayOwnerLogoSM">
                                                    <Icon icon="ph:user-circle-minus-duotone" style={
                                                    findPlayer("drops", transaction.playerDB, transactionID).position === "QB" ?  {fontSize:"1.7rem", backgroundColor:"whitesmoke", borderRadius:"50%", color:"#f8296d"} :
                                                    findPlayer("drops", transaction.playerDB, transactionID).position === "RB" ?  {fontSize:"1.7rem", backgroundColor:"whitesmoke", borderRadius:"50%", color:"#36ceb8"} :
                                                    findPlayer("drops", transaction.playerDB, transactionID).position === "WR" ?  {fontSize:"1.7rem", backgroundColor:"whitesmoke", borderRadius:"50%", color:"#58a7ff"} :
                                                    findPlayer("drops", transaction.playerDB, transactionID).position === "TE" ?  {fontSize:"1.7rem", backgroundColor:"whitesmoke", borderRadius:"50%", color:"#faae58"} :{
                                                        fontSize:"1.7rem", backgroundColor:"whitesmoke", borderRadius:"50%", color:"black"
                                                    }}/>
                                                </div>    
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <p className="bold m-0 text-center truncate text-center"> {getInitials(findPlayer("drops", transaction.playerDB, transactionID).player || findPlayer("drops", transaction.playerDB, transactionID).full_name)}</p>
                                                <p className="m-0 text-center" style={{fontSize:"12px"}}> {findPlayer("drops", transaction.playerDB, transactionID).rating || 0}</p>      
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )
                            }
                            </div>
                        </div>
                        :
                        // only drops - FA / commissioner 
                        transaction.adds === null ?    
                        Object.keys(transaction.drops).map((transactionID, i) =>
                        <div key={i} className="container mx-1">
                        {
                            transaction.type === "commissioner" ?
                            <p className="m-0" style={{fontSize:"14.9px"}}>Commissioner released FA</p> 
                            :
                            <p className="m-0" style={{fontSize:"14.9px"}}>{findOwner(transaction.drops[transactionID], transaction.roster_ids).metadata ? 
                                findOwner(transaction.drops[transactionID], transaction.roster_ids).metadata.team_name : findOwner(transaction.drops[transactionID], transaction.roster_ids).display_name} released FA
                            </p> 
                        }
                            <div className="container d-flex p-2">
                                <div className={
                                    findPlayer("drops", transaction.playerDB, transactionID).position === "QB" ? "smallHeadShotQB" :
                                    findPlayer("drops", transaction.playerDB, transactionID).position === "RB" ? "smallHeadShotRB" :
                                    findPlayer("drops", transaction.playerDB, transactionID).position === "WR" ? "smallHeadShotWR" :
                                    findPlayer("drops", transaction.playerDB, transactionID).position === "TE" ? "smallHeadShotTE" : "smallHeadShot"
                                } style={{ backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                        findPlayer("drops", transaction.playerDB, transactionID).player_id}.jpg)`,
                                }}>
                                    <div className="displayOwnerLogoSM">
                                        <Icon icon="ph:user-circle-minus-duotone" style={
                                        findPlayer("drops", transaction.playerDB, transactionID).position === "QB" ?  {fontSize:"1.7rem", backgroundColor:"whitesmoke", borderRadius:"50%", color:"#f8296d"} :
                                        findPlayer("drops", transaction.playerDB, transactionID).position === "RB" ?  {fontSize:"1.7rem", backgroundColor:"whitesmoke", borderRadius:"50%", color:"#36ceb8"} :
                                        findPlayer("drops", transaction.playerDB, transactionID).position === "WR" ?  {fontSize:"1.7rem", backgroundColor:"whitesmoke", borderRadius:"50%", color:"#58a7ff"} :
                                        findPlayer("drops", transaction.playerDB, transactionID).position === "TE" ?  {fontSize:"1.7rem", backgroundColor:"whitesmoke", borderRadius:"50%", color:"#faae58"} :{
                                            fontSize:"1.7rem", backgroundColor:"whitesmoke", borderRadius:"50%", color:"black"
                                        }}/>
                                    </div>  
                                </div>
                                <div className="px-4">
                                    <p className="m-0 bold text-center">{getInitials(findPlayer("drops", transaction.playerDB, transactionID).player || findPlayer("drops", transaction.playerDB, transactionID).full_name)}</p>
                                    <p className="m-0" style={{fontSize:"12px"}}>{findPlayer("drops", transaction.playerDB, transactionID).position} - {findPlayer("drops", transaction.playerDB, transactionID).team}</p>
                                    <p className="m-0" style={{fontSize:"12px"}}>{findPlayer("drops", transaction.playerDB, transactionID).rating || 0}</p>
                                </div>  
                            </div>
                        </div>
                        )
                        :
                        // only adds FA / commissioner 
                        transaction.drops === null ?
                        Object.keys(transaction.adds).map((transactionID, i) =>
                        <div key={i} className="container">
                            {
                                transaction.type === "commissioner" ?
                                <p className="m-0" style={{fontSize:"14.9px"}}>Commissioner signed</p> 
                                :
                                <p className="m-0" style={{fontSize:"14.9px"}}>{findOwner(transaction.adds[transactionID], transaction.roster_ids).metadata ? 
                                    findOwner(transaction.adds[transactionID], transaction.roster_ids).metadata.team_name : findOwner(transaction.adds[transactionID], transaction.roster_ids).display_name} signed
                                </p> 
                            }
                            <div className="container d-flex p-2 mx-1">
                                <div className={
                                    findPlayer("adds", transaction.playerDB, transactionID).position === "QB" ? "smallHeadShotQB" :
                                    findPlayer("adds", transaction.playerDB, transactionID).position === "RB" ? "smallHeadShotRB" :
                                    findPlayer("adds", transaction.playerDB, transactionID).position === "WR" ? "smallHeadShotWR" :
                                    findPlayer("adds", transaction.playerDB, transactionID).position === "TE" ? "smallHeadShotTE" : "smallHeadShot"
                                } style={{ backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                        findPlayer("adds", transaction.playerDB, transactionID).player_id}.jpg)`,
                                }}>
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
                                        findPlayer("adds", transaction.playerDB, transactionID).position === "TE" ?  {fontSize:"1.7rem", backgroundColor:"whitesmoke", borderRadius:"50%", color:"#faae58"} :{
                                            fontSize:"1.7rem", backgroundColor:"whitesmoke", borderRadius:"50%", color:"black"
                                        }}/>
                                    </div>
                                }  
                                </div>
                                <div className="px-4">
                                    <p className="m-0 bold text-center">{getInitials(findPlayer("adds", transaction.playerDB, transactionID).player || findPlayer("adds", transaction.playerDB, transactionID).full_name)}</p>
                                    <p className="m-0" style={{fontSize:"12px"}}>{findPlayer("adds", transaction.playerDB, transactionID).position} - {findPlayer("adds", transaction.playerDB, transactionID).team}</p>
                                    <p className="m-0" style={{fontSize:"12px"}}>{findPlayer("adds", transaction.playerDB, transactionID).rating}</p>
                                </div>  
                            </div>
                        </div>
                        )
                        :
                        <>
                        </>
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