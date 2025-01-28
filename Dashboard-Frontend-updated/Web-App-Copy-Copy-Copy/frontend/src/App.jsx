import React from 'react'
import { Route, Routes, } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import Leads from '../../Admin/src/pages/Leads/Leads'
import LeadDatabase from '../../Admin/src/pages/LeadDatabase/LeadDatabase'
import AdminApp from '../../Admin/src/App'
import LeadEdit from '../../Admin/src/pages/LeadEdit/LeadEdit'
import Sidebar from '../../Admin/src/components/Test-folder/Check'
import EditPre from '../../Admin/src/pages/EditPre/EditPre'

const App = () => {
  return (
    <div className="app-content">

      <Routes>
        {/* Render HeroSection only on the root route */}
        <Route path="/" element={<Home />} />

        {/* Render Login page on /login */}
        <Route path="/login" element={<Login />} />

        {/* Render Signup page on /signup */}
        <Route path="/signup" element={<SignUp />} />

        {/* Render Signup page on /leads */}
        <Route path="/leads" element={<Leads/>} />

        {/* Render Signup page on /leadsDatabase */}
        <Route path="/lead-database" element={<LeadDatabase/>} />

        {/* Render Signup page on /lead-edit */}
        <Route path="/lead-edit" element={<LeadEdit/>} />

        {/* Render Signup page on /edit-pre */}
        <Route path="/edit-pre" element={<EditPre />} />
        
        {/* Render Signup page on /admin */}
        {/* <Route path="/admin/*" element={<AdminApp/>} /> */}
        
      </Routes>
      

      </div>
  );
};

export default App
