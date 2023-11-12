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
    <div className="p-4 m-4 border  justify-center shadow-sm">
      <div className="border-b p-4  px-8 font-bold">
        <p>Order History</p>
      </div>
      <div className="p-4  w-full px-10 flex flex-col justify-start gap-10 mt-4 ">
        {orders &&
          orders.map((order, i) => (
            <div key={i} className="cursor-pointer hover:shadow-md" onClick={() => navigate('/profile/viewOrder', {state: order})}>
            <div className="p-4 bg-gray-50 w-full border" >
            <div className="flex m-4 gap-10">
                <div>
                    <p className="text-sm font-bold">Order Date</p>
                    <p className="text-sm ">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                    <p className="text-sm font-bold">Total Price</p>
                    <p className="text-sm ">&#x20B9;&nbsp;{order.totalOfferPrice}</p>
                </div>
                <div>
                    <p className="text-sm font-bold">Order Status</p>
                    <p className="text-sm ">{(order.status)}</p>
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
