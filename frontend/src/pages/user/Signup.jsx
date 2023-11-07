import React, { useEffect } from 'react';
import Navbar from '../../components/user/Navbar';
import SignupForm from '../../components/user/SignupForm';


const Signup = () => {
  useEffect(() => {
    document.title = 'Signup';
  }, []);
  return (
  <div className="flex flex-col min-h-screen justify-between" style={{ background: 'linear-gradient(to bottom right, #FEEDF6, #FFE1BE)' }}>
    <Navbar />
  
    <div className="flex items-center justify-center h-full mt-28">
      <SignupForm />
    </div>
  </div>
  )
  };

export default Signup;
