import React from 'react';
import AdminNav from '../../components/admin/AdminNav';
import AddProducts from '../../components/admin/products/AddProducts';
import { Route, Routes } from 'react-router-dom';
import ProductTable from '../../components/admin/products/table/ProductTable';
import EditProduct from '../../components/admin/products/EditProduct';


const Products = () => {
  const data = null;
  return (
    <div className='bg-gray-50 h-screen'>
      <AdminNav />
      <Routes>
        <Route path='/' element={<ProductTable />} />
        <Route path='/add' element={<AddProducts />} />
        <Route path='/edit' element={<EditProduct />} />
      </Routes>
    </div>
  );
};

export default Products;
