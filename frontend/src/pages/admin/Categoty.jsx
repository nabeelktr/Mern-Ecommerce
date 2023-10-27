import React from 'react'
import CategoryTable from '../../components/admin/category/CategoryTable';
import { Route, Routes } from 'react-router-dom';
import AdminNav from '../../components/admin/AdminNav';
import AddCategory from '../../components/admin/category/AddCategory';

const Categoty = () => {
    const data = null;
  return (
    <div className='bg-gray-50 h-screen'>
      <AdminNav />
      <Routes>
        <Route path='/' element={<CategoryTable />} />
        <Route path='/add' element={<AddCategory />} />
      </Routes>
    </div>
  )
}

export default Categoty