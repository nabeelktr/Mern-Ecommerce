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
      className="m-2 items-center bg-gray-300 hover:bg-gray-400 text-gray-200 font-light md:py-2 py-1 md:px-4 px-2 rounded font-poppins tracking-wider md:text-sm text-[0.6rem] "
    >
      Cancel Order
    </Button>
  );
  return (
    <>
      <Toaster />
      <div className="w-full md:px-24 pl-2 md:py-4 py-2 tracking-wide font-poppins">
        <div className=" md:px-10 md:pt-10 w-[16.5rem] md:w-full md:m-4 border bg-gray-50 justify-center shadow-sm ">
          <div className="p-4 px-8 md:4 md:mb-10 ">
            <OrderStepper activeStep={activeStep} />
          </div>
          <div className="flex m-4 md:mb-6 border-t md:gap-28 gap-5 border-gray-500  md:pt-10 pt-4">
            <div className="">
              <p className="md:text-sm text-[0.6rem] font-semibold">
                Order Date
              </p>
              <p className="md:text-sm text-[0.6rem] font-light">
                {new Date(order?.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="md:text-sm text-[0.6rem] font-semibold">
                Total Price
              </p>
              <p className="md:text-sm text-[0.6rem] font-light">
                &#x20B9;&nbsp;{order?.totalOfferPrice}
              </p>
            </div>
            <div>
              <p className="md:text-sm text-[0.6rem] font-semibold">
                Payment Mode
              </p>
              <p className="md:text-sm text-[0.6rem] font-light">
                {order?.paymentMethod}
              </p>
            </div>
            <div className="flex flex-col items-start ">
              <p className="md:text-sm text-[0.6rem] font-semibold">
                Order Status
              </p>
              <p className="md:text-sm text-[0.6rem] font-light">
                {order?.status}
              </p>
            </div>
          </div>
          <div className="flex md:mb-6 m-4 md:gap-32 gap-5">
            {order?.coupon?.couponCode && (
              <div className="flex flex-col items-start">
                <p className="md:text-sm text-[0.6rem] font-semibold">Coupon</p>
                <p className="md:text-sm text-[0.6rem] font-light">
                  {" "}
                  {order.coupon.couponCode}
                </p>
              </div>
            )}
            {order?.wallet && (
              <div className="flex flex-col items-start ">
                <p className="md:text-sm text-[0.6rem] font-semibold">Wallet</p>
                <p className="md:text-sm text-[0.6rem] font-light">
                  {" "}
                  &#x20B9;&nbsp;{order.wallet}
                </p>
              </div>
            )}
          </div>
          <div className="flex m-4 md:mb-10 justify-between ">
            <div className="w-2/4">
              <p className="md:text-sm text-[0.6rem] font-semibold">
                Shipping Address
              </p>
              <p className="md:text-sm text-[0.6rem] font-light">
                {order?.shippingAddress.name}
              </p>
              <p className="md:text-sm text-[0.6rem] font-light">
                {order?.shippingAddress.address},{" "}
                {order?.shippingAddress.pincode}.{" "}
              </p>
              <p className="md:text-sm text-[0.6rem] font-light">
                {order?.shippingAddress.location},{" "}
                {order?.shippingAddress.district},{" "}
                {order?.shippingAddress.state}.{" "}
              </p>
            </div>
          </div>
          <div className="md:mb-10 md:px-[8rem] ">
            {order &&
              order.items.map((order, y) => (
                <OrderProductCard order={order} key={y} />
              ))}
          </div>
          <div className="flex justify-end mb-2">
            {order &&
            order.status === "Delivered" &&
            Math.floor(
              (new Date() - new Date(order.updatedAt)) / (24 * 60 * 60 * 1000)
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
