import React from 'react'

export default function Transaction(props) {
    const transactions = props.transactions
    const isLoading = props.isLoading

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

    return (
        <>
        {
            isLoading ? <p>Loading </p> :
                transactions.map((transaction, i) => 
                    <div key={i}>
                        {
                            transaction.type === "trade" ?
                            <>
                            {
                                //adds 
                                Object.keys(transaction.adds).map((transactionID, i) => 
                                    <div key={i}>
                                        <p>Adds</p>
                                        <p>player: {findPlayer("adds", transaction.playerDB, transactionID).player}</p>
                                        <p>owner: {findOwner(transaction.adds[transactionID], transaction.roster_ids).display_name}</p>
                                    </div>
                                )
                            }                               
                            {/* {
                                //drops
                                Object.keys(transaction.drops).map(rosterID => rosterID)
                            } */}
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
        </>
    )
}