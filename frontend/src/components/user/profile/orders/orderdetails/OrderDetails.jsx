import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import OrderStepper from "./OrderStepper";
import OrderProductCard from "../orderCard/OrderProductCard";
import { Button } from "@material-tailwind/react";
import CancelModal from "../cancelModal/CancelModal";
import { Toaster } from "sonner";

const OrderDetails = () => {
  const [modal, setmodal] = useState(false);
  const [activeStep, setactiveStep] = useState();
  const [order, setorder] = useState();
  const location = useLocation();
  const fetchdata = () => {
    const order = location.state;
    setorder(order);

    if (order.status === "Pending") setactiveStep(0);
    if (order.status === "Processing") setactiveStep(1);
    if (order.status === "Shipped") setactiveStep(2);
    if (order.status === "Delivered") setactiveStep(3);
  };

  const closeModal = () => {
    setmodal(false);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const cancelButton = () => (
    <Button
      onClick={() => setmodal(true)}
      variant="gradient"
      className="m-2 items-center bg-gray-300 hover:bg-gray-400 text-gray-200 font-light py-2 px-4 rounded font-poppins tracking-wider"
    >
      Cancel Order
    </Button>
  );
  return (
    <>
    <Toaster />
      <div className=" w-full px-24 py-4 tracking-wide font-poppins">
        <div className=" px-10 pt-10 m-4 border bg-gray-50 justify-center shadow-sm ">
          <div className="p-4 px-8 mb-10 ">
            <OrderStepper activeStep={activeStep} />
          </div>
          <div className="flex m-4 mb-6  justify-between  border-t border-gray-500  pt-10">
            <div className="">
              <p className="text-sm font-semibold">Order Date</p>
              <p className="text-sm ">
                {new Date(order?.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold">Total Price</p>
              <p className="text-sm ">&#x20B9;&nbsp;{order?.totalOfferPrice}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Payment Mode</p>
              <p className="text-sm ">{order?.paymentMethod}</p>
            </div>
            <div className="flex flex-col items-center ">
              <p className="text-sm font-semibold">Order Status</p>
              <p className="text-sm ">{order?.status}</p>
            </div>
          </div>
          <div className="flex m-4 mb-10 justify-between ">
            <div className="w-2/4">
              <p className="text-sm font-semibold">Shipping Address</p>
              <p className="text-sm ">{order?.shippingAddress.name}</p>
              <p className="text-sm ">
                {order?.shippingAddress.address},{" "}
                {order?.shippingAddress.pincode}.{" "}
              </p>
              <p className="text-sm ">
                {order?.shippingAddress.location},{" "}
                {order?.shippingAddress.district},{" "}
                {order?.shippingAddress.state}.{" "}
              </p>
            </div>
          </div>
          <div className="mb-10 px-[8rem] ">

            {order &&
              order.items.map((order, y) => (
                <OrderProductCard order={order} key={y} />
              ))}
              
          </div>
              <div className="flex justify-end mb-2">
          {order &&
          order.status === "Delivered" &&
          Math.floor(
            (Date.now() - new Date(order.createdAt)) / (24 * 60 * 60 * 1000)
          ) <= 7 &&
          order.paymentMethod === "RazorPay"
            ? cancelButton()
            : order &&
              order.status !== "Delivered" &&
              order.status !== "Cancelled"
            ? cancelButton()
            : ""}
            </div>
        </div>
      </div>
      {modal && (
        <CancelModal id={order._id} modal={modal} closeModal={closeModal} />
      )}
    </>
  );
};

export default OrderDetails;
