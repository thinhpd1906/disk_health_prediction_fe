import React from 'react';
import './home.css';
import Chart from './components/chart/Chart';
import { getSmart } from '../../api/smart';
const Home = () => {
    const fGetSmart = async() =>  {
        await getSmart()
        .then((res) => {
            console.log("smart", res)
        })
    }
    fGetSmart()
    return (
       <div>
            <Chart />
       </div>
    );
}

export default Home;