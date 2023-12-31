import React, { useEffect } from 'react'

import AdminNav from '../../components/admin/AdminNav';
import { Route, Routes } from 'react-router-dom';
import OrderTable from '../../components/admin/orders/OrderTable';
import OrderDetailsAdmin from '../../components/admin/orders/OrderDetailsAdmin';

const Order = () => {

   useEffect(() => {
    document.title = 'Admin Orders';
  }, []);

  return (
    <div className='bg-gray-50 min-h-screen'>
      <AdminNav />
      <Routes>
        <Route exact path='/' element={<OrderTable />} />
        <Route exact path='/orderdetails' element={<OrderDetailsAdmin />} />
      </Routes>
    </div>
  )
}

export default Order