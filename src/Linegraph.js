import numeral from 'numeral';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2'; 

const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };

const buildChartData = (data)=> {
    const chartData =[];
    let lastDataPoint;
    for(let date in data.cases){
        if(lastDataPoint){
            let newDataPoint = {
                x : date,
                y : data["cases"][date] - [lastDataPoint]
            }
            chartData.push(newDataPoint);
        }
        lastDataPoint = data["cases"][date]
    }
    return chartData;
}

function Linegraph() {
    const [data, setData] = useState({});

    //https://disease.sh/v3/covid-19/historical/all?lastdays=120
    
    useEffect(()=>{
        const dataFetch = async ()=> {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
                    .then(response => response.json())
                    .then(data => {
            let chartedData = buildChartData(data);
            setData(chartedData);
        })}
        dataFetch();
    })
    return (
        <div>
        <h3>Worldwide new Cases</h3> 
        {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
        </div>
    )
}

export default Linegraph
