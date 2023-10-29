import { BeatLoader } from "react-spinners";
import Axios from "../../../axiosInterceptors/userAxios";
import ProductCard from "../../basic/ProductCard/ProductCard";

import { useEffect, useState } from "react";
import ProductCardSkeleton from "../../basic/ProductCard/ProductCardSkeleton";

const ProductList = () => {
  const [products, setproducts] = useState([]);

  const fetchdata = async () => {
    await new Promise((res) => setTimeout(res,1000) )
    const res = await Axios.get("/products");
    setproducts(res.data);
  };

  useEffect(() => {
    fetchdata();
  }, []);



  return (
    <>
    <div className="mx-6 h-28 border-b border-gray-300 flex items-end">
        <div className=" w-1/6 p-4 ">
            <span className="md:ml-4 uppercase text-xs md:text-sm font-bold ">Filters</span>
        </div>
        <div className="p-4 w-1/6 flex ">
        <span className="ml-2 text-sm text-gray-700 ">Sort</span>
        <span className="ml-16 text-sm text-gray-700 ">Category</span>
        </div>
    </div>

    <div className="flex ml-6 ">
    <div className="w-1/6 border-r"></div>
    <div className="w-5/6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ml-6 m-2 gap-4">
      {
          products[0] ?
          products.map((product, i) => (
              <ProductCard {...product} key={i} />
              ))
              :
              Array(10).fill(null).map((p,i) => (
                  <ProductCardSkeleton key={i}/>
                  ))
                }
    </div>
    </div>
   
   </>
   
  );

};

export default ProductList;
