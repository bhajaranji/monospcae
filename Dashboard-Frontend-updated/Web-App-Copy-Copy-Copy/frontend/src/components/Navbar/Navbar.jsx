import React, { useState } from "react";
import "./Navbar.css";
import { assests } from "../../assets/assets";


const Navbar = () => {
    const [menu,setmenu] = useState("Home")
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={assests.logo} alt="" />
      </div>
      <ul className="navbar-links">
        <li><a href="#home" onClick={()=>setmenu("Home")} className={menu==="Home"?"active":""}>Home</a></li>
        <li><a href="#demo" onClick={()=>setmenu("Demo")} className={menu==="Demo"?"active":""}>Demo</a></li>
        <li><a href="#services" onClick={()=>setmenu("Our-Services")} className={menu==="Our-Services"?"active":""}>Our Services</a></li>
        <li><a href="#contact" onClick={()=>setmenu("Contact-Us")} className={menu==="Contact-Us"?"active":""}>Contact Us</a></li>
        <li><a href="#jobs" onClick={()=>setmenu("Jobs")} className={menu==="Jobs"?"active":""}>Jobs</a></li>
        <li><a href="#book" onClick={()=>setmenu("Book-Online")} className={menu==="Book-Online"?"active":""}>Book Online</a></li>
      </ul>
    </div>
  );
};

export default Navbar;
