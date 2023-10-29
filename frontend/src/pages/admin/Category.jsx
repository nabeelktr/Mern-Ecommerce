import React from 'react'
import CategoryTable from '../../components/admin/category/CategoryTable';
import { Route, Routes } from 'react-router-dom';
import AdminNav from '../../components/admin/AdminNav';
import AddorEditCategory from '../../components/admin/category/AddorEditCategory';

const Categoty = () => {
    const data = null;
  return (
    <div className='bg-gray-50 h-screen'>
      <AdminNav />
      <Routes>
        <Route path='/' element={<CategoryTable />} />
        <Route path='/add' element={<AddorEditCategory />} />
        <Route path='/edit' element={<AddorEditCategory />} />
      </Routes>
    </div>
  )
}

export default Categoty