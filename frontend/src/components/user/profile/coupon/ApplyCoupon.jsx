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
          className={` text-sm placeholder-gray-400 pl-4 pr-4 border  w-full py-2 focus:outline-none  ${
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
    <div className="flex flex-col -mb-20 items-start ml-4 ">
      <Toaster position="top-center" />
      <Typography className="uppercase text-xs font-bold m-2">
        Apply Coupon
      </Typography>
      <div className="mt-6 h-full  border bg-white p-6 shadow-sm md:mt-0 md:w-[60%] text-sm flex">
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
                  className="absolute bg-white rounded-md p-1 h-6 right-24 top-[0.4rem] text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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
        className="bg-[#ff3c67] border-white text-xs ml-3 rounded-sm py-[0.5rem] px-3 font-medium text-white uppercase">
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
