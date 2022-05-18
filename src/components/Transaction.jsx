import React from 'react'

export default function Transaction(props) {
    const transactions = props.transactions
    const isLoading = props.isLoading

    return (
        <>
        {
            isLoading ? <p>Loading </p> :
                transactions.map((transaction, i) => 
                    <div key={i}>
                        {
                            // adds && drops
                            transaction.adds !== null && transaction.drops !== null?
                            <></>
                            :
                            // only drops
                            transaction.adds === null ? 
                            <></>
                            :
                            // only adds
                            transaction.drops === null ?
                            <></>
                            :
                            transaction.type === "trade" ?
                            <></>
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