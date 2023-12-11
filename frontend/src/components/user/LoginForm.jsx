/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import {
  ErrorMessage, Form, Formik, useField,
} from 'formik';
import { useNavigate } from 'react-router-dom';
import { LoginSchema } from '../yup';

// eslint-disable-next-line import/extensions
import Axios from '../../axiosInterceptors/axios.js';
import Axiosuser from '../../axiosInterceptors/userAxios.js';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/features/authSlice.js';


const MyTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (

    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label>
      <span className=" text-xs sm:text-sm tracking-wide text-gray-400">
        {label}
      </span>
      <input
        {...field}
        {...props}
        className={` text-sm sm:text-base placeholder-gray-400 pl-4 pr-4 border  w-full py-2 focus:outline-none  ${
          meta.touched && meta.error ? 'border-red-500' : 'focus:border-black'
        }`}
      />
    </label>

  );
};

const LoginForm = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const adminHandleSubmit = async (values, action) => {
    try {
      const response = await Axios.post('/admin/login', values, {withCredentials: true});
      dispatch(userLogin(response.data.userId));
      localStorage.setItem('adminToken', response.data.accessToken);
      navigate('/admin/dashboard');
    } catch (err) {
      if(err.response.status === 429){
        action.setFieldError('password',err.response.data.msg)
      }else{
      action.setFieldError('password', 'invalid data');
      }
    }
  };

  const handleSubmit = async (values, action) => {
    try {
      const response = await Axiosuser.post('/login', values);
      localStorage.setItem('userToken', response.data.accessToken);
      dispatch(userLogin(response.data.userId));
     // localStorage.setItem('userRefreshToken', response.data.refreshToken);
      navigate('/home');
    } catch (err) {
      console.log('err', err);
      if (err.response.status === 402) {
        action.setFieldError('email', 'invalid email');
      } else if (err.response.status === 403) {
        action.setFieldError('password', 'invalid password');
      }else if(err.response.status === 429){
        action.setFieldError('password',err.response.data.msg)
      }
    }
  };

  return (
    <div className="flex flex-col  bg-white  px-4 sm:px-6 md:px-8 lg:px-10 py-8  w-full max-w-md font-serif">
      
      <div className="font-medium  text-xl sm:text-2xl  text-gray-800">
        {props.value}
      </div>

      <div className="mt-10">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={props.value === 'Admin Login' ? adminHandleSubmit : handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <MyTextField
                name="email"
                type="email"
                label="Email Address"
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-xs text-red-600 mb-2"
              />

              <MyTextField
                name="password"
                type="password"
                label="Password"
                placeholder="Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-xs text-red-600 mb-2"
              />

              <p className="mb-8 mt-10 text-xs flex justify-center text-gray-500">
                By continuing, I agree the
                <span style={{ color: '#ff3c67' }}>
                  &nbsp;Terms of use&nbsp;
                </span>
                {' '}
                &
                {' '}
                <span style={{ color: '#ff3c67' }}>
                  &nbsp;Privacy Policy&nbsp;
                </span>
                {' '}
              </p>
              <div className="flex w-full mt-10">
                <button
                  type="submit"
                  className={`flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700  py-2 w-full transition duration-150 ease-in ${
                    isSubmitting && 'opacity-80'
                  }`}
                  style={{ background: '#ff3c67' }}
                >
                  <span className="mr-2 uppercase font-medium">Continue</span>
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="flex items-center mb-40 mt-10">
          <div className="flex ">
            <a
              href="#"
              className="inline-flex text-xs sm:text-sm text-gray-500 hover:text-blue-700"
            >
              <p className="text-xs">Forgot Your Password?</p>
            </a>
          </div>
          <div className="ml-auto ">
            <a
              target="_blank"
              className="inline-flex  text-blue-500 hover:text-blue-700 text-xs text-center"
            >
              <span className="ml-2 cursor-pointer" onClick={() => navigate('/signup')}>Sign up</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
