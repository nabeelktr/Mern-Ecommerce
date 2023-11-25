import Axios from '../../../axiosInterceptors/axios'
import React, { useEffect, useState } from 'react'
import BasicTable from '../../basic/BasicTable'
import { Toaster, toast } from 'sonner';
import { EyeIcon, ViewfinderCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const OrderTable = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useState()

  const cancelOrder = async (id, userID) => {
    try{
      toast('Are you sure you want to cancel this Order ?', {
        action: {
          label: 'Yes, Iam Sure',
          onClick: async() => {
            await Axios.post('/cancelorder', {id, userID});
            fetchdata();
          },
        },
      });
    }catch{
      toast.warning('This Order cannot be cancelled')
    }
}

  const handleStatus = async(option, orderId) => {
    await Axios.post('/admin/orderStatus', {option, orderId});
    fetchdata();
  }

    /** @type import('@tanstack/react-table').columndef<any> */
  const columns = [
    {
        header: 'Order Id',
        accessorKey: 'orderId'
    },
    {
      header: 'UserName',
      accessorKey: 'userName'
    },
    {
        header: 'Price',
        accessorKey: 'totalOfferPrice',
        cell: (info) => (
          <p>&#x20B9;&nbsp;{info.getValue()}</p>
        )
    },
    {
        header: 'Address',
        accessorKey: "shippingAddress",
        cell: (info) => (
            <>
            {
            <>
             <p>{info.getValue().address}{', '}{info.getValue().pincode}</p> 
             <p>{info.getValue().location}{', '}{info.getValue().district}{', '}{info.getValue().state}{'.'}</p> 
            </>
            }
            </>
        )
    },
    {
      header: 'Payment Mode',
      accessorKey: 'paymentMethod'
  },
    {
        header: 'Status',
        accessorKey: 'status',
        cell: (info) => {
          const current = info.getValue();
          const orderId = info.row.original._id;
          return (
            <select className={`${(current === 'Delivered' || current === 'Refunded'  ) ? 'text-green-800' :  'text-yellow-800'} cursor-pointer`}
            value={current}
            onChange={(e) => handleStatus(e.target.value, orderId)}
            >
            <option>{current}</option>
          {current === 'Pending' &&  <option value={'Processing'} key={'Processing'}>Processing</option>}
          {current === 'Processing' &&  <option value={'Shipped'} key={'Shipped'}>Shipped</option>}
           {current === 'Shipped' && <option value={'Delivered'} key={'Delivered'}>Delivered</option>}
          </select>
          )
        }
    },
    {
        header: 'Order Date',
        accessorKey: 'createdAt',
        cell: (info) => {
          const date = new Date(info.getValue());
          return <p>{date.toLocaleDateString()}</p>
        }
    },
    {
      header: 'Action',
      cell: (info) => (
        info.row.original.status === 'Delivered' && 
        Math.floor((new Date() - new Date(info.row.original.updatedAt)) / (24 * 60 * 60 * 1000)) <= 7 &&
        info.row.original.paymentMethod === "RazorPay" ?
        <>
        <button
         onClick={() => cancelOrder(info.row.original._id, info.row.original.userId)}
         type="button"
         className="flex w-full items-center py-2 px-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
         Cancel
        </button>
        </>
        :
        info.row.original.status  !== 'Delivered' && info.row.original.status  !== 'Cancelled' ?
        <button
        onClick={() => cancelOrder(info.row.original._id, info.row.original.userId)}
        type="button"
        className="flex w-full items-center py-2 px-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400">
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
         <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
       </svg>
        Cancel
       </button>
       :
        ''
      )
  },
  {
    header: 'View',
    accessorKey: '_id',
    cell : (info) => (
      <>
      <EyeIcon className='h-5 w-5 ml-2 cursor-pointer text-gray-600 transform transition-transform hover:scale-110' onClick={() => navigate('/admin/orders/orderdetails', {state: info.getValue()})} />
      </>
    )
},
] 

  const fetchdata = async() => {
    const response = await Axios.get('/orders')
    setproducts(response.data);
  }

  useEffect(() => {
    fetchdata();
  },[])
  return (
    <>
    <Toaster position='top-center'/>
    <BasicTable datas={products} columns={columns} type={"orders"}/>
    </>
  )
}

export default OrderTable