import { Typography } from "@material-tailwind/react";
import { ErrorMessage, Form, Formik, useField } from "formik";
import React from "react";
import Axios from '../../../../axiosInterceptors/userAxios'
import { Toaster, toast } from "sonner";

const ApplyCoupon = ({orderDetails, setcoupon, coupon}) => {


  const MyTextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (

        <input
          {...field}
          {...props}
          className={` md:text-sm placeholder-gray-400 pl-4 pr-4 border  w-full py-2 focus:outline-none  ${
            meta.touched && meta.error ? 'border-red-500' : 'focus:border-black'
          }`}
        />

  
    );
  };

  const handleSubmit = async(values, action) => {
    try{
    const {data} = await Axios.post('/checkcoupon', {values, price: orderDetails.totalOfferPrice})
      setcoupon(data[0]);
      toast.success('Coupon Applied');
      action.resetForm();
    }catch{
      action.setFieldError('code', 'Invalid coupon');
    }
  }


  return (
    <div className="flex flex-col -mb-20 items-start md:ml-4 ml-2 ">
      <Toaster position="top-center" />
      <Typography className="uppercase md:text-xs text-[0.6rem] font-bold m-2">
        Apply Coupon
      </Typography>
      <div className=" h-full  border bg-white md:p-6 p-2 shadow-sm md:mt-0 md:w-[60%] w-[95%] md:text-sm text-[0.5rem] flex">
        <Formik 
        initialValues={{
          code: '',
        }}
        onSubmit={handleSubmit}
        >
          <Form className="w-full ">
        <div className="relative flex">
        
      {coupon &&
        <button
                  onClick={() => {
                    setcoupon();
                  }}
                  type="button"
                  className="absolute bg-white rounded-md p-1 h-6  md:right-24 right-16 md:top-[0.4rem] top-[0.2rem] text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                }

        <MyTextField 
        disabled={coupon}
        type='text'
        name='code'
        placeholder={coupon ? coupon.couponCode :'Coupon Code'}
        />
        <button 
        disabled={coupon}
        type="submit"
        className="bg-[#ff3c67] border-white md:text-xs md:ml-3 ml-1 rounded-sm py-[0.5rem] px-3 font-medium text-white uppercase">
              {coupon ? 'Applied' : 'Apply'}
            </button>
          </div>
        <ErrorMessage
                name="code"
                component="div"
                className="text-xs text-red-600 mb-2 mt-1"
              />
          </Form>
        </Formik>

      </div>
    </div>
  );
};

export default ApplyCoupon;
