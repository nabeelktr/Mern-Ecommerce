import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom/dist';
import AdminNav from '../../components/admin/AdminNav';
import LoginForm from '../../components/user/LoginForm';

const AdminLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) navigate('/admin/dashboard');
    document.title = 'Admin Login'
  }, []);
  return (

    <div className="flex flex-col min-h-screen justify-between" style={{ background: 'linear-gradient(to bottom right, #FEEDF6, #FFE1BE)' }}>
      <AdminNav />
      <div className="flex items-center justify-center h-full ">
        <LoginForm value="Admin Login" />
      </div>
    </div>

  );
};

export default AdminLogin;
