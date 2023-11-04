import React from 'react'
import Navbar from '../../components/user/Navbar'
import Cart from '../../components/user/cart/cart'
import { Route, Routes } from 'react-router-dom'
import AddAddress from '../../components/user/cart/addAddress/AddAddress'
import Payment from '../../components/user/cart/Payment/Payment'

const CartPage = () => {
  return (
    <>
    <Navbar />
    <Routes>
        <Route path='/' element={<Cart />} />
        <Route path='/address' element={<AddAddress />} />
        <Route path='/address/payment' element={<Payment />} />
    </Routes>
    </>
  )
}

export default CartPage