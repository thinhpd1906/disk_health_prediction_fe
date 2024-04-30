import React from "react";
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";
function LineChart({ chartData }) {
  return (
    <div className="chart-container" style={{width: 800}}>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            },
            legend: {
              // display: true
            }
          }
        }}
      />
    </div>
  );
}
export default LineChart;