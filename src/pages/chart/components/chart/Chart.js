import React, { useState } from 'react';
// import '../../../../css/chart.css';
import LineChart from './LineChart';
import { getSerialNumbers, getSmart } from '../../../../api/smart';
import { color } from 'chart.js/helpers';
import styles from '../../../../css/chart.module.css';
import { useLoading } from '../../../../context/LoadingProvider';
import { useLocation } from 'react-router-dom';


const Chart = () => {
  const location = useLocation();
  const userId = localStorage.getItem("userId")
  let defaultSerialNum;
  if(location.state) {
    console.log("re run")
    if(location.state.serialNum) {
      defaultSerialNum = location.state.serialNum
    } 
  } else {
    defaultSerialNum = userId
  }
  const [smartData, setSmartData] = useState([]);
  const [serialNumber, setSerialNumber] = useState("");
  const [classPredict, setClassPredict] = useState(3);
  const [selectedDay, setSelectedDay] = useState(30);
  const [selectedSerialNumber, setSelectedSerialNumber] = useState(defaultSerialNum);
  const { isLoading, setIsLoading } = useLoading();
  const [serialNumberList, setSerialNumberList] = useState([]);
  const [healthStatus, setHealthStatus] = useState("Your hard drive is functioning normally")
  const [healthStatusColor, setHealthStatusColor] = useState({color: "blue"});
  
  const handleSelectedDayChange = (event) => {
    setSelectedDay(event.target.value);
  };
  const handleSelectedSerialChange = (event) => {
    setSelectedSerialNumber(event.target.value);
  };
  const timeList = [
    {
      value: 3,
      label: "3 days ago"
    },
    {
      value: 7,
      label: "7 days ago"
    },
    {
      value: 15,
      label: "15 days ago"
    },
  ]
   
  const  convertToTitleCase = (s) =>  {
    var words = s.split('_');
    var capitalizedWords = words.map(function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join(' ');
  }

  const fGetSmart = async (data) => {
    console.log("fgetsmart")
    setIsLoading(true)
    await getSmart(data)
      .then((res) => {
        let lastElement = res.data[res.data.length -1];
        let smartList = res.data
        let smartImportantSupport = []
        for (const [key, value] of Object.entries(lastElement)) {
          if((key !== "id") && (key !== "serial_number") && (key !== "date") && (key !== "class_prediction") && (key !== "user_id") && (lastElement[key] != -999))  {
            smartImportantSupport.push(key)
          }
        }
        let labels = smartList.map(data => data.date)
        let chartDatasets = smartImportantSupport.map((ele, index) => {
          let chartData = {
            labels: [],
            datasets:  [
              {
                label: "",
                data: []
              }
            ]
          }
          chartData["labels"] = labels
          chartData.datasets[0].label = convertToTitleCase(ele)
          chartData.datasets[0].data = smartList.map(element => element[ele])
          return chartData
        })
        setSmartData(chartDatasets)
        setSerialNumber(lastElement["serial_number"])
        setClassPredict(lastElement["class_prediction"])
        setIsLoading(false)
      })
      .catch((err) => {
        // console.log("call api get smart fail")
        setIsLoading(false)
      })
  }
  const fgetSerialNumber = async () => {
    console.log("get serial num")
    await getSerialNumbers()
    .then((res) => {
      console.log("ok", res.data.serialNumbers)
      setSerialNumberList(res.data.serialNumbers)
    })
    .catch((err) => {
      console.log("error")
    })
  }
  
  const subtractDays = (date, days) => {
    const result = new Date(date);
    result.setDate(date.getDate() - days);
    return result.toISOString().split('T')[0];
  }
  React.useEffect(() => {
    let toDate = new Date()
    let fromDate =  subtractDays(toDate, selectedDay)
    let data = {
      fromDate,
      toDate: toDate.toISOString().split('T')[0],
      serialNumber: selectedSerialNumber
    }
    console.log("check", selectedSerialNumber)
    fGetSmart(data)
    fgetSerialNumber()
  }, [selectedDay, selectedSerialNumber])

  React.useEffect(() => {
    switch(classPredict) {
      case 0:
        setHealthStatus("Your hard drive has about 0-13 days left before it fails")
        setHealthStatusColor({color: "red"})
        break;
      case 1:
        setHealthStatus("Your hard drive has about 14-28 days left before it fails")
        setHealthStatusColor({color: "yellow"})
        break;
      // case 2:
      //   setHealthStatus("Your hard drive has about 8-14 days left before it fails")
      //   setHealthStatusColor({color: "green"})
      //   break;
      default:
        setHealthStatus("Your hard drive is functioning normally")
        setHealthStatusColor({color: "green"})
    }
  }, [classPredict])
  

  return (
    <div className='heading' >
      {/* <div className='container' style={{backgroundColor: "yellow", margin: 0}} > */}
      {/* <h1>chart</h1> */}
      <div className='row' style={{ margin: "0 0 100px" }}>
        <div className='col-xl-2 col-lg-3 col-md-3 col-sm-4 col-12' >
          <div className='card' style={{ marginTop: '10.5em' }}>
            <div className='card-body'>
              <div className='card-title'>
                <h5 className={styles.textTile}>Admin's Serial Number</h5>
              </div>
              <div className={`card-text ${styles.textDes}`}>{userId}</div>
            </div>
          </div>
          <div className='card' style={{ marginTop: '28px' }}>
            <div className='card-body'>
              <div className='card-title'>
                <h5 className={styles.textTile} style={healthStatusColor}>Hard Drive's health</h5>
              </div>
              <div className={`card-text ${styles.textDes}`}>{healthStatus}</div>
            </div>
          </div>
        </div>
        <div className='col-xl-10 col-lg-9 col-md-9 col-sm-8 col-12'>
          <h2 style = {{
            textAlign: "center",
            margin: "0 0 0.8em 1.4em",
            fontSize: '26px',
            color: "blue"
          }}>Harddrive's important smart property</h2>
          <div className="row" style = {{paddingLeft: "4em", justifyContent: "center"}}>
            <select className="form-select" aria-label="select" style={{ width: '25%', padding: "1em" }} value={selectedDay} onChange={handleSelectedDayChange}>
              <option value={30}>Number of days (default 1 month)</option>
              {timeList.map((ele) => (
                <option key= {ele.value} value={ele.value}>{ele.label}</option>
              ))}
            </select>
            <select className="form-select" aria-label="select" style={{ width: '25%', marginLeft: "2em", padding: "1em"}} onChange={handleSelectedSerialChange} value={selectedSerialNumber} >
              {/* <option value={""}>All harddrive</option> */}
              {serialNumberList.map((ele) => (
                <option key= {ele} value={ele}>Harddrive {ele}</option>
              ))}
            </select>
          </div>
          
          <div className='row' style={{ margin: 0 }}>
            
            {smartData.map((ele) => (
              <div key={ele.datasets[0].label} className='col-xl-6 col-lg-12 col-md-12 col-sm-12'>
                <LineChart chartData={ele} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default Chart;