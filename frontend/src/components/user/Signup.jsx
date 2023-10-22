import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik, useField } from "formik";
import { signupSchema } from "../yup";
import OtpInput from 'react-otp-input';

const MyTextField = ({ label, ...props }) => {
  
  const [field, meta] = useField(props);
  return (
    <>
      <label>
        {label}
        <input
          {...field}
          {...props}
          className={`mt-4 text-sm sm:text-base placeholder-gray-400 pl-4 pr-4 border  w-full py-2 focus:outline-none  ${
            meta.touched && meta.error ? "border-red-500" : "focus:border-black"
          }`}
        />
      </label>
    </>
  );
};

const OtpField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
 
  const [otp, setOtp] = useState('');
  const handleOtpChange = (newValue) => {
    field.onChange({ target: { name: field.name, value: newValue } });
    setOtp(newValue);
  };
  return (
    <>
      <label>
        {label}
        <span className="text-gray-500">Verify email</span>
        <OtpInput
          {...field}
          {...props}
          value={otp} 
          onChange={handleOtpChange}
          numInputs={6}
          renderSeparator={<span className="text-gray-400">&nbsp; - &nbsp;</span>}
          containerStyle={' my-4'}
          renderInput={(props) => <input {...props} 
          className='flex-1 text-sm sm:text-base placeholder-gray-400 border  py-2 focus:outline-none focus:border-black'
          />}
          
        />

        
      </label>
    </>
  );
};


const Signup = () => {
  const [otp, setotp] = useState('')
  const onSubmit = async (values, action) => {
   if(otp === ''){

     await new Promise((res, rej) => setTimeout(res, 2000));
     console.log(values);
     // action.resetForm();
     setotp(1234);
   }
   else {
     await new Promise((res, rej) => setTimeout(res, 2000));
     console.log(values);
   }
  };
  return (
    <div className="flex flex-col mb-10 bg-white  px-4 sm:px-6 md:px-8 lg:px-10 py-8  w-full max-w-md font-serif">
      <div className="font-medium  text-xl sm:text-2xl  text-gray-800">
        Signup
      </div>

      <div className="mt-10">
        <Formik
          initialValues={{
            email: "",
            phone: "",
            otp:'',
            password: "",
            confirmPassword: "",
          }}
          validationSchema={signupSchema}
          onSubmit={onSubmit}
        >
          {({           
            isSubmitting,
            /* and other goodies */
          }) => (
            <Form>
             { otp==='' ?
             <>
             <MyTextField type="email" name="email" placeholder="Email address"/>
              <ErrorMessage name="email" component="div" className="text-xs text-red-600 mb-2"/>

              <MyTextField type="text" name="phone" placeholder="Phone Number"/>
              <ErrorMessage name="phone" component="div" className="text-xs text-red-600 mb-2"/>

              <MyTextField type="password" name="password" placeholder="Password"/>
              <ErrorMessage name="password" component="div" className="text-xs text-red-600 mb-2"/>

              <MyTextField type="password" name="confirmPassword" placeholder="Confirm Password"/>
              <ErrorMessage name="confirmPassword" component="div" className="text-xs text-red-600 mb-2"/>
              </>
              :
              <>
              <OtpField type="number" name="otp"/>
              <ErrorMessage name="otp" component="div" className="text-xs text-red-600 mb-2"/>
              </>

            }

              <p className="mb-6 mt-10 text-xs flex justify-center text-gray-500">
                By continuing, I agree the
                <span style={{ color: "#ff3c67" }}>
                  &nbsp;Terms of use&nbsp;
                </span>{" "}
                &{" "}
                <span style={{ color: "#ff3c67" }}>
                  &nbsp;Privacy Policy&nbsp;
                </span>{" "}
              </p>

              <button
                type="submit"
                className={`flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700  py-2 w-full transition duration-150 ease-in ${
                  isSubmitting && "opacity-80"
                }`}
                style={{ background: "#ff3c67" }}
              >
                <span className="mr-2 uppercase font-medium">Continue</span>
              </button>

              <div className="flex items-center mb-10 mt-6">
                <div className="ml-auto ">
                  <a
                    href="#"
                    target="_blank"
                    className="inline-flex  text-blue-500 hover:text-blue-700 text-sm text-center"
                  >
                    <span className="ml-2">Login</span>
                  </a>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
