import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CartPrice from "../price/CartPrice";
import AddressForm from "./addressForm/AddressForm";
import AddressList from "./listAddress/AddressList";

const AddAddress = () => {
  const [coupons, setcoupons] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const [cartId, setcartId] = useState();
  const [addressChosen, setAddressChosen] = useState();
  const [refreshKey, setRefreshKey] = useState(0);
  const [modal, setmodal] = useState(false);

  const closeModal = () => {
    setmodal(false)
  }

  useEffect(() => {
    if (!location.state) {
      navigate("/cart");
    } else {
      setcartId(location.state.cartId);
      setcoupons(location.state.coupon);
    }
  }, []);

  return (
    <>
      <div className="flex pt-24">
        <div className="flex md:p-2 md:w-8/12 w-7/12 border-r min-h-screen justify-end">
          <div className=" md:m-2  md:w-1/2  h-full mt-4 m-1">
            <AddressList
              setAddressChosen={setAddressChosen}
              setmodal={setmodal}
              key={refreshKey}
            />
          </div>
        </div>
        <div className="md:w-4/12 w-5/12 h-full">
          {" "}
          {cartId && (
            <CartPrice
              cartId={cartId}
              addressChosen={addressChosen}
              coupons={coupons}
            />
          )}
        </div>
      </div>

      <AddressForm
        setRefreshKey={setRefreshKey}
        refreshKey={refreshKey}
        modal={modal}
        closeModal={closeModal}
      />

    </>
  );
};

export default AddAddress;
