import React, {useState} from 'react'
import TradeModal from './TradeModal'

export default function Transaction(props) {
    const transactions = props.transactions
    const isLoading = props.isLoading

    const [isOpen, setIsOpen] = useState(false)
    const [transaction, setTransaction] = useState({})

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
            isLoading ? <p>Loading </p> :
                transactions.map((transaction, i) => 
                    <div key={i}>
                    {
                        transaction.type === "trade" ?
                        <>
                            <p className="m-0">trade {toDateTime(transaction.created)}</p>
                            <p className="m-0 tradeIcon">icon</p>    
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
                            <div className="d-flex justify-content-center">
                                <button
                                    onClick={() => transactionModal(transaction)}
                                    style={{
                                        width:"85%",
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
                        </>
                        :
                        // adds && drops via waiver/commissioner/free agent
                        transaction.adds !== null && transaction.drops !== null && transaction.type !== "trade"?
                        <>
                            {/* <p>test</p> */}
                        </>
                        :
                        // only drops
                        transaction.adds === null ? 
                        <>
                        
                        </>
                        :
                        // only adds
                        transaction.drops === null ?
                        <>
                        
                        </>
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
            // findOwner={() => findOwner()}
            // findPlayer={() => findPlayer()}
            // getInitials={() => getInitials()}
        />
        </>
    )
}