import { ErrorMessage, Form, Formik, useField } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from '../../../../axiosInterceptors/userAxios'
import { Typography } from '@material-tailwind/react';
import { editProfileSchema } from '../../../yup';

const EditProfile = () => {
    const [user, setuser] = useState();
    const navigate = useNavigate();

    const fetchdata = async() => {
        const response = await Axios.get('/getUser')
        setuser(response.data)
    }
    const handleSubmit = async(values) => {
        await Axios.post('/editUser', {values});
        navigate('/profile');
    }

    useEffect(() => {
        fetchdata();
    },[])

    const MyTextField = ({ label, ...props }) => {
        const [field, meta] = useField(props);
      
        return (
          <>
            <label className="block  text-sm font-bold text-gray-900 dark:text-white">
              {label}
            </label>
            <input
              {...field}
              {...props}
              className={`bg-gray-50 mb-2 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500  ${
                meta.touched && meta.error ? "border-red-500" : "focus:border-black"
              }`}
            />
            <ErrorMessage name={field.name} component="div" className="text-xs text-red-600 mb-2 " />
          </>
        );
    };
    if(!user){
        return <div></div>
    }
  return (
    
    <div className="p-8 m-4 border flex justify-center shadow-sm">
        
        <Formik
        initialValues={{
            name: user? user.name : '',
            phone: user?.phone,
            gender: user?.gender,
            location: user?.location,
        }}
        onSubmit={handleSubmit}
        validationSchema={editProfileSchema}
        >
            {({isSubmitting}) => (

                <Form className='w-3/4 '>
                <MyTextField type="text" name="name" label="Full Name" />
                <MyTextField type="text" name="phone" label="Mobile Number" />
                <MyTextField type="text" name="gender" label="Gender" />
                <MyTextField type="text" name="location" label="Location" />
                <button
                type='submit'
                className="flex rounded-sm items-center justify-center focus:outline-none mt-10 mb-6   
                sm:text-base bg-blue-600 hover:bg-blue-700  py-2 w-full transition duration-150 ease-in"            
                style={{ background: "#ff3c67" }}
                >
          <Typography className={`mr-2 uppercase p-1 font-bold text-gray-100 text-sm ${isSubmitting ? 'opacity-80' : ''}`}>Edit Profile</Typography>
         </button>
            </Form>
            )}
        </Formik>
    </div>
  )
}

export default EditProfile