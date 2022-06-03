import React from 'react';
import Chart from 'react-apexcharts';

export default function AreaChart(props) {
    const loadRosters = props.loadRosters
    const rosters = props.rosters
    let lineSeries = rosters.totalRoster && rosters.totalRoster.map(roster => {
        return {
            name:roster.owner_id.display_name,
            data:roster.owner_id ? roster.owner_id.dynasty.map(data => data.value) : []
        }
    })
    let dates = rosters.totalRoster && rosters.totalRoster.map(roster => roster.owner_id.dynasty.map(data => new Date(data.date).toLocaleDateString()))
    const series =  lineSeries !== undefined ? lineSeries : [{name:"", data:[]}]
    const options = {
        chart: {
            background: '#000000',
            foreColor: '#ebebeb',
            toolbar: {
                show: false
            },
            height: 350,
            type: 'line',
            stacked: false,
            animations: {
              enabled: true,
              easing: 'linear',
              dynamicAnimation: {
                speed: 5000
              }
            },
            dropShadow: {
                enabled: true,
                opacity: 0.3,
                blur: 5,
                left: -7,
                top: 15
            },
        },
        theme: {
            mode: 'dark', 
        },
        colors:[
            "#FF009C","#ff8008","#0072ff",
            "#fd1d1d","#00EFD1","#feb47b",
            "#c9d6ff","#24fe41","#a80077",
            "#c8b387","#9733ee","#ffff1c"
        ],
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
        legend:{
            show:false
        },
        markers: {
            size: 0,
            hover: {
              size: 0
            }
          },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show:true,
            curve: 'smooth',
            lineCap:"butt"
        },
        xaxis: { 
            type: 'date',
            categories: dates !== undefined ? dates[0] : []
        },
        tooltip: {
            x: {
            format: 'dd/MM/yy HH:mm'
            },
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
                    height={500}
                    // width={600} 
                />
            </div>
        }
        </>
    )
}
