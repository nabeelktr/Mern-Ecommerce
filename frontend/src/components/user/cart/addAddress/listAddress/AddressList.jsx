import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Axios from '../../../../../axiosInterceptors/userAxios'

const AddressList = ({setAddressChosen}) => {
  const [address, setAddress] = useState();

  const fetchdata = async () => {
    const res = await Axios.get("getUserAddress");
    setAddress(res.data.address[0].shippingAddress);
  };

  const removeAddress = async(id) => {
    await Axios.get(`/removeAddress/${id}`);
    fetchdata();
    setAddressChosen();
  };

  const addressChosen = async(item) => {
    setAddressChosen(item);
  }

  useEffect(() => {
    fetchdata();
  }, []);

  if(!address){
    return <div></div>
  }

  return (
    <div className="flex flex-col items-center px-5 justify-center shadow-sm border pb-5">
      <Typography className="uppercase text-xs font-bold py-7">
       {address.length ? 'Select' : 'Add' } a shipping address
      </Typography>
      <form className="grid w-60 sm:w-96 grid-cols-1 gap-2 items-center">
        {address.map((item,i) => (
        <div className="relative" key={i} onClick={() => addressChosen(item)}>
          <input className="peer hidden" id={`radio_${i}`} type="radio" name="address" />
          <span className="absolute right-4 top-1/2 box-content block h-1 w-1 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-[#ff3c67] "></span>
          <label
            className="flex cursor-pointer flex-col rounded-lg border border-gray-300 p-4 peer-checked:border-4 peer-checked:border-[#ff3c67]"
            htmlFor={`radio_${i}`}
          >
            <span className="text-xs font-semibold uppercase">{item.name}</span>
            <ul className="mt-2 text-xs">
              <li>{item.phone} </li>
              <li>{item.address}{', '}{item.pincode}</li>
              <li>{item.location}{', '}{item.district}{', '}{item.state}{'.'} </li>
            </ul>
          </label>
          <button 
          onClick={() => removeAddress(item._id)}
          type="button" className="absolute bg-white rounded-md p-1 h-6 right-1 top-1 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">

              
        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
        </div>
        ))}
      </form>
    </div>
  );
};

export default AddressList;
