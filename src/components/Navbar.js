import React,{useEffect,useState} from 'react';
import "./Navbar.css";
import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';
import { auth } from "./Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";


export default function Navbar(props) {

    const [user, setUser] = useState(null);

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) setUser(user);
        else setUser(null);
      });
    }, []);

    function logOutClicked(){
      signOut(auth);
      props.handleSnack("Logout successful", "success");
    }

    
  return (
    <div className="Header">
        <Link to="/">
            <img className="logo" src={logo} alt="Logo" />
        </Link>
        <div className="navigation-menu">
            <Link to="about"> About Us</Link>
            <Link to="contact"> Contact</Link>
            {
                user ? (
                    <Link className="logout-btn" to="/" onClick={logOutClicked}>Log Out</Link>
                ):(
                    <></>
                )
            }
            
        </div>
    </div>
  )
}
