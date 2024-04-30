import React, { useState } from 'react';
import './chart.css';
import LineChart from './LineChart';
const Data = [
    {
      id: 1,
      year: 2016,
      userGain: 80000,
      userLost: 823
    },
    {
      id: 2,
      year: 2017,
      userGain: 45677,
      userLost: 345
    },
    {
      id: 3,
      year: 2018,
      userGain: 78888,
      userLost: 555
    },
    {
      id: 4,
      year: 2019,
      userGain: 90000,
      userLost: 4555
    },
    {
      id: 5,
      year: 2020,
      userGain: 4300,
      userLost: 234
    }
  ];
const Chart = () => {
    React.useEffect(() => {
        console.log("thinhpd")
    }, [])
    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.year), 
        // fill: false,
        // lineTension: 0.5,
        // borderColor: 'rgba(0,0,0,1)',
        // borderWidth: 50,
        datasets: [
            {
                label: "Users Gained",
                data: Data.map((data) => data.userGain),
            }
        ]
    });

    return (
        <div className='heading'>
            <h1>Thinhpd</h1>
            <LineChart chartData={chartData} />
        </div>
    );
}

export default Chart;