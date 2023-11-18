import { Typography } from '@material-tailwind/react';
import { ErrorMessage, Formik, useField, Form } from 'formik'
import React from 'react'
import {  useNavigate } from 'react-router-dom'
import { resetPasswordSchema } from '../../../yup';
import Axios from '../../../../axiosInterceptors/userAxios'
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const navigate = useNavigate();

    const MyTextField = ({ label, ...props }) => {
        const [field, meta] = useField(props);
      
        return (
          <>
            <label className="  text-sm font-semibold text-gray-900 dark:text-white">
              {label}
            </label>
            <input
              {...field}
              {...props}
              className={`bg-gray-50 mb-2 border w-full  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500  ${
                meta.touched && meta.error ? "border-red-500" : "focus:border-black"
              }`}
            />
            <ErrorMessage name={field.name} component="div" className="text-xs text-red-600 mb-2 " />
          </>
        );
    };

    const handleSubmit = async(values, action) => {
        try{
            await Axios.post('/resetPassword', values);
            toast.success('Password changed successfully');
            navigate('/profile');
        }catch(err){
            action.setFieldError('current', 'invalid Password');
        }
    }
  return (
    <div className="p-4 m-4 border w-1/2  justify-center shadow-sm font-poppins tracking-wide">
      <div className="border-b p-4 font-semibold tracking-widest" >
        <p>Change Password</p>
      </div>
      <div className='p-4   px-10 flex flex-row justify-start  mt-4 '>
        <Formik
        initialValues={{
            current: '',
            newPassword: '',
            confirmPassword: '',
        }}
        validationSchema={resetPasswordSchema}
        onSubmit={handleSubmit}
    
        >
            {({isSubmitting}) =>  (

                <Form className=' w-full'>
                <MyTextField type='password' name='current' label="Current Password" />
                <MyTextField type='password' name='newPassword' label="New Password" />
                <MyTextField type='password' name='confirmPassword' label="Confirm Password" />
                  <p className="text-xs mt-1 text-gray-600 ml-2">- Uppercase letters (A-Z)</p>
                  <p className="text-xs text-gray-600 ml-2">- Lowercase letters (a-z)</p>
                  <p className="text-xs text-gray-600 ml-2 mb-1">- Numbers (0-9)</p>

                <button
                type='submit'
                className="flex rounded-sm items-center justify-center focus:outline-none mt-10 mb-6   
                sm:text-base bg-blue-600 hover:bg-blue-700  py-2 w-full transition duration-150 ease-in"            
                style={{ background: "#ff3c67" }}
                >
          <Typography className={`mr-2 uppercase p-1 font-bold text-gray-100 text-sm ${isSubmitting ? 'opacity-80' : ''}`}>Change Password</Typography>
         </button>
            </Form>
        )}
        </Formik>
      </div>
      </div>
  )
}

export default ResetPassword