import React, { useEffect } from 'react';
import AdminNav from '../../components/admin/AdminNav';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../../components/admin/dashboard/AdminDashboard';

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Admin Dashboard';
  }, []);
return(
  <div className='bg-gray-50 h-screen'>
    <AdminNav />
    <Routes>
        <Route exact path='/' element={<AdminDashboard />} />
    </Routes>
  </div>
)
};

export default Dashboard;
