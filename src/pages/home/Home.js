import React from 'react';
import '../../css/home.module.css';
import Chart from './components/chart/Chart';
import { getSmart, getTest } from '../../api/smart';
const Home = () => {
    // const fGetSmart = async() =>  {
    //     await getSmart()
    //     .then((res) => {
    //         console.log("smart", res)
    //     })
    // }
    // fGetSmart()
    // const fGetTest = async() =>  {
    //     await getTest()
    //     .then((res) => {
    //         console.log("test", res)
    //     })
    // }
    // fGetTest()
    return (
       <div className='layout px-3'>
            <Chart />
       </div>
    );
}

export default Home;