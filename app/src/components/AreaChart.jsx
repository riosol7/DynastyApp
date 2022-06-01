import React from 'react';
import Chart from 'react-apexcharts';

export default function AreaChart(props) {
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
                speed: 1000
              }
            },
            dropShadow: {
                enabled: true,
                opacity: 0.05,
                blur: 4,
                left: -7,
                top: 12
            },
        },
        colors:[
            //Sam Y
            "#FF009C",
            //Porfirio69 Y
            "#00EFD1",
            //riosol Y
            "#5b86e5",
            //MasterJedi Y
            "#FFC371",
            //Chadlos Y
            "#ffafbd",
            //BigD069 Y
            "#45a247",
            //Kosmic Y
            "#E21C34",
            //jlo
            "#B5FFFF",
            //donkey
            "#FFE98A",
            //kmdez Y
            "#72FFB6",
            //Galatis
            "#bd66ff",
            //cbcb 
            "#F7CE38"
        ],
        fill: {
            type: 'gradient',
            gradient: {
              gradientToColors: ["#5B146F","#00ACEA","#36d1dc","#FF5F6D","#ffc3a0","#283c86","#500B28","#FCA5F1","#D74177","#10D164","#38ADAE","#FC210D"]
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
            curve: 'smooth'
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
        <div id="chart" className="">
            <Chart 
                options={options} 
                series={series} 
                type="line" 
                height={500}
                // width={600} 
            />
        </div>
    )
}
