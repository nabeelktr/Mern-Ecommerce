import React, { useEffect } from 'react';

import Navbar from '../../components/user/Navbar';
import LoginForm from '../../components/user/LoginForm';

const Login = () => {
  useEffect(() => {
    document.title = 'Login';
  }, []);
  return (
    <>
      <Navbar />
    <div className="flex flex-col min-h-screen justify-between" style={{ background: ' linear-gradient(to bottom right, #FEEDF6, #FFE1BE) ' }}>
      <div className="flex justify-center h-full mt-52">
        <LoginForm value="Login" />
      </div>
    </div>
    </>

  );
};

export default Login;
