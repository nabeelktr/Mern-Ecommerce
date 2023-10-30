import { useParams } from "react-router-dom";
import Axios from "../../../../axiosInterceptors/axios";
import { useEffect, useState } from "react";

const ViewProduct = () => {
  const [size, setsize] = useState('');
  const params  = useParams()
  const [product, setproduct] = useState()

  

  useEffect(() => {
    const fetchdata = async() => {
        try {
            const response = await Axios.get(`/viewproduct/${params.id}`);
            setproduct(response.data);
          } catch (error) {
            console.error('Error fetching product data:', error);
          }
      }; 
    fetchdata();
  }, []);

  if(!product){
    return <div className="pt-20">Loading..</div>
  }
  return (
    <div>
      <div
        className="pt-24 flex items-center justify-start p-6 pl-10 text-sm uppercase font-bold">
        View Product
      </div>
      <div className=" flex">
        <div className=" max-w-5xl  flex flex-wrap pl-7 px-10">
            {
                product &&
                product.images.map((img,i) => (
                    <img src={img.url} alt={product.name} key={i}  className="pl-2 pb-2  w-1/2"/>
                ))
            }
        </div>
        <div className="w-2/5"> 
            <span className="text-2xl font-bold mt-1 text-gray-900 flex" >{product.name}</span>
            <span className="text-xl text-gray-600 font-light flex" >{product.description}</span>
            <span className="text-2xl font-semibold text-gray-900 pt-7 flex" >Rs.&nbsp;{product.offerPrice}</span>
            <span className="text-md font-semibold text-00A685 pt-2 flex">inclusive of all taxes</span>
            <span className="text-sm font-semibold pt-8 flex uppercase ">Select size</span>
            <div className="pt-4">
              <button 
              className={`rounded-full border font-bold text-sm py-4 px-5 mr-3 mt-3 ${
                size === '32' ? 'border-pink-500 text-pink-500' : 'border-gray-500'
              }`}
              onClick={() => setsize('32')}
              >
              32
              </button>
              <button 
              className={`rounded-full border font-bold text-sm py-4 px-5 mr-3 mt-3 ${
                size === '34' ? 'border-pink-500 text-ff3c67' : 'border-gray-500'
              }`}
              onClick={() => setsize('34')}
              >
              34
              </button>
              <button 
              className={`rounded-full border font-bold text-sm py-4 px-5 mr-3 mt-3 ${
                size === '36' ? 'border-pink-500 text-ff3c67' : 'border-gray-500'
              }`}
              onClick={() => setsize('36')}
              >
              36
              </button>
              <button 
              className={`rounded-full border font-bold text-sm py-4 px-5 mr-3 mt-3 ${
                size === '38' ? 'border-pink-500 text-ff3c67 ' : 'border-gray-500'
              }`}
              onClick={() => setsize('38')}
              >
              38
              </button>
              <button 
              className={`rounded-full border font-bold text-sm py-4 px-5 mr-3 mt-3 ${
                size === '40' ? 'border-pink-500 text-ff3c67' : 'border-gray-500'
              }`}
              onClick={() => setsize('40')}
              >
              40
              </button>
            </div>
            <div className="flex pt-10">
            <button
                  className='flex items-center rounded-sm  justify-center focus:outline-none text-white text-sm sm:text-base py-4 w-2/4 transition duration-150 ease-in'

                  style={{ background: '#ff3c67' }}
                >
                  <span className="mr-2 uppercase font-bold text-sm">Add to Bag</span>
                </button>

                <button
                  className='flex items-center rounded-sm border border-gray-500 justify-center focus:outline-none text-sm sm:text-base ml-4 py-4 w-1/4 transition duration-150 ease-in'

                  
                >
                  <span className=" uppercase font-bold text-sm">Wishlist</span>
                </button>
            </div>

        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
