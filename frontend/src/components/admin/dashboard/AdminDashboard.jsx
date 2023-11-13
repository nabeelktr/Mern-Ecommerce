import {
  BanknotesIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import Chart from "./Chart";
import DatePick from "./DatePick";
import DownloadReport from "./DownloadReport";

const AdminDashboard = () => {
  return (
    <>
      <div className="flex  justify-center gap-10 ">
        <div className="bg-white relative flex-col flex border border-t-[#ff3c67] border-t-[3px] shadow-sm antialiased h-32 p-3 mt-10 w-[15rem] rounded-sm">
          <span className="font-bold text-xl tracking-widest pb-2">100</span>
          <span className="font-semibold text-xs text-gray-500">
            Total Users
          </span>
          <UserIcon className="absolute bottom-0 right-0 h-10 w-10 m-5 text-[#302d2e] " />
        </div>

        <div className="relative bg-white flex-col flex border border-t-[#ff3c67] border-t-[3px] shadow-sm antialiased h-32 p-3 mt-10 w-[15rem] rounded-sm">
          <span className="font-bold text-xl tracking-widest pb-2">230</span>
          <span className="font-semibold text-xs text-gray-500">
            Total Orders
          </span>
          <ShoppingCartIcon className="absolute bottom-0 right-0 h-10 w-10 m-5 text-[#302d2e] " />
        </div>

        <div className="relative bg-white flex-col flex border border-t-[#ff3c67] border-t-[3px] shadow-sm antialiased h-32 p-3 mt-10 w-[15rem] rounded-sm">
          <span className="font-bold text-xl tracking-widest pb-2">100</span>
          <span className="font-semibold text-xs text-gray-500">
            Total Sales
          </span>
          <BanknotesIcon className="absolute bottom-0 right-0 h-10 w-10 m-5 text-[#302d2e] " />
        </div>

        <div className="bg-white relative flex-col flex border border-t-[#ff3c67] border-t-[3px] shadow-sm antialiased h-32 p-3 mt-10 w-[15rem] rounded-sm">
          <span className="font-bold text-xl tracking-widest pb-2">50</span>
          <span className="font-semibold text-xs text-gray-500">New Users</span>
          <UserIcon className="absolute bottom-0 right-0 h-10 w-10 m-5 text-[#302d2e] " />
        </div>
      </div>
      <div className="flex  justify-center gap-12 mt-10">
        <Chart />
        <DownloadReport />
      </div>
    </>
  );
};

export default AdminDashboard;
