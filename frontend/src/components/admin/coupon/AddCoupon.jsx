import { ErrorMessage, Form, Formik, useField } from "formik";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Axios from "../../../axiosInterceptors/axios";
import { BeatLoader } from "react-spinners";
import { couponSchema } from "../../yup";
import Datepicker from "react-tailwindcss-datepicker";

const AddCoupon = () => {
  const MyTextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
      <div className="mb-4">
        <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">
          {label}
        </label>
        <input
          {...field}
          {...props}
          className={`bg-gray-50 mb-1 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500  ${
            meta.touched && meta.error ? "border-red-500" : "focus:border-black"
          }`}
        />
        <ErrorMessage
          name={field.name}
          component="div"
          className="text-xs text-red-600 mb-2 "
        />
      </div>
    );
  };

  const handleSubmit = async (values, action) => {
    if(value.startDate === null){
        action.setFieldError('startDate', 'Expiry field is required.')
    }else{
        try{

            values.startDate = value.startDate;
            values.expiry = value.endDate;
             await Axios.post("/admin/addCoupon", values);
            toast.success("Coupon added successful");
            action.resetForm();
        }catch{
            action.setFieldError('couponCode', 'Coupon code already exists')
        }
    }
  };

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  const location = useLocation();
  return (
    <section className=" dark:bg-gray-900 p-3 sm:p-5 antialiased ">
      <Toaster />
      <div className="relative mx-auto max-w-screen-xl px-4 lg:px-12">
        <div>
          <p className="text-sm font-bold uppercase my-6 p-2">
            {location.state ? "Edit " : "Add "}Coupon
          </p>
        </div>
        <div className=" bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow p-4">
          <Formik
            initialValues={{
              couponCode: "",
              startDate: '',
              expiry: '',
              percentage: "",
              minRate: "",
              maxRate: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={couponSchema}
          >
            {({ isSubmitting }) => (
              <Form className="pb-16">
                <MyTextField
                  name="couponCode"
                  type="String"
                  label="Coupon Code"
                />
                <MyTextField
                  name="percentage"
                  type="number"
                  label="Percentage (%)"
                />
                <div className="mb-4">

                <label className="block mb-1 text-sm font-bold text-gray-900 dark:text-white">
                  Expiry
                </label>
                <Datepicker
                  minDate={new Date()} 
                  displayFormat={"DD/MM/YYYY"} 
                  separator={" - "}
                  inputClassName={'border w-full p-[0.8rem] rounded-lg border-gray-300 bg-gray-50 text-xs '}
                  value={value}
                  onChange={handleValueChange}
                  />
                  <ErrorMessage name='startDate' component="div" className="text-xs text-red-600 mb-2 mt-1 " />
                </div>

                {/* <MyTextField name="startDate" type="date" label="Start Date" /> */}
                {/* <MyTextField name="expiry" type="date" label="Expiry" /> */}
                <MyTextField
                  name="minRate"
                  type="number"
                  label="Minimum Price"
                />
                <MyTextField
                  name="maxRate"
                  type="number"
                  label="Maximum Price"
                />
                {isSubmitting ? (
                  <div className="flex justify-center h-6 p-2  absolute bottom-4 right-4">
                    <BeatLoader color="#4299e1" />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="p-2  absolute bottom-4 right-4 bg-blue-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                  >
                    {location.state ? "Update " : "Add "} Coupon
                  </button>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default AddCoupon;
