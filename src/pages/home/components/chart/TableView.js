import { useEffect, useState } from "react";
import { getSmartForTableView } from "../../../../api/smart";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import ErrorAlert from "../../../commonComponents/ErrorAlert";


const TableView = () => {
    const subtractDays = (date, days) => {
        const result = new Date(date);
        result.setDate(date.getDate() - days);
        return result.toISOString().split('T')[0];
    }
    const [smartList, setSmartList] = useState([]);
    const [smartKeySupport, setSmartKeySupport] = useState([]);
    const [fromDate, setFromDate] = useState(dayjs(subtractDays(new Date(), 10)));
    const [toDate, setToDate] = useState(dayjs(new Date().now));
    const [totalPage, setTotalPage] = useState(0)
    const [page, setPage] = useState(1)
    const [isErrorDate, setIsErrorDate] = useState(false)
    let currentDate = new Date();
    const defaultFromDate = currentDate.setDate(currentDate.getDate() - 10);
    const [filter, setFilter] = useState({
        size: 10,
        page: 0,
        fromDate: subtractDays(new Date(), 10),
        toDate: (new Date()).toISOString().split('T')[0]
    })
    const pageSizeList = [
        {
          value: 3,
          label: "3 rows per page"
        },
        {
          value: 10,
          label: "10 rows per page"
        },
        {
          value: 20,
          label: "20 rows per page"
        },
        {
            value: 50,
            label: "50 rows per page"
        },
    ]
    const fGetSmartForTableView = async (data) => {
        if(filter.toDate < filter.fromDate) {
            setIsErrorDate(true)
            return;
        }
        await getSmartForTableView(data)
        .then((res) => {
            let smartListTemp = res.data.smartList;
            if(smartListTemp.length == 0) {
                setSmartKeySupport([])
                setSmartList([])
                setTotalPage(0)
            } else {
                let lastElement = smartListTemp[smartListTemp.length -1];
                let smartImportantSupport = []
                for (const [key, value] of Object.entries(lastElement)) {
                    if((lastElement[key] != -999))  {
                      smartImportantSupport.push(key)
                    }
                }
                const filteredList = smartListTemp.map(obj => 
                    smartImportantSupport.reduce((acc, key) => {
                        if (obj.hasOwnProperty(key)) {
                            acc[key] = obj[key];
                        }
                        return acc;
                    }, {})
                );
                setSmartKeySupport(smartImportantSupport)
                setSmartList(filteredList)
                setTotalPage(res.data.totalPages)
            }
        })
        .catch((err) => {
            console.log("err", err)
        })
    }
    const handleChangeFromDate = (newValue) => {
        const dateFormated = newValue.format('YYYY-MM-DD');
        const newFilter = {
            ...filter,
            fromDate: dateFormated,
        }
        setFilter(newFilter)
        setFromDate(newValue);
    };
    const handleChangeToDate = (newValue) => {
        const dateFormated = newValue.format('YYYY-MM-DD');
        const newFilter = {
            ...filter,
            toDate: dateFormated,
        }
        setFilter(newFilter);
        setToDate(newValue);
    };
    useEffect(() => {
        fGetSmartForTableView(filter)
    }, [])

    useEffect(() => {
        // console.log("ok date", fromDate)
    }, [fromDate])

    const handlePageChange = (event, value) => {
        console.log("value", value)
        setPage(value)
        const newCurrentPage = value - 1
        const newFilter = {
            ...filter,
            page: newCurrentPage,
        }
        setFilter(newFilter);
        fGetSmartForTableView(newFilter)
    }

    const handleSearch = () => {
        const newCurrentPage = 0;
        setPage(1)
        const newFilter = {
            ...filter,
            page: newCurrentPage,
        }
        setFilter(newFilter);
        fGetSmartForTableView(newFilter)
    }

    const handleSelectedPageSizeChange = (event) => {
        let newPageSize = event.target.value
        const newFilter = {
            ...filter,
            size: newPageSize,
        }
        setFilter(newFilter);
    }

    const errorDateChange = (value) => {
        setIsErrorDate(value)
    }

    return (
        <div className="layout px-3">
            {/* <div className="row"> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack direction="row" spacing={3}>
                    <DesktopDatePicker
                        label="From Date"
                        inputFormat="YYYY-MM-DD"
                        value={fromDate}
                        onChange={handleChangeFromDate}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <span className= "d-flex justify-content-center align-items-center ">
                        -
                    </span>
                    <DesktopDatePicker
                        label="To Date"
                        inputFormat="YYYY-MM-DD"
                        value={toDate}
                        onChange={handleChangeToDate}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <select className="form-select" aria-label="Default select example" style={{ width: '12%', }} value={filter.size} onChange={handleSelectedPageSizeChange}>
                        {pageSizeList.map((ele) => (
                            <option value={ele.value}>{ele.label}</option>
                        ))}
                    </select>
                    <Button variant="contained" className= "bg-dark" onClick= {handleSearch}>Search</Button>
                </Stack>
            </LocalizationProvider>
            {/* </div> */}
            <TableContainer className= "mt-4" component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {smartKeySupport.map((ele) => {
                                if(ele != "id") 
                                return (<TableCell>{ele}</TableCell>)
                                
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {smartList.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {smartKeySupport.map((ele) => {
                                    if(ele != "id") {
                                        return (
                                            <TableCell align="left">{row[ele]}</TableCell>
                                        )
                                    }
                                    return null
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination className= "my-5 d-flex justify-content-center" count={totalPage} page={page} color="primary" onChange={handlePageChange} />
            <ErrorAlert description="From Date must be less than To Date" isError= {isErrorDate} errorChange= {errorDateChange} />
        </div>
    )
}

export default TableView;