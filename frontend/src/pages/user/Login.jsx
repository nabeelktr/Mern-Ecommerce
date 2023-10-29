import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom/dist';
import Navbar from '../../components/user/Navbar';
import LoginForm from '../../components/user/LoginForm';

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      navigate('/home');
    }
  }, []);
  return (

    <div className="flex flex-col min-h-screen justify-between" style={{ background: ' linear-gradient(to bottom right, #FEEDF6, #FFE1BE) ' }}>
      <Navbar />
      <div className="flex items-center justify-center h-full">
        <LoginForm value="Login" />
      </div>
    </div>

  );
};

export default Login;
