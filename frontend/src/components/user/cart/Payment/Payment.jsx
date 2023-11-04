import React, { useEffect, useState } from "react";
import CartPrice from "../price/CartPrice";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import Axios from '../../../../axiosInterceptors/userAxios'

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartId, setcartId] = useState();
  const [orderDetails, setOrderDetails] = useState();

  const placeOrder = async() => {
    await Axios.post('/placeOrder', {orderDetails, paymentMode: 'Cash on Delivery'})
    toast.success('Order Placed Successfully.');
    setOrderDetails();
    navigate('/home');
  }

  const fetchdata = async() => {
    setOrderDetails(location.state);
    setcartId(location.state.cartId);
  }

  useEffect(() => {
    fetchdata();
  },[])
  return (
    <div className="flex pt-24">
      <div className="flex p-2 w-8/12  border-r min-h-screen justify-between">
      <div className="flex flex-col shadow-sm border items-center bg-white  px-4 sm:px-6 md:px-8 lg:px-10 py-8  w-full  font-serif">
        Cash On Delivery
        <button
          onClick={placeOrder}
          className="flex rounded-sm items-center justify-center focus:outline-none mt-20  
            sm:text-base bg-blue-600 hover:bg-blue-700  py-2 w-full transition duration-150 ease-in"            
          style={{ background: "#ff3c67" }}
        >
          <Typography className="mr-2 uppercase p-1 font-bold text-gray-100 text-sm">Place Order</Typography>
         </button>
      </div>
      </div>
      <div className="w-4/12 h-full">
        {cartId && <CartPrice cartId={cartId} addressChosen={true} payment={true} />}
      </div>
    </div>
  );
};

export default Payment;
