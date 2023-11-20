import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const PaymentSuccess = () => {
  const [reference, setreference] = useState()
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setreference(location.state)
  },[])
  return (
    <div className='text-lg font-semibold flex flex-col justify-center items-center min-h-screen font-poppins'>
      <p>Your Order has been Placed</p> 
      {reference && <p className='font-normal text-sm'>Ref : {reference?.razorpay_payment_id}</p>}
       <p 
       className='text-xs mt-1 font-light cursor-pointer text-blue-800 hover:underline'
       onClick={() => navigate('/profile/vieworders')} 
        >View Order details</p>
    </div>
  )
}

export default PaymentSuccess