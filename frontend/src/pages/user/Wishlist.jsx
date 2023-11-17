import React, { useEffect } from 'react'
import Navbar from '../../components/user/Navbar';
import Wish from '../../components/user/wishlist/Wishlist';
const Wishlist = () => {

    useEffect(() => {
      document.title = 'Wishlist';
    })
  return (
    <>
    <Navbar />
    <Wish />
    </>
  )
}

export default Wishlist