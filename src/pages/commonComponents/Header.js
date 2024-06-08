import { useState } from 'react';
import styles from '../../css/header.module.css'
import { logOut } from '../../api/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { Colors } from '../../utils/type';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const signOut = async () => {
        await logOut()
        .then(() => {
            console.log("logout res")
            localStorage.removeItem("token")
            navigate('/login')
        }) 
    }
    const userName = localStorage.getItem("name")
    console.log("name", userName)
    return (
        <header className="p-3 mb-3 border-bottom bg-dark" style ={{position: 'fixed', top: 0, width: '100%',  zIndex: 100 }}>
            {/* <div className="container"> */}
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    {(!(location.pathname == "/admin/signup")) && <li><p href="#" className={"nav-link px-2 " + (location.pathname == "/"? "text-light": "text-secondary")} onClick={() => navigate("/")} style={{ cursor: "pointer"}}>Home</p></li>}     
                    {(!(location.pathname == "/admin/signup")) && <li><p href="#" className={"nav-link px-2 " + (location.pathname == "/chart"? "text-light": "text-secondary")} onClick={() => navigate("/chart")} style={{ cursor: "pointer"}}>Chart View</p></li>}     
                    {(!(location.pathname == "/admin/signup")) &&  <li><p href="#" className={"nav-link px-2 text-secondary " + (location.pathname == "/table"? "text-light": "text-secondary" )} style={{cursor: "pointer"}} onClick={() => navigate("/table")}>Table view</p></li>} 
                        {/* <li><p href="#" className="nav-link px-2 link-light">Customers</p></li>
                        <li><p href="#" className="nav-link px-2 link-light">Products</p></li> */}
                    </ul>

                    <div className="dropdown text-end">
                        <button type="button" style= {{borderWidth: 0}}  className="d-block link-light text-decoration-none dropdown-toggle bg-dark" id="dropdownUser1" data-bs-toggle="dropdown"  aria-expanded="false" >
                            {/* <div classname= "" style={{display: "flex", flexDirection: "row"}}> */}
                                <img src={require("../../assets/avatar.jpeg")} alt="avt" width="32" height="32" className="rounded-circle" />
                                <span style = {{margin: '0 4px 0 12px'}}>{userName}</span>
                            {/* </div> */}
                        </button>

                        <ul className = {`dropdown-menu text-small bg-dark ${styles.list}`}  aria-labelledby="dropdownUser1" style={{}}>
                            {/* <li key= "newProject"><a className="dropdown-item" href="#">New project...</a></li>
                            <li key= "Settings"><a className="dropdown-item" href="#">Settings</a></li>
                            <li key= "Profile"><a className="dropdown-item" href="#">Profile</a></li>
                            <li key= "Settings"><hr className="dropdown-divider" /></li> */}
                            <li className = {styles.list} key= "signOut" onClick = {signOut} ><button className="dropdown-item" style={{color: Colors.BASE_TEXT}} >Sign out</button></li>
                        </ul>
                    </div>
                </div>
            {/* </div> */}
        </header>
    )
}

export default Header;