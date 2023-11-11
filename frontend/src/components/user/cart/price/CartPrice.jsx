import React, { useEffect, useState } from "react";
import Axios from "../../../../axiosInterceptors/userAxios";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

const CartPrice = ({cartId, addressChosen, payment}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState();

  const fetchdata = async () => {
    const response = await Axios.get(`/test/${cartId}`)
    const offerPrices = [];
    const prices = [];
    const items = [];
    response.data.table.map((data) => {
        const productQty = data.itemDetails.variants.find((variant) => variant.size === data.items.size);
        if(productQty.qty >= data.items.qty){
            offerPrices.push((data.itemDetails.offerPrice) * (data.items.qty));
            prices.push((data.itemDetails.price) * (data.items.qty));
            items.push(data.items);
        }
       
    })   
    const totalOfferPrice = offerPrices.reduce((a,b) => a+b, 0);
    const totalPrice = prices.reduce((a,b) => a+b, 0);
    setOrderDetails({
        totalPrice,
        totalOfferPrice,
        items,
    })
    };

    const continueCheckout = () => {
      setOrderDetails((prevOrderDetails) => {
        const updatedOrderDetails = {
          ...prevOrderDetails,
          shippingAddress: addressChosen,
          cartId: cartId,
        };
      navigate('/cart/address/payment', {state: updatedOrderDetails});
    })
  }

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="flex flex-col mt-32 items-start ml-4 " >
        <Typography className="uppercase text-xs font-bold m-2">Price details</Typography>
      <div className="mt-6 h-full  border bg-white p-6 shadow-sm md:mt-0 md:w-[60%] text-sm">
        <div className="mb-2 flex justify-between">
          <p className="text-gray-700">Total MRP</p>
          <p className="text-gray-700">&#8377; {orderDetails?.totalPrice}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-gray-700">Discount on MRP</p>
          <p className="text-teal-500">-&#8377; {orderDetails?.totalPrice - orderDetails?.totalOfferPrice}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700">Convinient Fee</p>
          <p className="text-gray-700">--</p>
        </div>
       
        <hr className="my-4" />
        <div className="flex justify-between ">
          <p className="text-sm font-bold">Total</p>
          <div className="">
            <p className="mb-1 text-sm font-bold ">&#8377; {orderDetails?.totalOfferPrice}</p>
          </div>
        </div>
     


        
         {
          payment ?
          ''
          :
          <button
        onClick={() =>
          {
            if(addressChosen){
              continueCheckout();
            }else if(location.state){
              alert('add address');
            }else
            { 
              navigate('/cart/address', {state: {orderDetails, cartId}});
            }
          } 
         }
        className="bg-[#ff3c67]  mt-6 w-full rounded-md py-1.5 font-medium text-blue-50 hover:bg-blue-600 uppercase">
          { location.state ? 'Continue' : 'Place order'}
        </button>
        }
       
      </div>
    </div>
  );
};

export default CartPrice;
