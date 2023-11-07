import Axios from "../../../../axiosInterceptors/userAxios";
import ProductCard from "../../../basic/ProductCard/ProductCard";

import { useEffect, useState } from "react";
import ProductCardSkeleton from "../../../basic/ProductCard/ProductCardSkeleton";

import {  Checkbox,  } from "@material-tailwind/react";
import SortByMenu from "./filterMenu/sortByMenu";
import SizeFilter from "./filterMenu/SizeFilter";
import CategoryFilter from "./filterMenu/CategoryFilter";

const ProductList = () => {

  const [products, setproducts] = useState([]);

  const fetchdata = async () => {
    const res = await Axios.get("/products");
    setproducts(res.data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const updateProducts = (sortedProducts) => {
    setproducts([...sortedProducts]);
  };

  return (
    <>
      <div className="mx-6 h-48 border-b border-gray-300 flex items-end">
        <div className=" w-1/6 p-4 ">
          <span className="md:ml-4 uppercase text-xs md:text-sm font-bold ">
            Filters
          </span>
        </div>
        <div className="p-4 w-2/6 flex">
        <SortByMenu updateProducts={updateProducts} products={products}  />
        <SizeFilter setproducts={setproducts} />
        <CategoryFilter setproducts={setproducts} />
      
        </div>
      </div>

      <div className="flex ml-6 ">
        <div className="w-1/6 border-r p-4 ml-1">
          <span className="uppercase ml-3 text-sm font-bold">brand</span><br/>
          <Checkbox 
          color="pink" 
          label={ <span className="text-sm">H&M</span>}
          ripple={false}
          className="h-4 w-4 rounded-sm border-gray-900/20 bg-white transition-all hover:scale-105 hover:before:opacity-0"
          /><br/>
          <Checkbox 
          color="pink" 
          label={ <span className="text-sm">Allensolly</span>}
          ripple={false}
          className="h-4 w-4 rounded-sm border-gray-900/20 bg-white transition-all hover:scale-105 hover:before:opacity-0 "
          /><br/>
          <Checkbox 
          color="pink" 
          label={ <span className="text-sm">Addres</span>}
          ripple={false}
          className="h-4 w-4 rounded-sm border-gray-900/20 bg-white  transition-all hover:scale-105 hover:before:opacity-0 "
          />

        </div>
        <div className="w-5/6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ml-6 m-2 gap-4">
          {
          products[0]
            ? products.map((product, i) => <ProductCard {...product} key={i} />)
            : Array(50)
                .fill(null)
                .map((p, i) => <ProductCardSkeleton key={i} />)}
        </div>
      </div>
    </>
  );
};

export default ProductList;
