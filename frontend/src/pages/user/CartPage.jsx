import React from 'react'
import Navbar from '../../components/user/Navbar'
import Cart from '../../components/user/cart/Cart'
import { Route, Routes } from 'react-router-dom'
import AddAddress from '../../components/user/cart/addAddress/AddAddress'
import Payment from '../../components/user/cart/Payment/Payment'
import PaymentSuccess from '../../components/user/cart/Payment/PaymentSuccess'

const CartPage = () => {
  return (
    <>
    <Navbar />
    <Routes>
        <Route path='/' element={<Cart />} />
        <Route path='/address' element={<AddAddress />} />
        <Route path='/address/payment' element={<Payment />} />
        <Route path='/paymentsuccess' element={<PaymentSuccess />} />
    </Routes>
    </>
  )
}

export default CartPage