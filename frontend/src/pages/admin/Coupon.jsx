import React from 'react'
import AdminNav from '../../components/admin/AdminNav'
import AddCoupon from '../../components/admin/coupon/AddCoupon'
import { Route, Routes } from 'react-router-dom'
import CouponTable from '../../components/admin/coupon/CouponTable'

const Coupon = () => {
  return (
    <>
    <AdminNav />
    <Routes>
        <Route path='/' element={<CouponTable />} />
        <Route path='/add' element={<AddCoupon />} />
    </Routes>
    </>
  )
}

export default Coupon