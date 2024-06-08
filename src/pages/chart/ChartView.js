import React from 'react';
import '../../css/home.module.css';
import Chart from './components/chart/Chart';


const ChartView = () => {
    return (
       <div className='layout px-3'>
            <Chart />
       </div>
    );
}
export default ChartView;