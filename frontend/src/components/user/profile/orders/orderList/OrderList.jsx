import { useEffect, useState } from "react";
import Axios from "../../../../../axiosInterceptors/userAxios";
import OrderProductCard from "../orderCard/OrderProductCard";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState();


  const fetchdata = async () => {
    const response = await Axios.get("/userOrders");
    setOrders(response.data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="p-4  m-4 border w-full  justify-center shadow-sm font-poppins tracking-wide">
      <div className="border-b md:p-4  md:px-8 font-semibold tracking-widest text-[0.7rem] md:text-sm">
        <p>Order History</p>
      </div>
      <div className="md:p-4  w-full md:px-10 flex flex-col justify-start md:gap-10 gap-1 mt-4 ">
        {orders &&
          orders.map((order, i) => (
            <div key={i} className="cursor-pointer hover:shadow-md" onClick={() => navigate('/profile/viewOrder', {state: order})}>
            <div className="md:p-4 p-1 bg-gray-50 w-full border" >
            <div className="flex md:m-4 gap-3 md:gap-10">
                <div>
                    <p className="text-[0.6rem] md:text-sm font-semibold">Order Date</p>
                    <p className="text-[0.6rem] md:text-sm ">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                    <p className="text-[0.6rem] md:text-sm font-semibold">Total Price</p>
                    <p className="text-[0.6rem] md:text-sm ">&#x20B9;&nbsp;{order.totalOfferPrice}</p>
                </div>
                <div>
                    <p className="text-[0.6rem] md:text-sm font-semibold">Order Status</p>
                    <p className={`text-[0.6rem] md:text-sm ${order.status === 'Cancelled' ? 'text-red-800' : order.status === 'Delivered' ? 'text-green-500' : ''} `}>{(order.status)}</p>
                </div>
            </div>
              {order.items.map((order, y) => (

                    <OrderProductCard order={order} key={y} />
              ))}
            </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrderList;
