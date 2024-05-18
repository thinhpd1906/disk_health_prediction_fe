import React from "react";
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";
function LineChart({ chartData }) {
  return (
    <div >
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              // text: chartData.datasets[0].label
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