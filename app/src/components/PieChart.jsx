import React from 'react';
import Chart from 'react-apexcharts';

export default function PieChart(props) {
    const transactions = props.transactions
    const loadTransactions = props.loadTransactions
    const series = [
        transactions.filter(transaction => transaction.type === "trade").length, 
        transactions.filter(transaction => transaction.type === "waiver").length,
        transactions.filter(transaction => transaction.type === "free_agent").length,
    ]
    const options = {
        chart:{
            foreColor: 'white',
            toolbar: {
                show: false
            },
        },
        colors:["#ee6e95","#57c8b6","#59c3ed"],
        dataLabels: {
            enabled: true
        },
        fill: {
            type: 'dark',
        },  
        labels: ['Trade', 'Waiver', 'Free Agent'],
        legend:true,
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 270,
                donut:{
                    labels:{
                        show:true,
                        total: {
                            color:"#a9dfd8",
                            show: true,
                            label: 'Total',
                            formatter: function (w) {
                                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                                return transactions.filter(transaction => transaction.type === "trade").length +
                                transactions.filter(transaction => transaction.type === "waiver").length +
                                transactions.filter(transaction => transaction.type === "free_agent").length 
                            }
                        }
                    }
                }
            },
           
        },
        // plotOptions: {
        //     radialBar: {
        //         dataLabels: {
        //             name: {
        //                 fontSize: '22px',
        //             },
        //             value: {
        //                 fontSize: '16px',
        //             },
        //             total: {
        //                 show: true,
        //                 label: 'Total',
        //                 formatter: function (w) {
        //                     // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
        //                     return transactions.filter(transaction => transaction.type === "trade").length +
        //                     transactions.filter(transaction => transaction.type === "waiver").length +
        //                     transactions.filter(transaction => transaction.type === "free_agent").length 
        //                 }
        //             }
        //         }
        //     }
        // },
    }
    return (
        <>
        {
            loadTransactions ? <p>Loading </p> :
            <div className="">
                <Chart 
                    type='donut'
                    series={series}
                    options={options}   
                    // width={300}
                    height={230}
                />
            </div>
        }
        </>
    )
}
