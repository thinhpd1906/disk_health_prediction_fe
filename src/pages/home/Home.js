import { useEffect, useState } from "react";
import { useLoading } from "../../context/LoadingProvider";
import { getOveral } from "../../api/smart";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [col, setCol] = useState([])
    const [hardDrives, sethardDrives] = useState([]);
    const [serialNumber, setSerialNumber] = useState("");
    const { isLoading, setIsLoading } = useLoading();
    const convertCamelCaseToSpace = (str) => {
        return str.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase(); // Thêm khoảng trắng giữa chữ thường và chữ hoa, và chuyển đổi thành chữ thường
    };

    const viewDetail = (serialNum) =>  {
        navigate('/chart', { state: { serialNum } });
    }
    const fGetoveral = async (data) => {
        setIsLoading(true)
        await getOveral()
        .then((res) => {
            let smartListTemp = res.data;
            console.log("res overal", res)
            if(smartListTemp.length == 0) {
                setCol([])
                sethardDrives([])
            } else {
                let firstEle = res.data[0]
                let newCol = []
                for(const [key, value ] of Object.entries(firstEle)) {
                    newCol.push(key)
                }
                newCol.push("")
                newCol = newCol.map(convertCamelCaseToSpace);
                setCol(newCol)
                let data = [...res.data]
                sethardDrives(data)

            }
    
            setIsLoading(false)
        })
        .catch((err) => {
            setIsLoading(false)
        })
    }
    useEffect(() => {
        fGetoveral()
    }, [])
    return (
        <div className="layout px-3">
            <TableContainer className= "mt-4" component={Paper}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {col.map((ele) => {
                                return (<TableCell>{ele}</TableCell>)
                                
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {hardDrives.map((row) => (
                            <TableRow
                                key={row.serialNumber}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{row.serialNumber}</TableCell>
                                <TableCell align="left">{row.date}</TableCell>
                                <TableCell align="left">{row.timeLeft}</TableCell>
                                <TableCell align="left" style= {{cursor: "pointer", color: "blue", }}><p onClick={() => viewDetail(row.serialNumber)}>View detail</p></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Home;