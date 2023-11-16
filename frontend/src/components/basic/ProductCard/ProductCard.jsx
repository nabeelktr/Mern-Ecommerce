import { useEffect, useState } from 'react';
import './productCard.css';
import { useNavigate } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/outline';
import { Toaster, toast } from 'sonner';
import Axios from '../../../axiosInterceptors/userAxios'


const ProductCard = (props) => {
    const [opacity, setopacity] = useState(0)
    const navigate = useNavigate()
    const [currentIndex, setcurrentIndex] = useState(0);
    const [autoChangeInterval, setAutoChangeInterval] = useState();
    const [imageLoaded, setImageLoaded] = useState(false);

    const { _id, images, description, name, offerPrice, color } = props;

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
    const addToWishlist = async() => {
      await Axios.post('/addtowishlist', {_id});
      toast(
        <div className="flex gap-4 items-center">
          <img width={30} src={images[0].url}  onClick={() => navigate("/wishlist")} />
          Added To Wishlist
        </div>,
        { duration: 2000, position: "top-center" }
      );
    }

    useEffect(() => {
        return () => {
          if (autoChangeInterval) {
            clearInterval(autoChangeInterval);
          }
        };
      }, []);
    
    const viewImage = () => {
      navigate(`/products/view/${_id}`)
    }

    
  return (
    <a className="product-card mt-4 relative hover:shadow-sm font-poppins"  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
       <Toaster
      className=""
        toastOptions={{
          style: {
            width: "16em",
            padding: "0.6rem",
            cursor: "pointer",
          },
          className: "my-toast",
        }}
      />
      {!imageLoaded && (
        
        <div className={'h-[280px] bg-'+color+'-200 animate-pulse mb-2 '}>
        </div>
      )}

      <img className={`product-card__image cursor-pointer ${!imageLoaded ? 'hidden' : '' }`} src={images[currentIndex].url} width="210px" height="280px" onClick={viewImage} onLoad={() => setImageLoaded(true)}/>
      
      <p className="product-card__brand ml-2 font-semibold">{name}</p>
      <p className="product-card__description mx-2 font-light">{description}</p>
      <p className="product-card__price ml-2 mb-2 font-semibold">	&#8377;&nbsp;{offerPrice}</p>
      <span className={`h-[5rem] w-full bg-white absolute bottom-[1.5rem] opacity-${opacity} `}>
        <div className='p-2'>
          <button 
          onClick={addToWishlist}
          className='w-full border py-[0.4rem] text-xs uppercase items-center flex justify-center gap-2
           hover:border-black font-semibold text-gray-800'>
            <HeartIcon className='h-5 w-5'/> 
            wishlist</button>
        </div>
        </span>
    </a>
  )
}

export default ProductCard