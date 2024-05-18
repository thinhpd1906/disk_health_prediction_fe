import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import AuthRouter from "./AuthRouter";

function Router() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  useEffect(() => {
    if(!token) {
      navigate('/login')
    }
  }, [])
  return (
    <>
        {/* {token ? (<Routes>
        <Route path="/*" element={<Home />} />
        <Route path = "/login" element = { <Login />}/>
      </Routes>
      ) : <Login />} */}
      <Routes>
        <Route path = "/login" element = { <Login />}/>
        <Route path="/*" element={<AuthRouter />} />
      </Routes>
    </>
  );
}

export default Router;