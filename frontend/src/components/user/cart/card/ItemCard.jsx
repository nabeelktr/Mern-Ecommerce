import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Axios from '../../../../axiosInterceptors/userAxios'



const ItemCard = ({ item, cartId }) => {

  const [product, setproduct] = useState()
  const [qty, setqty] = useState()
  const [actualqty, setactualqty] = useState()

  const fetchdata = async() => {
    const res = await Axios.get(`viewproduct/${item.productId}`);
    setproduct(res.data);
    setqty(item.qty)

      currentqty(res.data);
    
  }

  const currentqty = (product) => {
    const current = product.variants.find((variant) => (variant.size === item.size  ));

    if(current.qty === 0){
      setqty(0);
    }
    setactualqty(current.qty);
  } 

  const qtyInc = async() => {

      if (qty < actualqty) {
        setqty(qty + 1);
        await Axios.post(`/incqty/${cartId}`,{item})
      }
  }


  const qtyDec = async() => {
    setqty(qty - 1);
    await Axios.post(`/decqty/${cartId}`,{item})
  }

  useEffect(() => {
    fetchdata();

  },[])
  return (
    <Card className="w-full  flex-row p-2 m-2">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none"
      >
        <img
          src={product? product.images[0].url: ''}
          alt="card-image"
          width={150}
          className="object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h6" color="gray" className="mb-2 uppercase">
          {product? product.name : ''}
        </Typography>
{ actualqty === 0 || actualqty < qty ?
          <Typography>
          Out of Stock
          </Typography>
          :
          <>
          <Typography color="gray" className="mb-6 font-bold">
          &#8377; {product? product.offerPrice : ''}
        </Typography>
     
        <Typography className="text-sm font-bold mb-2">
          Size:{' '}{item.size}
        </Typography>

        <Typography className="text-sm font-bold ">
          
        <Button type="button" 
        disabled={qty === 1}
        onClick={qtyDec}
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-0 mr-0 mb-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          -
        </Button>
         {' '} Qty:{' '}{qty}{' '}
        <Button type="button" 
        disabled={qty === actualqty}
        onClick={qtyInc}
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-0 mr-0 mb-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          +
        </Button>
        </Typography> 
        </>
}
     
        
      </CardBody>
    </Card>
  );
};

export default ItemCard;
