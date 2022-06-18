import React from 'react'
import Chart from 'react-apexcharts';

export default function RadarChart(props) {
    const loadRosters = props.loadRosters
    const roster = props.roster
    
    const series = [{
        name: 'value',
        data: [roster.kct.qb.total, roster.kct.rb.total, roster.kct.wr.total, roster.kct.te.total, 0],
    }]
    const options = {
        chart: {
            type: 'radar',
            foreColor: 'none',
            toolbar: {
                show: false
            },
        },
        colors: ["#a9dfd8"],
        dataLabels: {
            enabled: false
        },
        grid: {
            show: false,
            padding: {
              bottom: 0
            }
          },
        legend:{
            show:false
        },
        tooltip: {
            theme:"dark"
        },
        xaxis: {
            categories: ['QB', 'RB', 'WR', 'TE', 'Picks']
        }
    };

    return (
        <>
        {
            loadRosters ? <p>Loading </p> :
            <div className="">
                <Chart 
                    type='radar'
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
