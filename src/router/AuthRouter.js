import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "../pages/commonComponents/Header";
import Footer from "../pages/commonComponents/Footer";
import { useEffect } from "react";
import TableView from "../pages/dashboard/TableView";
import SignUp from "../pages/admin/SignUp";
import ChartView from "../pages/chart/ChartView";
import Home from "../pages/home/Home";

function AuthRouter() {
    // const navigate = useNavigate();
    // const token = localStorage.getItem("token")
    // useEffect(() => {
    //     if (!token) {
    //         navigate('/login')
    //     }
    // }, [])
    return (
        <>
            <Header />
            <Routes>
                <Route path= "/*" element = { <Home />} />
                <Route path= "/chart" element = { <ChartView />} />
                <Route path= "/table" element = { <TableView />} />
                <Route path= "/admin/signup" element = {<SignUp />} />
            </Routes>
            <Footer />
        </>
    )
}

export default AuthRouter;