import Axios from '../../../axiosInterceptors/axios'
import React, { useEffect, useState } from 'react'
import BasicTable from '../../basic/BasicTable'

const OrderTable = () => {
  const options = ['Processing', 'Shipped', 'Delivered', 'Refunded', 'Completed'];
  const [products, setproducts] = useState()

  const handleStatus = async(option, orderId) => {
    await Axios.post('/admin/orderStatus', {option, orderId});
    fetchdata();
  }

    /** @type import('@tanstack/react-table').columndef<any> */
  const columns = [
    // {
    //     header: 'Order Id',
    //     accessorKey: 'orderId'
    // },
    {
      header: 'User Name',
      accessorKey: 'userName'
    },
    {
        header: 'Price',
        accessorKey: 'totalOfferPrice',
        cell: (info) => (
          <p>&#x20B9;{' '}{info.getValue()}</p>
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
            <select className={`${(current === 'Delivered' || current === 'Refunded' || current === 'Completed' ) ? 'text-green-800' :  'text-yellow-800'}`}
            value={current}
            onChange={(e) => handleStatus(e.target.value, orderId)}
            >
            <option>{current}</option>
          {options.map((option) => (
            <option key={option} value={option} >
              {option}
            </option>
          ))}
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
        <button
         onClick={() => handleStatus("Cancelled", info.row.original._id)}
        type="button"
        className="flex w-full items-center py-2 px-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
         Cancel
        </button>
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
    <BasicTable datas={products} columns={columns} type={"orders"}/>
  )
}

export default OrderTable