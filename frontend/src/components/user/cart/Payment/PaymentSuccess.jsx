import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const PaymentSuccess = () => {
  const [reference, setreference] = useState()
  const location = useLocation();

  useEffect(() => {
    setreference(location.state)
  },[])
  return (
    <div className='text-lg font-semibold flex flex-col justify-center items-center min-h-screen'>
      <p>Your Order has been Placed</p> 
       <p className='font-normal text-sm'>Ref : {reference?.razorpay_payment_id}</p>
    </div>
  )
}

export default PaymentSuccess