import {
  BanknotesIcon,
  CubeIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import DownloadReport from "./DownloadReport";
import Axios from '../../../axiosInterceptors/axios'
import InvoicePdf from "./InvoicePdf";
import FilterDash from "./FilterDash";

const AdminDashboard = () => {
  const [report, setreport] = useState()
  const [order, setorder] = useState({count: null, price: null})
  const [data, setdata] = useState({
    totalUsers: '',
    totalOrders: '',
    totalPrice: '',
    totalProducts: '',
  })
  const fetchdata = async() => {
    const {data} = await Axios.get('/admin/summary')
    const [{totalOfferPrice}] = data.totalPrice

    setdata({
      totalUsers: data.totalUsers,
      totalOrders: data.totalOrders,
      totalPrice: totalOfferPrice,
      totalProducts: data.totalProducts,
    })
  }

  useEffect(() => {
    fetchdata();
  }, [order])
  return (
    <>
      <div className="mt-8 flex justify-center p-2 gap-[41.3rem] items-center">
        <p className="text-sm font-bold uppercase ">My Dashboard</p>
        <div className="relative bg-white  flex justify-between border items-center shadow-sm  w-[19rem] rounded-sm">
          <span className="p-2 text-xs pl-3 uppercase w-1/4 font-semibold">Filter :</span>
          <span className="w-3/4">

          <FilterDash setorder={setorder} />
          </span>
        </div>
      </div>
      <div className="flex  justify-center gap-10 ">
        <div className="bg-white relative flex-col flex border border-t-[#ff3c67] border-t-[3px] shadow-sm antialiased h-32 p-3 mt-5 w-[15rem] rounded-sm">
          <span className="font-bold text-xl tracking-widest pb-2">{data.totalUsers}</span>
          <span className="font-semibold text-xs text-gray-500">
            Total Users
          </span>
          <UsersIcon className="absolute bottom-0 right-0 h-10 w-10 m-5 text-[#302d2e] " />
        </div>

        <div className="relative bg-white flex-col flex border border-t-[#ff3c67] border-t-[3px] shadow-sm antialiased h-32 p-3 mt-5 w-[15rem] rounded-sm">
          <span className="font-bold text-xl tracking-widest pb-2">{order.count ? order.count : data.totalOrders}</span>
          <span className="font-semibold text-xs text-gray-500">
            Total Orders
          </span>
          <ShoppingCartIcon className="absolute bottom-0 right-0 h-10 w-10 m-5 text-[#302d2e] " />
        </div>

        <div className="relative bg-white flex-col flex border border-t-[#ff3c67] border-t-[3px] shadow-sm antialiased h-32 p-3 mt-5 w-[15rem] rounded-sm">
          <span className="font-bold text-xl tracking-widest pb-2">&#8377;&nbsp;{order.price ? order.price : data.totalPrice}</span>
          <span className="font-semibold text-xs text-gray-500">
            Total Sales
          </span>
          <BanknotesIcon className="absolute bottom-0 right-0 h-10 w-10 m-5 text-[#302d2e] " />
        </div>

        <div className="bg-white relative flex-col flex border border-t-[#ff3c67] border-t-[3px] shadow-sm antialiased h-32 p-3 mt-5 w-[15rem] rounded-sm">
          <span className="font-bold text-xl tracking-widest pb-2">{data.totalProducts}</span>
          <span className="font-semibold text-xs text-gray-500">Total Products</span>
          <CubeIcon className="absolute bottom-0 right-0 h-10 w-10 m-5 text-[#302d2e] " />
        </div>
      </div>
      <div className="flex  justify-center gap-12 mt-10">
        {

          report ?
          <InvoicePdf setreport={setreport} report={report} />
          :
          <>
          <Chart />
        <DownloadReport setreport={setreport} />
          </>
        }
      </div>
    </>
  );
};

export default AdminDashboard;
