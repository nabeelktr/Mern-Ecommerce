import ProductList from '../../components/user/products/productList/ProductList';
import Navbar from '../../components/user/Navbar'
import { Route, Routes } from 'react-router-dom';
import ViewProduct from '../../components/user/products/viewProduct/ViewProduct';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const UserProducts = () => {
  const refresh = useSelector((state) => state.filter.refresh)
  useEffect(() => {
    document.title = 'Shop';
  }, []);
  return (
    <>
    <Navbar />

    <Routes>
        <Route path='/' element={<ProductList key={refresh} />} />
        <Route path='/view/:id' element={<ViewProduct />} />
    </Routes>
    </>
  )
}

export default UserProducts