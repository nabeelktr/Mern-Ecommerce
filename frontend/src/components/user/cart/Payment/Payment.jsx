import React, { useEffect, useState } from "react";
import CartPrice from "../price/CartPrice";
import { useLocation, useNavigate } from "react-router-dom";
import { List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import Axios from "../../../../axiosInterceptors/userAxios";
import {

  IdentificationIcon,
  UserCircleIcon,

} from "@heroicons/react/24/solid";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartId, setcartId] = useState();
  const [orderDetails, setOrderDetails] = useState();
  const [method, setmethod] = useState()

  const placeOrder = async () => {
    await Axios.post("/placeOrder", {
      orderDetails,
      paymentMode: "Cash on Delivery",
    });
    toast.success("Order Placed Successfully.");
    setOrderDetails();
    navigate("/home");
  };

  const fetchdata = async () => {
    setOrderDetails(location.state);
    setcartId(location.state.cartId);
  };

  const checkoutHandler = async () => {

    const { data: { key } } = await Axios.get("/getkey")

    const { data: { order } } = await Axios.post("/checkout", {
       price: orderDetails.totalOfferPrice
    })

    const options = {
      key,
      amount: orderDetails.totalOfferPrice,
      currency: "INR",

      order_id: order.id,
      prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9999999999"
      },
      notes: {
          "address": "Razorpay Corporate Office"
      },
      theme: {
          "color": "#121212"
      },
      handler:async function (response){
        const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = response
         //alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature)
      const {data} = await Axios.post('/paymentverification', {orderDetails, razorpay_payment_id, razorpay_order_id, razorpay_signature})
       navigate('/cart/paymentsuccess', {state: data})
      }
        
  };
  
  const razor = new window.Razorpay(options);
  razor.open();
 
}
  
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div className="flex pt-24">
      <div className="flex p-2 w-8/12  border-r min-h-screen justify-end">
        <div className="h-auto  w-3/4 p-2 mt-20">
          <div className=" border items-center bg-white  font-serif ">
            <div className="flex">
          <List className="w-1/3 bg-blue-gray-100 p-0 text-black text-sm">
        <ListItem onClick={() => setmethod('cod')} 
        className="rounded-none p-6 "
        >
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Cash on Delivery
          </ListItem>
          <ListItem onClick={() => {
            setmethod('razorpay');
            checkoutHandler();
            }} className="rounded-none p-6" >
            <ListItemPrefix>
              <IdentificationIcon className="h-5 w-5" />
            </ListItemPrefix>
            RazorPay
          </ListItem>
          </List>
          {
            method === 'cod' ?
            
            <button
              onClick={placeOrder}
              className="flex rounded-sm items-center justify-center focus:outline-none mt-20  
            sm:text-base bg-blue-600 hover:bg-blue-700 m-4 py-2 w-full transition duration-150 ease-in"
              style={{ background: "#ff3c67" }}
            >
              <Typography className="mr-2 uppercase p-1 font-bold text-gray-100 text-sm">
                Place Order
              </Typography>
            </button>
            :
            <div className="items-center flex px-6">Choose a Payment method</div>
}
            </div>
          </div>
        </div>
      </div>
      <div className="w-4/12 ">
        {cartId && (
          <CartPrice cartId={cartId} addressChosen={true} payment={true} />
        )}
      </div>
    </div>
  );
};

export default Payment;