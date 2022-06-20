import React from 'react'
import Chart from 'react-apexcharts';

export default function RadarChart(props) {
    const roundToHundredth = (value) => {
        return Number(value.toFixed(2));
    }
    const loadRosters = props.loadRosters
    const rosters = props.rosters
    const roster = props.roster

    const leagueAvgQBs = roundToHundredth(rosters.teamRank.reduce((a,b) => a + b.kct.qb.total, 0) / rosters.teamRank.length)
    const leagueAvgRBs = roundToHundredth(rosters.teamRank.reduce((a,b) => a + b.kct.rb.total, 0) / rosters.teamRank.length)
    const leagueAvgWRs = roundToHundredth(rosters.teamRank.reduce((a,b) => a + b.kct.wr.total, 0) / rosters.teamRank.length)
    const leagueAvgTEs = roundToHundredth(rosters.teamRank.reduce((a,b) => a + b.kct.te.total, 0) / rosters.teamRank.length)
    
    const series = [{
        name: roster.kct.owner.display_name,
        data:[roster.kct.qb.total, roster.kct.rb.total, roster.kct.wr.total, roster.kct.te.total, 0],
    },
    {
        name:"League Average",
        data:[leagueAvgQBs,leagueAvgRBs,leagueAvgWRs,leagueAvgTEs, 0]
    }
    ]
    const options = {
        chart: {
            type: 'radar',
            foreColor: 'none',
            toolbar: {
                show: false
            },
        },
        colors: ["#38c3b5","#f96310"],
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
            theme:"dark",
            y:{
                formatter: function (val) {
                  return val + " value"
                },
            },
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
