import { useEffect, useState } from "react";
import "./productCard.css";
import { useNavigate } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/outline";
import Axios from "../../../axiosInterceptors/userAxios";


const ProductCard = ({ prdt, isWishlisted, setuserWishlist, checkMark, setmodal, setmodalId }) => {
  const [opacity, setopacity] = useState(0);
  const navigate = useNavigate();
  const [currentIndex, setcurrentIndex] = useState(0);
  const [autoChangeInterval, setAutoChangeInterval] = useState();
  const [imageLoaded, setImageLoaded] = useState(false);
  const { _id, images, description, name, offerPrice, color, price, wishlistId } = prdt;

  const handleMouseEnter = () => {
    setopacity(100);
    setcurrentIndex((currentIndex + 1) % images.length);
    setAutoChangeInterval(
      setInterval(() => {
        setcurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 2000)
    );
  };
  const handleMouseLeave = () => {
    setopacity(0);
    clearInterval(autoChangeInterval);
    setcurrentIndex(0);
  };
  const addToWishlist = async () => {
    await Axios.post("/addtowishlist", { _id });
    setuserWishlist((prevWishlist) => [...prevWishlist, _id]);
  };

  const removeWishlist = async() => {
    await Axios.post('/removewishlist', { wishlistId });
    setuserWishlist((prev) => (prev+1));
  };

  useEffect(() => {
    return () => {
      if (autoChangeInterval) {
        clearInterval(autoChangeInterval);
      }
    };
  }, []);

  const viewImage = () => {
    navigate(`/products/view/${_id}`);
  };

  return (
    <>
    <a
      className={`product-card mt-4 relative hover:shadow-sm font-poppins ${(isWishlisted && checkMark) ? 'border' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!imageLoaded && (
        <div
          className={"h-[280px] bg-" + color + "-200 animate-pulse mb-2 "}
        ></div>
      )}

      <img
        className={`product-card__image cursor-pointer ${
          !imageLoaded ? "hidden" : ""
        }`}
        src={images[currentIndex].url}
        width="210px"
        height="280px"
        onClick={viewImage}
        onLoad={() => setImageLoaded(true)}
      />

      <p className="product-card__brand ml-2 font-semibold">{name}</p>
      <p className="product-card__description mx-2 mb-2 font-light">
        {description}
      </p>
      <p className="product-card__price ml-2 mb-2 font-semibold text-xs">
        {" "}
        Rs.&nbsp;{offerPrice}&nbsp;&nbsp;
        <span className="text-[0.7rem] font-normal text-gray-700 line-through">
          Rs. {price}
        </span>
        &nbsp;&nbsp;
        <span className="text-[0.7rem] text-[#ff905a] font-light">
          {`(${Math.floor(((price - offerPrice) / price) * 100)}% OFF)`}
        </span>
      </p>
      <span
        className={`h-[5rem] w-full bg-white absolute bottom-[1.5rem] opacity-${opacity} `}
      >
        <div className="p-2">
          {
          isWishlisted && checkMark ?
          (
            <>
              <button
              onClick={() => {
                setmodalId({_id, wishlistId});
                setmodal(true)}}
                className="w-full border py-[0.4rem] text-xs uppercase items-center flex justify-center gap-2
           font-semibold text-[#ff3c67] tracking-wide"
              >
                Move To Cart
              </button>
            </>
          ) 
          :
          isWishlisted ? 
          (
            <>
              <button
                style={{ backgroundColor: "rgb(83, 87, 102)" }}
                className="w-full border py-[0.4rem] text-xs uppercase items-center flex justify-center gap-2
           font-semibold text-white tracking-wide"
              >
                <HeartIcon className="h-5 w-5 text-red-500 fill-red-400 " />
                wishlisted
              </button>
            </>
          ) 
          : 
          (
            <button
              onClick={addToWishlist}
              className="w-full border py-[0.4rem] text-xs uppercase items-center flex justify-center gap-2
           hover:border-black font-semibold text-gray-800"
            >
              <HeartIcon className="h-5 w-5" />
              wishlist
            </button>
          )}
        </div>
      </span>
      {
        (isWishlisted && checkMark) && 
        <button
        onClick={removeWishlist}
        type="button"
        className="absolute bg-gray-50 rounded-full p-1 h-6 right-2 top-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 "
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
      }
    </a>
    
    </>
  );
};

export default ProductCard;
