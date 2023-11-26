import React, { useEffect, useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
import Axios from '../../../../../axiosInterceptors/userAxios'


const OrderProductCard = ({order}) => {
    const [product, setproduct] = useState()
    const fetchdata = async() => {
        const response = await Axios.get(`/viewproduct/${order.productId}`);
        setproduct(response.data)
    }
    useEffect(() => {
        fetchdata();
    },[])
  return (
    <Card className="flex-row items-center md:gap-20 gap-5  md:p-2 p-1 md:m-2 m-1 relative rounded-none border shadow-sm" >
    <CardHeader
      shadow={false}
      floated={false}
      className="m-0 shrink-0 rounded-none"
    >
      <img
        src={product? product.images[0].url: ''}
        className="object-cover w-[2.5rem] md:w-[6rem]"
      />
    </CardHeader>
    <CardBody className='m-0 p-0'>
      <Typography color="gray" className="md:mb-2 md:text-sm text-[0.6rem] font-semibold ">
        {product? product.name : ''}
      </Typography>
      <Typography className='md:text-xs text-[0.6rem] '>
        Size:&nbsp;{order.size}
      </Typography>
      <Typography className='md:text-xs text-[0.6rem] '>
        Qty:&nbsp;{order.qty}
      </Typography>
    </CardBody>
  </Card>
  )
}

export default OrderProductCard