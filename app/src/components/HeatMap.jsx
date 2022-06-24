import React from 'react';
import Chart from 'react-apexcharts';

export default function HeatMap(props) {
    const loadRosters = props.loadRosters
    const rosters = props.rosters
    const data = rosters.totalRoster.map(roster => {
        return {
            name:roster.owner_id.display_name,
            data:[{
                x:"QB",
                y:roster.players.filter(player => player.position === "QB").length
            },{
                x:"RB",
                y:roster.players.filter(player => player.position === "RB").length
            },{
                x:"WR",
                y:roster.players.filter(player => player.position === "WR").length
            },{
                x:"TE",
                y:roster.players.filter(player => player.position === "TE").length
            },{
                x:"K",
                y:roster.players.filter(player => player.position === "K").length
            },{
                x:"DEF",
                y:roster.players.filter(player => player.position === "DEF").length
            }]
        }
    })
    const series = data
    const options = {
        chart: {
            background: '#000000',
            foreColor: '#9fa0a1',
            toolbar: {
                show: false
            },
        },
        legend:{
            show:false
        },
        plotOptions: {
            heatmap: {
                colorScale: {
                    ranges: [{
                        from: 0,
                        to: 2,
                        color: '#f8296d',
                        name: 'low',
                    },
                    {
                        from: 3,
                        to: 5,
                        color: '#fcd846',
                        name: 'medium',
                    },
                    {
                        from: 6,
                        to: 8,
                        color: '#41d87e',
                        name: 'high',
                    },
                    {
                        from: 9,
                        to: 20,
                        color: '#30a7f8',
                        name: 'very high',
                    }
                    ]
                },
            },
        },
        theme: {
            mode: 'dark', 
        },
    }

    return (
        <>
        {
            loadRosters ? <p>Loading </p> :
            <div id="chart" className="">
                <Chart 
                    options={options} 
                    series={series} 
                    type="heatmap" 
                    height={450}
                    width={450}
                />
            </div>
        }
        </>
    )
}
