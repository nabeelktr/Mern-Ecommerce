import React, { useEffect, useState } from 'react'
import BasicTable from '../../basic/BasicTable';
import Axios from '../../../axiosInterceptors/axios'

const CouponTable = () => {
    const [coupon, setcoupon] = useState()
  
    /** @type import('@tanstack/react-table').columndef<any> */
    const columns = [
      {
        header: 'Coupon Code',
        //accessorKey: 'couponCode',
        cell: (info) => <span className='font-bold text-gray-700'>{info.row.original.couponCode}</span>,
      },
      {
        header: 'Start Date',
        accessorKey: 'startDate',
        cell: (info) => {
            const date = new Date(info.getValue());
            return <p>{date.toLocaleDateString()}</p>
          }
      },
      {
        header: 'Percentage ( % )',
        accessorKey: 'percentage'
      },
      {
        header: 'Minimum Price',
        accessorKey: 'minRate',
      },
      {
        header: 'Maximum Price',
        accessorKey: 'maxRate',
      },
      {
        header: 'Expiry',
        accessorKey: 'expiry',
        cell: (info) => {
            const date = new Date(info.getValue());
            return <p>{date.toLocaleDateString()}</p>
          }
      },
  ]   
      
  
  
    const fetchData = async() => {
      try {
          const response = await Axios.get('/admin/coupons');
          setcoupon(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
  
    useEffect(() => {
      fetchData();
    },[])
  return (
    <BasicTable datas={coupon} columns={columns} type="coupon" />
  )
}

export default CouponTable
