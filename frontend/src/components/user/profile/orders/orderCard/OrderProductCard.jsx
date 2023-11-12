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
    <Card className="w-4/6  flex-row p-2 m-2 relative rounded-none border shadow-sm" >
    <CardHeader
      shadow={false}
      floated={false}
      className="m-0 w-2/5 shrink-0 rounded-none"
    >
      <img
        src={product? product.images[0].url: ''}
        alt="card-image"
        width={90}
        className="object-cover"
      />
    </CardHeader>
    <CardBody>
      <Typography color="gray" className="mb-2 font-bold">
        {product? product.name : ''}
      </Typography>
      <Typography className='text-xs'>
        Size:&nbsp;{order.size}
      </Typography>
      <Typography className='text-xs'>
        Qty:&nbsp;{order.qty}
      </Typography>
    </CardBody>
  </Card>
  )
}

export default OrderProductCard