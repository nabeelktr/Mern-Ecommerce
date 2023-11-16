import React, { useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'
import Axios from '../../../axiosInterceptors/axios'

const FilterDash = ({setorder}) => {

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = async(newValue) => {
    setValue(newValue);
      const {data} = await Axios.post('/admin/dashboardfilter', newValue);
      setorder({count: data.totalOrders, price: data.totalPrice})
  };
  return (
    <div className="flex items-center ">
    <Datepicker
    maxDate={new Date()}
      value={value}
      onChange={handleValueChange}
      showShortcuts={true}
      inputClassName={"border rounded-sm text-xs  w-full p-2"}
    />

     

  </div>
  )
}

export default FilterDash