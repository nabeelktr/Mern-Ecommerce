import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import Axios from '../../../../axiosInterceptors/userAxios'
import { toast } from "sonner";

const CouponModal = ({ modal, closeModal }) => {

    const [coupons, setcoupons] = useState([])

    const fetchdata = async () =>{
        const { data } = await Axios.get("/admin/userCoupons");
        setcoupons(data)
    }

    useEffect(()=>{
        fetchdata();
    },[])
  return (
    <Transition.Root show={modal} as={Fragment} >
      <Dialog as="div" className="relative z-10 " onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity " />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg max-h-[40rem] overflow-scroll">
                <div className="flex flex-col shadow-sm border  bg-white  px-4 sm:px-6 md:px-8 lg:px-10 py-8  w-full  font-poppins">
                    <div className="text-sm font-semibold uppercase">Available Coupons</div>
                    <div className="pt-3">
                    {coupons[0] ?
              coupons.map((coupon, i) => (
                <div className="container md:mx-auto p-1" key={i}>
                  <div className="bg-gradient-to-br from-[#ff3c67] to-orange-200 text-white text-center  md:py-2 md:px-10 rounded-lg shadow-sm relative">
                   
                    <span className="text-[0.5rem] md:text-xs  font-semibold ">
                      {coupon.percentage}% flat off for purchases above &#8377;{coupon.minRate}*.
                    </span>
                    
                    <div className="flex items-center justify-center space-x-2 mb-1 text-[0.5rem] md:text-xs md:mt-2 ">
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
              ))
            :
            <p className="text-sm mt-4 ">No coupons found.</p>
            }
                    </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CouponModal;
