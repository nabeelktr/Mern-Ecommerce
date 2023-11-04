import React from 'react'
import Navbar from '../../components/user/Navbar'
import Cart from '../../components/user/cart/cart'
import { Route, Routes } from 'react-router-dom'
import AddAddress from '../../components/user/cart/addAddress/AddAddress'

const CartPage = () => {
  return (
    <>
    <Navbar />
    <Routes>
        <Route path='/' element={<Cart />} />
        <Route path='/address' element={<AddAddress />} />
    </Routes>
    </>
  )
}

export default CartPage