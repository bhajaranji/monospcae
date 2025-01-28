import React from 'react'
import Sidbar from './components/Sidebar/Sidbar'
import Check from './components/Test-folder/Check'
import { Route, Routes } from 'react-router-dom'
import Leads from './pages/Leads/Leads'
import User from './pages/User/User'
import Vendors from './pages/Vendors/Vendors'
import LeadDatabase from './pages/LeadDatabase/LeadDatabase';
import LeadEdit from './pages/LeadEdit/LeadEdit';
import EditPre from './pages/EditPre/EditPre'

function AdminApp() {
  return (
    <div className="main-layout">
  <aside className="sidebar">
    <Sidbar/>
  </aside>
  <div className="dashboard-content">
    {/* <Leads/> */}
    <Routes>
      <Route path="/" element={<Leads />} />
      <Route path="/leads" element={<Leads/>}/>
      <Route path="/user" element={<User/>}/>
      <Route path="/vendors" element={<Vendors/>}/>
      <Route path="/lead-database" element={<LeadDatabase />} />
      <Route path="/lead-edit" element={<LeadEdit />} />
      <Route path="/edit-pre" element={<EditPre />} />
    </Routes>
  </div>    
</div>
      
  )
}

export default AdminApp
