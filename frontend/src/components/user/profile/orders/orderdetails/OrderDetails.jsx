import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import OrderStepper from "./OrderStepper";
import OrderProductCard from "../orderCard/OrderProductCard";

const OrderDetails = () => {
  const [activeStep, setactiveStep] = useState();
  const [order, setorder] = useState();
  const location = useLocation();

  const fetchdata = () => {
    const order = location.state;
    setorder(order);
    
      if (order.status === 'Pending') setactiveStep(0);
      if (order.status === 'Processing') setactiveStep(1);
      if (order.status === 'Shipped') setactiveStep(2);
      if (order.status === 'Delivered') setactiveStep(3);
  };

  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div className="w-full px-24 py-4">
      <div className="p-10 m-4 border bg-gray-50 justify-center shadow-sm ">
        <div className="p-4 px-8 mb-10 ">
          <OrderStepper activeStep={activeStep} />
        </div>
        <div className="flex m-4 mb-6  justify-between  border-t border-gray-500  pt-10">
          <div className="">
            <p className="text-sm font-bold">Order Date</p>
            <p className="text-sm ">
              {new Date(order?.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm font-bold">Total Price</p>
            <p className="text-sm ">&#x20B9;&nbsp;{order?.totalOfferPrice}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Payment Mode</p>
            <p className="text-sm ">{order?.paymentMethod}</p>
          </div>
          <div className="flex flex-col items-center ">
            <p className="text-sm font-bold">Order Status</p>
            <p className="text-sm ">{order?.status}</p>
          </div>
        </div>
        <div className="flex m-4 mb-10 justify-between ">
          <div className="w-2/4">
            <p className="text-sm font-bold">Shipping Address</p>
            <p className="text-sm ">{order?.shippingAddress.name}</p>
            <p className="text-sm ">
              {order?.shippingAddress.address}, {order?.shippingAddress.pincode}
              .{" "}
            </p>
            <p className="text-sm ">
              {order?.shippingAddress.location},{" "}
              {order?.shippingAddress.district}, {order?.shippingAddress.state}.{" "}
            </p>
          </div>
        </div>
        <div className="mb-10">
          {order &&
            order.items.map((order, y) => (
              <OrderProductCard order={order} key={y} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
