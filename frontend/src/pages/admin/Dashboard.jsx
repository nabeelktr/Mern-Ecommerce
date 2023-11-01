import React, { useEffect } from 'react';
import AdminNav from '../../components/admin/AdminNav';

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Admin Dashboard';
  }, []);
return(
  <div>
    <AdminNav />
  </div>
)
};

export default Dashboard;
