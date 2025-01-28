import React from 'react'
import './Sidebar.css'
import { assests } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
import Navbar from '../../../../frontend/src/components/Navbar/Navbar'

function Sidbar() {
    // const [menu,setmenu] = useState("sidebar-options")
  return (
    <div className='sidebar'>
        {/* <h1>hello</h1> */}
        <div className="sidebar-logo">
        <img src={assests.logo} alt="" />
        </div>
        <div className="sidebar-options">
            <NavLink to='/leads' className="sidebar-option">
                <img src={assests.leads} alt="" />
                <p>Leads</p>
                </NavLink>
            <NavLink to='/user' className="sidebar-option">
                <img src={assests.user} alt="" />
                <p>User</p>
                </NavLink>
            <NavLink to='/vendors' className="sidebar-option">
                <img src={assests.vendors} alt="" />
                <p className='vendor'>Vendors</p>
                </NavLink>

        </div>
        <div className="profile">
            <div className="search-icon">
                
            <img className='icon' src={assests.search2} alt="" />
            </div>
        <img className='prof' src={assests.profile} alt="" />
        </div> 
      
    </div>
  )
}

export default Sidbar
