import React, { useEffect, useState } from "react";
import Axios from "../../../../axiosInterceptors/userAxios";
const ListCoupons = () => {
  const [coupons, setcoupons] = useState();


  const fetchdata = async () => {
    const { data } = await Axios.get("/admin/userCoupons");
    setcoupons(data);
  };
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div className="p-4 m-4 border  justify-center shadow-sm">
      <div className="border-b p-4  px-8 font-bold">
        <p>Coupons</p>
      </div>
      <div className="p-4  w-3/4 px-10 flex flex-col justify-start gap-10 mt-4 ">
        <div className="">
          <div className="p-4  w-full ">
            {coupons &&
              coupons.map((coupon, i) => (
                <div className="container mx-auto p-4" key={i}>
                  <div className="bg-gradient-to-br from-[#ff3c67] to-orange-200 text-white text-center py-5 px-20 rounded-lg shadow-sm relative">
                   
                    <span className="text-xs font-semibold ">
                      {coupon.percentage}% flat off for purchases above &#8377;{coupon.minRate}*.
                    </span>
                    
                    <div className="flex items-center space-x-2 mb-2 text-xs mt-2">
                        <div className="">
                      <span
                        id="cpnCode"
                        className="border-dashed border text-white px-4 py-2 rounded-l"
                      >
                        {coupon.couponCode}
                        
                      </span>
               
                      </div>
                      
                      <span
                        onClick={() => navigator.clipboard.writeText(coupon.couponCode)
                            
                            }
                        id="cpnBtn"
                        className="border border-white bg-white text-purple-600 px-4 py-2 rounded-r cursor-pointer"
                      >
                        Copy Code
                      </span>
                     
                    </div>
                    
                    <p className="text-xs">Valid Till: {new Date(coupon.expiry).toLocaleDateString()}</p>
                    <span className="text-xs">
                      *This is only applicable for HDFC credit card.</span>

                    <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6"></div>
                    <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6"></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCoupons;
