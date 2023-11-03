import React from 'react'
import Navbar from '../../components/user/Navbar'
import Cart from '../../components/user/cart/cart'
import { Route, Routes } from 'react-router-dom'

const CartPage = () => {
  return (
    <>
    <Navbar />
    <Routes>
        <Route path='/' element={<Cart />} />
    </Routes>
    </>
  )
}

export default CartPage