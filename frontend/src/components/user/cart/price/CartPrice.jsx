import React, { useEffect, useState } from "react";
import Axios from "../../../../axiosInterceptors/userAxios";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import ApplyCoupon from "../../profile/coupon/ApplyCoupon";
import { toast } from "sonner";

const CartPrice = ({cartId, addressChosen, payment, coupons, wallet}) => {
  const [coupon, setcoupon] = useState()
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
    let totalOfferPrice = offerPrices.reduce((a,b) => a+b, 0);
    const totalPrice = prices.reduce((a,b) => a+b, 0);

    if(coupon){
      totalOfferPrice = totalOfferPrice - (totalOfferPrice * (coupon.percentage / 100))
    }else if(coupons){
      setcoupon(coupons);
      totalOfferPrice = totalOfferPrice - (totalOfferPrice * (coupons.percentage / 100))
    }
    if(wallet){
      totalOfferPrice -= wallet;
    }
    if(totalOfferPrice < 0){
      toast.warning('Product is out of Stock');
      navigate('/cart')
    }
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
          coupon: coupon ? {couponId: coupon._id, couponCode: coupon.couponCode, percentage: coupon.percentage} : false,
        };
        
      navigate('/cart/address/payment', {state: {updatedOrderDetails, coupon}});
    })
  }
  
  useEffect(() => {

    fetchdata();
  }, [coupon]);

  return (
    <>
    {location.state? '' : <ApplyCoupon orderDetails={orderDetails} setcoupon={setcoupon} coupon={coupon} />}
    <div className="flex flex-col mt-32 items-start md:ml-4 ml-2 " >
        <Typography className="uppercase md:text-xs text-[0.6rem] font-bold m-2  ">Price details</Typography>
      <div className=" h-full  border bg-white md:p-6 p-2 shadow-sm md:mt-0 md:w-[60%] w-[95%] md:text-sm text-[0.6rem]">
        <div className="md:mb-2 flex justify-between">
          <p className="text-gray-700">Total MRP</p>
          <p className="text-gray-700">&#8377; {orderDetails?.totalPrice}</p>
        </div>
        <div className="flex justify-between md:mb-2">
          <p className="text-gray-700">Discount on MRP</p>
          <p className="text-teal-500">-&#8377; {orderDetails &&( Math.floor(orderDetails.totalPrice - orderDetails.totalOfferPrice))}</p>
        </div>
        {coupon && 
        <div className="flex justify-between md:mb-2">
          <p className="text-teal-500">Coupon Applied!</p>
          <p className="text-teal-500">-{coupon?.percentage}%</p>

        </div>
        }
        {wallet && 
        <div className="flex justify-between md:mb-2">
          <p className="text-gray-700">Wallet</p>
          <p className="text-teal-500">-{wallet}</p>

        </div>
        }
        <div className="flex justify-between">
          <p className="text-gray-700">Convinient Fee</p>
          <p className="text-gray-700">--</p>
        </div>
       
        <hr className="md:my-4 my-2 " />
        <div className="flex justify-between ">
          <p className="md:text-sm text-[0.7rem] font-semibold">Total</p>
          <div className="">
            <p className="mb-1 md:text-sm text-[0.7rem] font-semibold ">&#8377; {orderDetails?.totalOfferPrice}</p>
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
              navigate('/cart/address', {state: {orderDetails, cartId, coupon}});
            }
          } 
         }
        className="bg-[#ff3c67] md:text-xs text-[0.6rem] mt-2 md:mt-6 w-full rounded-sm md:py-2.5 py-2 font-medium text-white uppercase">
          { location.state ? 'Continue' : 'Place order'}
        </button>
        }
       
      </div>
    </div>
    </>
  );
};

export default CartPrice;
