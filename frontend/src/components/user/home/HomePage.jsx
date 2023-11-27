import React from "react";
import Carousell from "./carousel/Carousell";
import Categories from "./categories/Categories";
import Footer from "./footer/Footer";

const HomePage = () => {
  return (
    <div>
      <div className="pt-20 flex justify-center flex-col">
        <Carousell />
        <div className="font-poppins md:p-10 sm:p-2 flex  flex-col">
          <span className="uppercase tracking-widest font-semibold flex justify-center md:mb-6 md:text-3xl sm:text-sm lg:text-4xl sm:mb-2">
            Coupons to Grab
          </span>
          <div className="flex justify-between">
            <img src="../../../../src/assets/coupon1.webp" className="w-1/2" />
            <img src="/src/assets/coupon2.webp" className="w-1/2" />
          </div>
        </div>
      </div>
        <Categories />
      <Footer />
    </div>
  );
};

export default HomePage;
