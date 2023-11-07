import React from 'react'
import AddressList from '../../../cart/addAddress/listAddress/AddressList'
import { useNavigate } from 'react-router-dom'

const ViewAddress = () => {
    const navigate = useNavigate();
  return (
    <div className="p-4 m-4 border  justify-center shadow-sm">
      <div className="border-b p-4 mx-40 px-8 font-bold" >
        <p>Address Details</p>
      </div>
    <div className="mx-44 pt-4 flex justify-end -mb-3 pr-16">
    <button 
    onClick={() => navigate('/profile/addAddress')}
    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-6 border border-gray-400 text-xs rounded shadow">
        ADD ADDRESS
    </button>
    </div>
    <div className='p-4  mx-44 px-10 flex flex-row justify-start gap-44 mt-4'>
        <AddressList />
    </div>
    </div>
  )
}

export default ViewAddress