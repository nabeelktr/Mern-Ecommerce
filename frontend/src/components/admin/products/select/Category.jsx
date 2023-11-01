import { Option, Select } from '@material-tailwind/react'
import  Axios from '../../../../axiosInterceptors/userAxios';
import { ErrorMessage, useField } from 'formik';
import { useEffect, useState } from 'react';


const Category = ({ label, ...props }) => {
    const [categories, setcategories] = useState()
    const [field, meta] = useField(props);

    const fetchdata = async() => {
      const res = await Axios.get('/admin/categories');
      setcategories(res.data);
    }

    useEffect(() => {
      fetchdata();
    },[])
  return (
    <div className="mb-2">
      <label className="block  text-sm font-bold text-gray-900 dark:text-white">
        {label}
      </label>
      <select
      {...field}
      {...props}
        className={`bg-gray-50 mt-2 border w-full  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500  ${
          meta.touched && meta.error ? "border-red-500" : "focus:border-black"
        }`}
      >
        <option value=''>select..</option>
        {
        
          categories &&
        categories.map((category, i) => ( 
          <option key={i} value={category.name}>{category.name}</option>
        ))
          
        }
      </select>
      <ErrorMessage name={field.name} component="div" className="text-xs text-red-600 mb-2 " />

    </div>
  )
}

export default Category