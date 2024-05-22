import React, { useState } from 'react';
// import '../../../../css/chart.css';
import LineChart from './LineChart';
import { getSmart } from '../../../../api/smart';
import { color } from 'chart.js/helpers';
import styles from '../../../../css/chart.module.css';
import { useLoading } from '../../../../context/LoadingProvider';


const Chart = () => {
  const [smartData, setSmartData] = useState([]);
  const [serialNumber, setSerialNumber] = useState("");
  const [classPredict, setClassPredict] = useState(1);
  const [selectedDay, setSelectedDay] = useState(10);
  const { isLoading, setIsLoading } = useLoading();

  const handleSelectedDayChange = (event) => {
    setSelectedDay(event.target.value);
    console.log("day", selectedDay)
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
    setIsLoading(true)
    await getSmart(data)
      .then((res) => {
        let lastElement = res.data[res.data.length -1];
        let smartList = res.data
        let smartImportantSupport = []
        for (const [key, value] of Object.entries(lastElement)) {
          if((key !== "id") && (key !== "serial_number") && (key !== "date") && (key !== "class_prediction") && (lastElement[key] != -999))  {
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
      .catch((er) => {
        // console.log("call api get smart fail")
        setIsLoading(false)
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
      toDate: toDate.toISOString().split('T')[0]
    }
    fGetSmart(data)
  }, [selectedDay])
  

  return (
    <div className='heading' >
      {/* <div className='container' style={{backgroundColor: "yellow", margin: 0}} > */}
      {/* <h1>chart</h1> */}
      <div className='row' style={{ margin: "0 0 100px" }}>
        <div className='col-xl-2 col-lg-3 col-md-3 col-sm-4 col-12' >
          <div className='card' style={{ marginTop: '100px' }}>
            <div className='card-body'>
              <div className='card-title'>
                <h5 className={styles.textTile}>Serial Number</h5>
              </div>
              <div className={`card-text ${styles.textDes}`}>{serialNumber}</div>
            </div>
          </div>
          <div className='card' style={{ marginTop: '28px' }}>
            <div className='card-body'>
              <div className='card-title'>
                <h5 className={styles.textTile} style={classPredict == 1 ?{color: 'blue'}: {color: "red"}}>Hard Drive's health</h5>
              </div>
              <div className={`card-text ${styles.textDes}`}>{classPredict == 1 ? "Your hard drive is functioning normally" : "Your hard drive has about 28 days left before it fails"}</div>
            </div>
          </div>
        </div>
        <div className='col-xl-10 col-lg-9 col-md-9 col-sm-8 col-12'>
          <select className="form-select" aria-label="Default select example" style={{ width: '25%', marginLeft: "auto", marginRight: "auto" }} value={selectedDay} onChange={handleSelectedDayChange}>
            <option value="30">Select the number of days</option>
            {timeList.map((ele) => (
              <option value={ele.value}>{ele.label}</option>
            ))}
          </select>
          <div className='row' style={{ margin: 0 }}>
            {/* <h2>Tình trạng sức khỏe ổ đĩa</h2> */}
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