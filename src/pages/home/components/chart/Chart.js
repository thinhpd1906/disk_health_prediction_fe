import React, { useState } from 'react';
// import '../../../../css/chart.css';
import LineChart from './LineChart';
import { getSmart } from '../../../../api/smart';
import { color } from 'chart.js/helpers';
import styles from '../../../../css/chart.module.css';
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
  const [smartData, setSmartData] = useState([]);
  const [serialNumber, setSerialNumber] = useState("");
  const [classPredict, setClassPredict] = useState(1);
  const [selectedDay, setSelectedDay] = useState(10);

  // Bước 2: Tạo hàm xử lý sự kiện để cập nhật state
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
  // const [chartData, setChartData] = useState({
  //   labels: Data.map((data) => data.year),
  //   // fill: false,
  //   // lineTension: 0.5,
  //   // borderColor: 'rgba(0,0,0,1)',
  //   // borderWidth: 50,
  //   datasets: [
  //     {
  //       label: "Users Gained ",
  //       data: Data.map((data) => data.userGain),
  //     }
  //   ]
  // });
  const  convertToTitleCase = (s) =>  {
    var words = s.split('_');
    var capitalizedWords = words.map(function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join(' ');
  }

  const fGetSmart = async (data) => {
    console.log("call api get smart")
    await getSmart(data)
      .then((res) => {
        let lastElement = res.data[res.data.length -1];
        console.log("smart", res.data)
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
      })
      .catch((er) => {
        console.log("call api get smart fail")
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
                <h5 className={styles.textTile}>Hard Drive's health</h5>
              </div>
              <div className={`card-text ${styles.textDes}`}  >{classPredict == 2 ? "Your hard drive is functioning normally" : "Your hard drive has about 28 days left before it fails"}</div>
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
              <div key={ele.datasets[0].label} className='col-xl-6 col-lg-12  col-md-12 col-sm-12'>
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