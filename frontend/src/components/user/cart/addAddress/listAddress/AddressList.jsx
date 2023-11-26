import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Axios from '../../../../../axiosInterceptors/userAxios';
import { PlusIcon } from "@heroicons/react/24/solid";

const AddressList = ({setAddressChosen, setmodal}) => {
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
    <div className="flex flex-col items-center md:mx-4 md:px-5 justify-center shadow-sm border md:p-5">
      <Typography className="uppercase md:text-xs text-[0.6rem] font-bold md:py-5 py-3">
       {setAddressChosen ? address.length ? 'Select a Delivery address' : 'Add a Delivery address' :''} 
      </Typography>
      <div className="px-2 md:pb-6 w-full flex justify-end">
      <button
        onClick={() => setmodal(true)}
          className="bg-white hover:bg-gray-100 font-semibold md:py-2 py-1 md:px-4 px-2 border border-gray-400 md:text-xs text-[0.5rem] flex items-center gap-2 shadow-sm"
        >
          <PlusIcon className="md:h-5 h-3 md:w-5 w-3"/>  
          ADD ADDRESS
        </button>
        </div>
      <form className="grid   grid-cols-1 gap-2 items-center p-2">
        {address.map((item,i) => (
        <div className="relative md:shadow-lg md:mb-2" key={i} onClick={() => addressChosen(item)}>
          <input className="peer hidden" id={`radio_${i}`} type="radio" name="address" />
          <span className="absolute right-4 top-1/2 box-content block md:h-1 md:w-1 -translate-y-1/2 rounded-full md:border-8  border-gray-300 bg-white peer-checked:border-[#ff3c67] "></span>
          <label
            className="flex cursor-pointer flex-col rounded-lg border border-gray-300 md:p-4 p-2 md:peer-checked:border-4 peer-checked:border-[#ff3c67]"
            htmlFor={`radio_${i}`}
          >
            <span className="md:text-xs text-[0.5rem] font-semibold uppercase ">{item.name}</span>
            <ul className="md:mt-2 md:text-xs text-[0.5rem]  pr-8">
              <li>{item.phone} </li>
              <li>{item.address}{', '}{item.pincode}</li>
              <li>{item.location}{', '}{item.district}{', '}{item.state}{'.'} </li>
            </ul>
          </label>
          <button 
          onClick={() => removeAddress(item._id)}
          type="button" className="absolute bg-white rounded-md p-1 md:h-6 right-1 top-1 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">

              
        <svg className="md:h-4 h-2 md:w-4 w-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
