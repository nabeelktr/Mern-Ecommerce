import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "../../../axiosInterceptors/axios";
import OrderProductCard from "../../user/profile/orders/orderCard/OrderProductCard";
import OrderStepper from "../../user/profile/orders/orderdetails/OrderStepper";
import { Toaster, toast } from "sonner";
import { Button } from "@material-tailwind/react";

const OrderDetailsAdmin = () => {
  const location = useLocation();
  const [order, setorder] = useState();
  const [activeStep, setactiveStep] = useState();

  const fetchdata = async () => {
    const { data } = await Axios.get(`/admin/getuserorder/${location.state}`);
    setorder(data);
    if (data.status === "Pending") setactiveStep(0);
    if (data.status === "Processing") setactiveStep(1);
    if (data.status === "Shipped") setactiveStep(2);
    if (data.status === "Delivered") setactiveStep(3);
  };

  const cancelOrder = async (id, userID) => {
    try {
      toast("Are you sure you want to cancel this Order ?", {
        action: {
          label: "Yes, Iam Sure",
          onClick: async () => {
            await Axios.post("/cancelorder", {
              id: order._id,
              userID: order.userId,
            });
            fetchdata();
          },
        },
      });
    } catch {
      toast.warning("This Order cannot be cancelled");
    }
  };

  const cancelButton = () => (
    <Button
      onClick={() => cancelOrder()}
      variant="gradient"
      className="m-2 items-center bg-gray-300 hover:bg-gray-400 text-gray-200 font-light py-2 px-4 rounded font-poppins tracking-wider"
    >
      Cancel Order
    </Button>
  );

  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <section className="  p-3 sm:p-5 antialiased ">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
        <div>
          <p className="text-sm font-bold uppercase my-6 p-2">Order details</p>
        </div>
        {/* <!-- Start coding here --> */}
        <div className="bg-white  relative shadow-md sm:rounded-lg overflow-hidden">
          <>
            <Toaster position="top-center" />
            <div className=" w-full px-24 py-4 tracking-wide font-poppins">
              <div className=" px-10 pt-10 m-4   justify-center ">
                <div className="p-4 px-8 mb-10 ">
                  <OrderStepper activeStep={activeStep} />
                </div>
                <div className="flex m-4 mb-6 gap-40 border-t border-gray-500  pt-10">
                  <div className="">
                    <p className="text-sm font-semibold">Order Date</p>
                    <p className="text-sm ">
                      {new Date(order?.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Total Price</p>
                    <p className="text-sm ">
                      &#x20B9;&nbsp;{order?.totalOfferPrice}
                    </p>
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
                <div className="flex mb-6 w-full m-4 gap-40">
                  {order?.coupon?.couponCode && (
                    <div className="flex flex-col items-start ">
                      <p className="text-sm font-semibold">Coupon</p>
                      <p className="text-sm ">
                        {" "}
                        {`${order.coupon.couponCode}(${order.coupon.percentage}%)`}
                      </p>
                    </div>
                  )}
                  {order?.wallet && (
                    <div className="flex flex-col items-start">
                      <p className="text-sm font-semibold">Wallet</p>
                      <p className="text-sm font-light"> &#x20B9;&nbsp;{order.wallet}</p>
                    </div>
                  )}
                </div>

                <div className="flex m-4 mb-10 justify-between w-1/4">
                  <div className="">
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
                    (new Date() - new Date(order.updatedAt)) /
                      (24 * 60 * 60 * 1000)
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
          </>
        </div>
      </div>
    </section>
  );
};

export default OrderDetailsAdmin;
