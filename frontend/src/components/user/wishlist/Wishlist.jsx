import React, { useEffect, useState } from "react";
import Axios from "../../../axiosInterceptors/userAxios";
import ProductCard from "../../basic/ProductCard/ProductCard";
import ProductCardSkeleton from "../../basic/ProductCard/ProductCardSkeleton";
import AddtoCartModal from "./modal/AddtoCartModal";
import { Toaster } from "sonner";

const Wishlist = () => {
    const [products, setproducts] = useState([]);
    const [refreshKey, setrefreshKey] = useState(0);
    const [modal, setmodal] = useState(false);
    const [modalId, setmodalId] = useState()
  const fetchdata = async () => {
    const { data } = await Axios.get("/wishlist");
    
    const simplifiedWishlist = data.map((wishlistItem) => {

        if (wishlistItem.productId) {
          const {
            _id,
            name,
            description,
            price,
            offerPrice,
            color,
            category,
            size,
            qty,
            gender,
            images,
            subCategory,
            variants,
          } = wishlistItem.productId;
      
          return {
            wishlistId: wishlistItem._id, //wishlist id
            _id,
            name,
            description,
            price,
            offerPrice,
            color,
            category,
            size,
            qty,
            gender,
            images,
            subCategory,
            variants,
          };
        } else {
         
          return null;
        }
      });
    setproducts(simplifiedWishlist);
  };

  useEffect(() => {
    fetchdata();
  }, [refreshKey]);
  return (
    <>
    <Toaster
        className=""
        toastOptions={{
          style: {
            width: "13em",
            padding: "0.6rem",
            cursor: "pointer",
          },
          className: "my-toast",
        }}
      />
      <div className="mx-6 h-48 border-b border-gray-300 flex items-end font-poppins">
        <div className=" w-1/6 p-4 ">
          <span className="md:ml-4 uppercase text-xs md:text-sm font-bold ">
            Wishlist
          </span>
        </div>
      </div>
      <div className="flex ml-6 justify-center">
        <div className="w-5/6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ml-6 m-2 gap-4">
          {
          products
            ? products.map((product, i) => <ProductCard prdt={...product} isWishlisted={true} setuserWishlist={setrefreshKey} checkMark={true} setmodal={setmodal} setmodalId={setmodalId} key={i} />)
            : Array(50)
                .fill(null)
                .map((p, i) => <ProductCardSkeleton key={i} />)}
        </div>
      </div>
      {modalId && <AddtoCartModal modal={modal} setmodal={setmodal} modalId={modalId} setmodalId={setmodalId} setuserWishlist={setrefreshKey} />}
    </>
  );
};

export default Wishlist;
