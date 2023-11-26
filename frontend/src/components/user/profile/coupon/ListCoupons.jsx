import React, { useEffect, useState } from "react";
import Axios from "../../../../axiosInterceptors/userAxios";
import { Toaster, toast } from "sonner";
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
    <div className="p-4 m-4 border md:w-full w-[16rem] justify-center shadow-sm font-poppins ">
      <Toaster />
      <div className="border-b md:p-4 md:text-sm text-[0.7rem] md:px-8 font-semibold tracking-widest">
        <p>Coupons</p>
      </div>
      <div className="py-4  md:w-3/4 w-full md:px-10 flex flex-col justify-start md:gap-10  md:mt-4 ">
        <div className="">
          <div className="md:p-4 md:w-full  w-[14rem] ">
            {coupons &&
              coupons.map((coupon, i) => (
                <div className="container md:mx-auto p-4" key={i}>
                  <div className="bg-gradient-to-br from-[#ff3c67] to-orange-200 text-white text-center  md:py-5 md:px-20 rounded-lg shadow-sm relative">
                   
                    <span className="text-[0.5rem] md:text-xs  font-semibold ">
                      {coupon.percentage}% flat off for purchases above &#8377;{coupon.minRate}*.
                    </span>
                    
                    <div className="flex items-center justify-center space-x-2 mb-2 text-[0.5rem] md:text-xs md:mt-2 ">
                        <div className="">
                      <span
                        id="cpnCode"
                        className="border-dashed border text-white md:px-4 px-1 md:py-2 py-1 rounded-l"
                      >
                        {coupon.couponCode}
                        
                      </span>
               
                      </div>
                      
                      <span
                        onClick={() => {
                          navigator.clipboard.writeText(coupon.couponCode);
                          toast.success('Copied to clipboard',{invert: true})
                        }
                            
                            }
                        id="cpnBtn"
                        className="border border-white bg-white text-purple-600 md:px-4 px-1 md:py-2 py-1 rounded-r cursor-pointer"
                      >
                        Copy Code
                      </span>
                     
                    </div>
                    
                    <p className="text-[0.5rem] md:text-xs">Valid Till: {new Date(coupon.expiry).toLocaleDateString()}</p>
                    <span className="text-[0.5rem] md:text-xs">
                      *This is only applicable for HDFC credit card.</span>

                    <div className="md:w-12 w-8 md:h-12 h-8 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6"></div>
                    <div className="md:w-12 w-8 md:h-12 h-8 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6"></div>
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
