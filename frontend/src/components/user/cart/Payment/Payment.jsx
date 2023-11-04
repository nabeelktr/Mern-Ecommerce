import React, { useEffect, useState } from "react";
import CartPrice from "../price/CartPrice";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartId, setcartId] = useState();
  const [addressChosen, setAddressChosen] = useState();
  const [orderDetails, setOrderDetails] = useState();


  const fetchdata = async() => {
    setOrderDetails(location.state);
    setcartId(location.state.cartId);
  }

  useEffect(() => {
    fetchdata();
  },[])
  return (
    <div className="flex pt-24">
      <div className="flex p-2 w-8/12  border-r min-h-screen justify-between"></div>
      <div className="w-4/12 h-full">
        {cartId && <CartPrice cartId={cartId} addressChosen={addressChosen} payment={true} />}
      </div>
    </div>
  );
};

export default Payment;
