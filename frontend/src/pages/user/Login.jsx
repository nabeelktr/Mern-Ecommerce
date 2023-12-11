import React, { useEffect, useState } from 'react';

import Navbar from '../../components/user/Navbar';
import LoginForm from '../../components/user/LoginForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../redux/features/authSlice';

const Login = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()
  const [toastShown, setToastShown] = useState(false);

  useEffect(() => {
    if(isLoggedIn){
      navigate('/')
    }else{
    document.title = 'Login';
    if (location.state && !toastShown) {
      toast.success("Thank You.. your registration was Successful", {
        position: "top-center",
      });
      setToastShown(true);
    }
    dispatch(signOut());
  }
  }, []);
  return (
    <>
      <Navbar />
      <Toaster />
    <div className="flex flex-col min-h-screen justify-between" style={{ background: ' linear-gradient(to bottom right, #FEEDF6, #FFE1BE) ' }}>
      <div className="flex justify-center h-full mt-52">
        <LoginForm value="Login" />
      </div>
    </div>
    </>

  );
};

export default Login;
