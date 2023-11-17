import { useNavigate, useParams } from "react-router-dom";
import Axios from "../../../../axiosInterceptors/userAxios";
import { Toaster, toast } from "sonner";
import { useEffect, useState } from "react";


const ViewProduct = () => {
  const navigate = useNavigate();
  const [touched, setTouched] = useState(false);
  const [size, setsize] = useState();
  const params = useParams();
  const [product, setproduct] = useState();
  const [qty, setqty] = useState();
  const [imageLoaded, setImageLoaded] = useState(false);

  const totalQuantity = (datas) => {
    const total = datas.reduce((acc, current) => acc + current.qty, 0);
    setqty(total);
  };

  const addToCart = async () => {
    setTouched(true);
    if (size) {
      try {
        await Axios.post("/addtocart", {
          productId: product._id,
          size,
          qty: 1,
        });
        toast(
          <div className="flex gap-4 items-center ">
            <img width={30} src={product.images[0].url}  onClick={() => navigate("/cart")} />
            Added to cart
          </div>,
          { duration: 5000, position: "top-right", invert: true }
        );
        setsize();
        setTouched(false);
      } catch (err) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await Axios.get(`/viewproduct/${params.id}`);
        setproduct(response.data);
        totalQuantity(response.data.variants);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchdata();
  }, []);

  if (!product) {
    return <div className="pt-20">Loading..</div>;
  }
  return (
    <div>
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
      <div className="pt-24 flex items-center justify-start p-6 pl-10 text-sm uppercase font-semibold font-poppins">
        View Product
      </div>
      <div className=" flex">
        <div className=" w-3/5  flex flex-wrap pl-7 px-10">
          {product &&
            product.images.map((img, i) => (
 
              <img
              
              src={img.url}
              alt={product.name}
              key={i}
              className={`pl-2 pb-2  w-1/2 ${!imageLoaded ? '' : ''}`}
              onLoad={() => setImageLoaded(true)}
              />

            ))}
        </div>
        <div className="w-2/5 font-poppins font-semibold">
          <span className="text-2xl font-semibold mt-1 text-gray-900 flex">
            {product.name}
          </span>
          <span className="text-xl text-gray-600 font-light flex">
            {product.description}
          </span>
          <span className="text-2xl  text-gray-900 pt-7 flex">
            Rs.&nbsp;{product.offerPrice}
          </span>
          <span className="text-md text-00A685 pt-2 flex">
            inclusive of all taxes
          </span>
          <span className="text-sm font-semibold pt-8 flex uppercase ">
            Select size
          </span>
          {!size && touched && (
            <span className="text-xs text-red-200">Please select a size</span>
          )}
          <div className="pt-4">
            {qty > 0 ? (
              product.variants.map((data, i) =>
                data.qty === 0 ? (
                  <button
                    className="rounded-full border font-semibold text-sm py-4 px-5 mr-3 mt-3 text-gray-500 "
                    disabled={true}
                    key={i}
                  >
                    {data.size}
                  </button>
                ) : (
                  <button
                    className={`rounded-full border font-semibold text-sm py-4 px-5 mr-3 mt-3 ${
                      size === data.size
                        ? "border-pink-500 text-pink-500"
                        : "border-gray-500"
                    }`}
                    onClick={() => setsize(data.size)}
                    key={i}
                  >
                    {data.size}
                  </button>
                )
              )
            ) : (
              <span className="font-semibold text-lg py-4 px-5 mr-3 mt-3 text-red-400">
                Out of Stock
              </span>
            )}
          </div>
          <div className="flex pt-10">
            <button
              className="flex items-center rounded-sm  justify-center focus:outline-none text-white text-sm sm:text-base py-4 w-2/4 transition duration-150 ease-in"
              disabled={qty === 0}
              style={{ background: "#ff3c67" }}
              onClick={addToCart}
            >
              <span className="mr-2 uppercase font-semibold text-sm">
                Add to Bag
              </span>
            </button>

            <button
              disabled={qty === 0}
              className="flex items-center rounded-sm border border-gray-500 justify-center focus:outline-none text-sm sm:text-base ml-4 py-4 w-1/4 transition duration-150 ease-in"
            >
              <span className=" uppercase font-semibold text-sm">Wishlist</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
