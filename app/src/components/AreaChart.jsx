import React from 'react';
import Chart from 'react-apexcharts';

export default function AreaChart(props) {
    const loadRosters = props.loadRosters
    const rosters = props.rosters
    let lineSeries = rosters.totalRoster && rosters.totalRoster.map(roster => {
        return {
            name:roster.owner_id.display_name,
            data:roster.owner_id ? roster.owner_id.dynasty.slice().map(data => data.value) : []
        }
    })
    let dates = rosters.totalRoster && rosters.totalRoster.map(roster => roster.owner_id.dynasty.map(data => new Date(data.date).toLocaleDateString()))
    const series =  lineSeries !== undefined ? lineSeries : [{name:"", data:[]}]
    const options = {
        chart: {
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 1000
                }
            },
            background: '#000000',
            dropShadow: {
                enabled: true,
                top: 3,
                left: 2,
                blur: 4,
                opacity: 1,
            },
            foreColor: '#9fa0a1',
            toolbar: {
                show: false
            },
            type: 'line',
            stacked: false,
        },
        colors:[
            "#FF009C","#ff8008","#0072ff",
            "#fd1d1d","#00EFD1","#feb47b",
            "#c9d6ff","#24fe41","#a80077",
            "#c8b387","#9733ee","#ffff1c"
        ],
        dataLabels: {
            enabled: false
        },
        fill: {
            type: 'gradient',
            gradient: {
              gradientToColors: [
                  "#5B146F","#f09819","#00c6ff",
                  "#7a2828","#00ACEA","#ff7e5f",
                  "#757f9a","#FFB612","#d38312",
                  "#D3BC8D","#89216b","#FFC20E"
                ]
            }
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
        markers: {
            size: 0,
            strokeWidth: 0,
            hover: {
                size: 5
            }
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        theme: {
            mode: 'dark', 
        },
        // title:{
        //     text:"Dynasty Growth",
        //     align:"left"
        // },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
        xaxis: { 
            type: 'date',
            categories: dates !== undefined ? dates[0] : []
        },
        zoom: {
            enabled: false
        }
    }
    
    return (
        <>
        {
            loadRosters ? <p>Loading </p> :
            <div id="chart" className="">
                <Chart 
                    options={options} 
                    series={series} 
                    type="line" 
                    height={450}
                    width={600} 
                />
            </div>
        }
        </>
    )
}
