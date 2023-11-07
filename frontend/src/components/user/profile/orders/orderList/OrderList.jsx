import {
    Card,
    CardHeader,
    CardBody,
    Typography,
  } from "@material-tailwind/react";

const OrderList = () => {
  return (
    <div className="p-4 m-4 border shadow-sm">
      <div className="border-b p-4  px-8 font-bold" >
        <p>Order Details</p>
      </div>
    <div className='p-4 w-3/4 px-10 flex flex-row justify-start gap-44 mt-4'>
    <Card className="w-full  flex-row p-2 m-2 relative">
      
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none"
      >
        <img
          //src={product? product.images[0].url: ''}
          alt="card-image"
          width={150}
          className="object-cover"
        />
      </CardHeader>
      <CardBody>

          <>
          <Typography color="gray" className="mb-6 font-bold">
          {/* &#8377; {product? product.offerPrice : ''} */}
        </Typography>
     
       
        </>
{/* } */}
     
        
      </CardBody>

    </Card>
    </div>
    </div>
  )
}

export default OrderList