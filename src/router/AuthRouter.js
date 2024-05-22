import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "../pages/home/Home";
import Header from "../pages/commonComponents/Header";
import Footer from "../pages/commonComponents/Footer";
import { useEffect } from "react";
import TableView from "../pages/dashboard/TableView";
import SignUp from "../pages/admin/SignUp";

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
                <Route path= "/table" element = { <TableView />} />
                <Route path= "/admin/signup" element = {<SignUp />} />
            </Routes>
            <Footer />
        </>
    )
}

export default AuthRouter;