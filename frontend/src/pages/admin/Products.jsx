import React from 'react';
import AdminNav from '../../components/admin/AdminNav';
import AddProducts from '../../components/admin/products/AddProducts';
import { Route, Routes } from 'react-router-dom';
import ProductTable from '../../components/admin/products/table/ProductTable';


const Products = () => {
  const data = null;
  return (
    <div>
      <AdminNav />
      <Routes>
        <Route path='/' element={<ProductTable />} />
        <Route path='/add' element={<AddProducts />} />
      </Routes>
    </div>
  );
};

export default Products;
