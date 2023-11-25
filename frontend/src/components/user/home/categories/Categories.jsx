import React, { useEffect, useState } from 'react'
import Axios from '../../../../axiosInterceptors/userAxios'
import Category from '../../../basic/categoryCard/Category'

const Categories = () => {
    const [categories, setCategories] = useState([])

    const fetchdata = async() => {
        const {data} = await Axios.get('/admin/categories')
        setCategories(data);
    }

    useEffect(() => {
        fetchdata();
    }, [])
  return (
    <div className='font-poppins md:p-10 flex pt-4 flex-col'>
        <span className='uppercase sm:text-sm  md:text-4xl tracking-widest font-semibold flex justify-center md:mb-6'>Cart-worthy Categories</span>
        <div className=' justify-center md:gap-10 gap-2 grid grid-cols-3 md:grid-cols-6 p-2'>
        {
          categories.map((category, i) => (
            <Category category={category} key={i} />
          ))
        }
        </div>
    </div>
  )
}

export default Categories