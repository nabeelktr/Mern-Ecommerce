import React, { useState } from "react";
import { ErrorMessage, Form, Formik, useField } from "formik";
import { signupSchema } from "../yup";
import OtpInput from "react-otp-input";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "../../axiosInterceptors/axios.js";
import { useNavigate } from "react-router-dom";

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
  const [otp, setOtp] = useState("");
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
          renderSeparator={
            <span className="text-gray-400">&nbsp; - &nbsp;</span>
          }
          containerStyle={" my-4"}
          renderInput={(props) => (
            <input
              {...props}
              className="flex-1 text-sm sm:text-base placeholder-gray-400 border  py-2 focus:outline-none focus:border-black"
            />
          )}
        />
      </label>
    </>
  );
};

const SignupForm = () => {
  const [otp, setotp] = useState();
  const [send, setsend] = useState(false);
  const navigate = useNavigate();

  const firstSubmit = async (values, action) => {
    try {
      const response = await Axios.post("/generateOtp", values);
      const { data } = response;
      setotp(data.code);
      toast.success("OTP was send to your email address", {
        position: toast.POSITION.TOP_CENTER,
      });
      setsend(true);
    } catch (error) {
      console.log(error); // Log the error
      action.setFieldError("email", "Email already exists");
    }
  };

  const onSubmit = async (values, action) => {
    try {
      if (otp === values.otp) {
        console.log(values);
        await Axios.post("/register", {
          values,
        }).then(() => {
          navigate("/login");
        });
      } else {
        action.setFieldError("otp", "Invalid OTP");
      }
    } catch {
      console.log("axios err");
    }
  };

  return (
    <div className="flex flex-col  bg-white  px-4 sm:px-6 md:px-8 lg:px-10 py-8  w-full max-w-md font-serif">
      <div className="font-medium  text-xl sm:text-2xl  text-gray-800">
        Signup
      </div>
      <ToastContainer />
      <div className="mt-10">
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            otp: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={signupSchema}
          onSubmit={send ? onSubmit : firstSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {!send ? (
                <>
                  <MyTextField
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-xs text-red-600 mb-2"
                  />

                  <MyTextField
                    type="email"
                    name="email"
                    placeholder="Email address"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-xs text-red-600 mb-2"
                  />

                  <MyTextField
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-xs text-red-600 mb-2"
                  />

                  <MyTextField
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-xs text-red-600 mb-2"
                  />

                  <MyTextField
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-xs text-red-600 mb-2"
                  />
                </>
              ) : (
                <>
                  <OtpField type="number" name="otp" />
                  <ErrorMessage
                    name="otp"
                    component="div"
                    className="text-xs text-red-600 mb-2 -mt-2"
                  />
                  <a
                    onClick={() => setsend(false)}
                    className="text-blue-500 underline text-xs cursor-pointer"
                  >
                    Change email
                  </a>
                </>
              )}

              <p className="mb-10 mt-10 text-xs flex justify-center text-gray-500">
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

              <div className="flex items-center mb-28  mt-6">
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

export default SignupForm;
