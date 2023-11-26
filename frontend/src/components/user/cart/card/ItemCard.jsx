import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Axios from "../../../../axiosInterceptors/userAxios";

const ItemCard = ({ item, cartId, setRefreshKey, refreshKey, updateCart }) => {
  const [product, setproduct] = useState();
  const [qty, setqty] = useState();
  const [actualqty, setactualqty] = useState();
  const fetchdata = async () => {
    const res = await Axios.get(`viewproduct/${item.productId}`);
    setproduct(res.data);
    const current = res.data.variants.find(
      (variant) => variant.size === item.size
    );

    setactualqty(current.qty);

    setqty(item.qty);
  };

  const qtyInc = async () => {
    if (qty < actualqty) {
      setqty(qty + 1);
      await Axios.post(`/incqty/${cartId}`, { item });
      setRefreshKey(refreshKey + 1);
    }
  };

  const qtyDec = async () => {
    setqty(qty - 1);
    await Axios.post(`/decqty/${cartId}`, { item });
    setRefreshKey(refreshKey + 1);
  };

  const deleteCartItem = async () => {
    
    const res = await Axios.post(`/removeCartItem/${cartId}`, { item });
   updateCart();
  };

  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <Card className="w-full rounded-none border shadow-sm flex-row md:p-2 p-1 md:m-2 relative font-poppins">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-none"
      >
        <img
          src={product ? product.images[0].url : ""}
          width={140}
          className="object-cover"
        />
      </CardHeader>
      <CardBody className="w-full px-2 flex flex-col justify-center py-0">
        <Typography  color="gray" className="md:mb-2 uppercase md:text-lg text-xs font-semibold font-poppins">
          {product ? product.name : ""}
        </Typography>
        {actualqty === 0 || actualqty < qty ? (
          <Typography>Out of Stock</Typography>
        ) : (
          <>
            <Typography color="gray" className="md:mb-6 md:text-lg text-[0.7rem] font-bold">
              &#8377; {product ? product.offerPrice : ""}
            </Typography>

            <Typography className="md:text-sm text-[0.5rem] font-bold md:mb-2">
              Size: {item.size}
            </Typography>

            <Typography className="md:text-sm text-[0.5rem] font-bold  ">
              Qty: {qty}{" "}
              <Button
                type="button"
                disabled={qty === 1}
                onClick={qtyDec}
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg md:text-sm  md:px-2.5 px-1 py-0 mr-0 mb-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                -
              </Button>{" "}
              <Button
                type="button"
                disabled={qty === actualqty}
                onClick={qtyInc}
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg md:text-sm  md:px-2.5  px-1 py-0 mr-0 mb-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                +
              </Button>
            </Typography>
          </>
        )}
      </CardBody>
      <button
        onClick={deleteCartItem}
        type="button"
        className="absolute bg-white rounded-md p-1 md:h-6 md:right-2 right-0 md:top-2 top-0 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
      >
        <svg
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </Card>
  );
};

export default ItemCard;
