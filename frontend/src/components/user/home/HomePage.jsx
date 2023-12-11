import React, { useEffect, useState } from "react";
import Carousell from "./carousel/Carousell";
import Categories from "./categories/Categories";
import Footer from "./footer/Footer";
import { useLocation } from "react-router-dom";
import { Toaster, toast } from "sonner";

const HomePage = () => {

  const location = useLocation();
  const [toastShown, setToastShown] = useState(false);

  useEffect(() => {
    let msg = location.state;
    if (msg && !toastShown) {
      toast.success("Thank You.. your registration was Successful", {
        position: "top-center",
      });
      setToastShown(true);
      msg = null;
    }
  }, [])
  return (
    <div>
      <Toaster />
      <div className="pt-20 flex justify-center flex-col">
        <Carousell />
        <div className="font-poppins md:p-10 sm:p-2 flex  flex-col">
          <span className="uppercase tracking-widest font-semibold flex justify-center md:mb-6 md:text-3xl sm:text-sm lg:text-4xl sm:mb-2">
            Coupons to Grab
          </span>
          <div className="flex justify-between">
            <img src="/coupon1.webp" className="w-1/2" />
            <img src="/coupon2.webp" className="w-1/2" />
          </div>
        </div>
      </div>
        <Categories />
      <Footer />
    </div>
  );
};

export default HomePage;
