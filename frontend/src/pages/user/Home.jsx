import React, { useEffect } from 'react';
import Navbar from '../../components/user/Navbar';
import HomePage from '../../components/user/home/HomePage';

const Home = () => {
  useEffect(() => {
    document.title = 'Home';
  }, []);
  return (
    <div>
      <Navbar />
      <HomePage />
    </div>
  );
};

export default Home;
