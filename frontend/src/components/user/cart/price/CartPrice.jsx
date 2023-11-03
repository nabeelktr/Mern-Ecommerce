import React, { useEffect, useState } from "react";
import Axios from "../../../../axiosInterceptors/userAxios";

const CartPrice = ({cartId}) => {
  const [orderDetails, setOrderDetails] = useState();
  const fetchdata = async () => {


    const response = await Axios.get(`/test/${cartId}`)

    const offerPrices = [];
    const prices = [];
    response.data.table.map((data) => {
        const productQty = data.itemDetails.variants.find((variant) => variant.size === data.items.size);
        if(productQty.qty >= data.items.qty){
            offerPrices.push((data.itemDetails.offerPrice) * (data.items.qty));
            prices.push((data.itemDetails.price) * (data.items.qty));
        }
       
    })
    
    const totalOfferPrice = offerPrices.reduce((a,b) => a+b, 0);
    const totalPrice = prices.reduce((a,b) => a+b, 0);
    setOrderDetails({
        totalPrice,
        totalOfferPrice,
    })
    
  };
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="flex flex-col mt-32 items-center " >
      <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-[80%] text-sm">
        <div className="mb-2 flex justify-between">
          <p className="text-gray-700">Total MRP</p>
          <p className="text-gray-700">&#8377; {orderDetails?.totalPrice}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-gray-700">Discount on MRP</p>
          <p className="text-gray-700 text-teal-500">-&#8377; {orderDetails?.totalPrice - orderDetails?.totalOfferPrice}</p>
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
        <button className="bg-[#ff3c67]  mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600 uppercase">
          Place order
        </button>
      </div>
    </div>
  );
};

export default CartPrice;
