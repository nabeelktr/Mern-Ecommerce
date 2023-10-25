import React from 'react';
import { useNavigate } from 'react-router-dom/dist';

const Home = () => {
  const navigate = useNavigate();
  const signout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };
  return (
    <div>
      <button type="button" onClick={signout}>signout</button>
    </div>
  );
};

export default Home;
