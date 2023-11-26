import React, { useEffect, useState } from "react";
import CartPrice from "../price/CartPrice";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import Axios from "../../../../axiosInterceptors/userAxios";
import {
  IdentificationIcon,
  UserCircleIcon,
  WalletIcon,
} from "@heroicons/react/24/solid";
import { Toaster, toast } from "sonner";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartId, setcartId] = useState();
  const [orderDetails, setOrderDetails] = useState();
  const [method, setmethod] = useState();
  const [wallet, setwallet] = useState();
  const [amount, setamount] = useState("");
  const [isWallet, setisWallet] = useState();
  const [refreshKey, setrefreshKey] = useState(0);
  const [totalPrice, settotalPrice] = useState();

  const clearData = () => {
    setisWallet();
    orderDetails.totalOfferPrice = totalPrice;
    setrefreshKey(refreshKey + 1);
  };
  const placeOrder = async () => {
    try {
      await Axios.post("/placeOrder", {
        orderDetails,
        paymentMode: method,
      });
      setOrderDetails();
      navigate("/cart/paymentsuccess");
    } catch (err) {
      if (err.response.status === 403) {
        toast.warning("Product is out of stock");
      } else {
        toast.warning("Not enough amount in wallet.");
      }
    }
  };

  const fetchdata = async () => {
    setOrderDetails(location.state.updatedOrderDetails);
    setcartId(location.state.updatedOrderDetails.cartId);
    settotalPrice(location.state.updatedOrderDetails.totalOfferPrice);
  };

  const fetchWallet = async () => {
    try {
      const { data } = await Axios.get("/wallet");
      setwallet(data);
    } catch (error) {
      console.error("Error fetching wallet:", error);
    }
  };

  const addWallet = async () => {
    if (parseInt(amount) != null && parseInt(amount) > 0) {
      if (parseInt(amount) < totalPrice) {
        let balance;
        try {
          if (!wallet) {
            const { data } = await Axios.get("/wallet");
            balance = data.balance;
          }

          if (
            (wallet && parseInt(amount) > wallet.balance) ||
            (balance && parseInt(amount) > balance)
          ) {
            toast.warning("Not enough amount in the wallet");
          } else {
            setisWallet(parseInt(amount));

            orderDetails.totalOfferPrice = totalPrice - amount;
            setrefreshKey(refreshKey + 1);
          }
        } catch (error) {
          console.error("Error adding to wallet:", error);
        } finally {
          setamount("");
        }
      } else {
        toast.warning(
          "You cannot Pay full amount through wallet by using RazorPay"
        );
        setamount("");
      }
    } else {
      toast.warning("Please enter a valid amount");
    }
  };

  const checkoutHandler = async () => {
    const {
      data: { key },
    } = await Axios.get("/getkey");

    const {
      data: { order },
    } = await Axios.post("/checkout", {
      price: orderDetails.totalOfferPrice,
    });

    const options = {
      key,
      amount: orderDetails.totalOfferPrice,
      currency: "INR",

      order_id: order.id,
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
      handler: async function (response) {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
          response;
        try {
          const { data } = await Axios.post("/paymentverification", {
            orderDetails,
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            wallet: isWallet ? isWallet : false,
          });
          navigate("/cart/paymentsuccess", { state: data });
        } catch {
          toast.warning("Product is out of stock");
        }
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div className="flex pt-24 font-poppins">
      <Toaster position="top-center" />
      <div className="flex md:p-2 md:w-8/12 w-7/12 border-r min-h-screen md:justify-end ">
        <div className="h-auto  md:w-3/4 w-full md:p-2 mt-20 p-1">
          <div className=" border items-center w-full bg-white  font-poppins ">
            <div className="md:flex w-full ">
              <List className="md:w-1/3  min-w-0 w-[13rem] bg-blue-gray-100 p-0 text-black md:text-sm text-[0.7rem] ">
                <ListItem
                  onClick={() => {
                    setmethod("Cash on Delivery");
                    clearData();
                  }}
                  className="rounded-none md:p-6 p-2 "
                >
                  <ListItemPrefix>
                    <UserCircleIcon className="md:h-5 h-4 md:w-5 w-4" />
                  </ListItemPrefix>
                  Cash on Delivery
                </ListItem>
                <ListItem
                  onClick={() => {
                    clearData();
                    setmethod("Wallet");
                    fetchWallet();
                  }}
                  className="rounded-none md:p-6 p-2 "
                >
                  <ListItemPrefix>
                    <WalletIcon className="md:h-5 h-4 md:w-5 w-4" />
                  </ListItemPrefix>
                  Wallet
                </ListItem>
                <ListItem
                  onClick={() => setmethod("Razorpay")}
                  className="rounded-none md:p-6 p-2"
                >
                  <ListItemPrefix>
                    <IdentificationIcon className="md:h-5 h-4 md:w-5 w-4" />
                  </ListItemPrefix>
                  RazorPay
                </ListItem>
              </List>
              {method === "Cash on Delivery" ||
              method === "Wallet" ||
              method === "Razorpay" ? (
                <div className="flex flex-col md:w-full w-[12rem] md:m-4 m-2 justify-between">
                  {method === "Wallet" && (
                    <div className="flex gap-4 border px-4 py-3 font-poppins md:text-sm text-[0.7rem] justify-center font-medium">
                      <span className="uppercase font-light">Balance : </span>
                      <span> &#8377; {wallet?.balance}</span>
                    </div>
                  )}
                  {method === "Cash on Delivery" && (
                    <div>
                      {/* <span className="text-sm uppercase font-poppins font-medium">Add Wallet Amount</span>
                  <div className="flex">
                  <input
                      type="number"
                      value={amount}
                      onChange={(e) => setamount(e.target.value)}
                      className="mt-1 peer h-full w-3/4 rounded-[3px] border border-blue-gray-200  bg-transparent px-3 py-2 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200
                placeholder-shown:border-t-blue-gray-200  focus:border-black  "
                    />
                    <Button
                      onClick={addWallet}
                      variant="gradient"
                      className="ml-2 mt-1 w-1/4 items-center bg-gray-300 hover:bg-gray-400 text-gray-200 font-light py-2 px-4 rounded font-poppins tracking-wider"
                    >
                      ADD
                    </Button>
                    </div> */}
                    </div>
                  )}
                  {method === "Razorpay" && (
                    <div>
                      <span className="md:text-sm text-[0.7rem] uppercase font-poppins font-medium">
                        Add Wallet Amount
                      </span>
                      <div className="flex py-2">
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setamount(e.target.value)}
                          className="mt-1 peer h-full w-3/4 rounded-[3px] border border-blue-gray-200  bg-transparent px-3 py-2 font-sans md:text-lg text-[0.7rem] font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200
                placeholder-shown:border-t-blue-gray-200  focus:border-black  "
                        />
                        <Button
                          onClick={addWallet}
                          variant="gradient"
                          className="ml-2 mt-1 w-1/4 items-center  bg-gray-300 hover:bg-gray-400 text-gray-200 font-light py-2 px-4 rounded font-poppins tracking-wider"
                        >
                          ADD
                        </Button>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() =>
                      method === "Razorpay" ? checkoutHandler() : placeOrder()
                    }
                    className="flex rounded-sm items-center justify-center focus:outline-none  md:h-10
                   bg-blue-600 hover:bg-blue-700  md:py-2 py-1 md:w-full w-[12rem] transition duration-150 ease-in"
                    style={{ background: "#ff3c67" }}
                  >
                    <Typography className="mr-2 uppercase p-1 font-bold text-gray-100 md:text-sm text-[0.7rem]">
                      Place Order
                    </Typography>
                  </button>
                </div>
              ) : (
                <div className="items-center flex md:px-6 p-2 md:text-sm text-[0.7rem] ">
                  Choose a Payment method
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="md:w-4/12 w-5/12">
        {cartId && (
          <CartPrice
            cartId={cartId}
            addressChosen={true}
            payment={true}
            coupons={location.state.coupon}
            wallet={isWallet}
            key={refreshKey}
          />
        )}
      </div>



    </div>
  );
};

export default Payment;
