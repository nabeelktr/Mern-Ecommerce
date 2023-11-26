import Axios from "../../../../axiosInterceptors/userAxios";
import ProductCard from "../../../basic/ProductCard/ProductCard";

import { useEffect, useRef, useState } from "react";
import ProductCardSkeleton from "../../../basic/ProductCard/ProductCardSkeleton";

import {  Checkbox,  } from "@material-tailwind/react";
import SortByMenu from "./filterMenu/sortByMenu";
import SizeFilter from "./filterMenu/SizeFilter";
import CategoryFilter from "./filterMenu/CategoryFilter";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Toaster, toast } from "sonner";

const ProductList = () => {
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const [products, setproducts] = useState();
  const [userWishlist, setuserWishlist] = useState([])
  const fetchdata = async () => {
    try{
    let response;
    if(location.state?.category ){
      response = await Axios.get(`/products/category/${location.state.category}`)
    }
    else if(location.state?.gender){
      response = await Axios.get(`/products/gender/${location.state.gender}`)
    }
    else{  
      response = await Axios.get("/products");
    }
    setproducts(response.data);
  }catch(err){
    toast.error('No products found')
    setproducts([])
  }
    if(isLoggedIn){
      const resp = await Axios.get('/userwishlist')
      setuserWishlist(resp.data)
    }
  };


  useEffect(() => {
    fetchdata();
  }, []);

  const updateProducts = (sortedProducts) => {
    setproducts([...sortedProducts]);
  };

  const isProductInWishlist = (productId) => {
    return userWishlist.includes(productId);
  };

  return (
    <>
    <Toaster position="top-center" />
      <div className="md:mx-6 mx-2 md:h-48 h-32 border-b border-gray-300 flex items-end font-poppins">
        <div className=" w-1/6 md:p-4 p-2">
          <span className="md:ml-4 uppercase text-xs md:text-sm font-bold ">
            Filters
          </span>
        </div>
        <div className="md:p-4 p-2 md:w-2/6 flex">
        <SortByMenu updateProducts={updateProducts} products={products}  />
        {/* <SizeFilter setproducts={setproducts} /> */}
        <CategoryFilter />
      
        </div>
      </div>

      <div className="flex md:ml-6  ">
        <div className="md:w-1/6 border-r md:p-4 p-2 md:block lg:block hidden">
          <span className="uppercase md:ml-3 ml-1 md:text-sm text-xs font-bold ">brand</span><br/>
          <div className="md:mt-4 -mt-0">
        {products && products.map((product, i) => (
          <div key={i}>
          <Checkbox 
          color="pink" 
          label={ <span className="md:text-xs text-[0.6rem] p-0 -m-2 md:m-0 truncate">{product.name}</span>}
          ripple={false}
          className="md:h-4 md:w-4 h-2 w-2 rounded-sm -my-2 border-gray-900/20 bg-white transition-all hover:scale-105 hover:before:opacity-0 "
          /><br/>
          </div>
        ))}

          </div>

        </div>
        <div className="md:w-5/6 grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ml-6 m-2 md:gap-4 gap-2">
          {
          products
            ? products.map((product, i) => <ProductCard prdt={product} isWishlisted={isProductInWishlist(product._id)} 
              setuserWishlist={setuserWishlist} checkMark={false} key={i} />)
            : Array(20)
                .fill(null)
                .map((p, i) => <ProductCardSkeleton key={i} />)}
        </div>
      </div>
    </>
  );
};

export default ProductList;
