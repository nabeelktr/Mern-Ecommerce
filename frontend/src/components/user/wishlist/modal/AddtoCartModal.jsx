import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import Axios from "../../../../axiosInterceptors/userAxios";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AddtoCartModal = ({ modal, setmodal, modalId, setmodalId, setuserWishlist }) => {
    const navigate = useNavigate()
  const [product, setproduct] = useState();
  const [qty, setqty] = useState();
  const [size, setsize] = useState();
  const [touched, setTouched] = useState(false);

  const fetchdata = async () => {
    const { data } = await Axios.get(`/viewproduct/${modalId._id}`);
    setproduct(data);
    totalQuantity(data.variants);
  };

  const removeWishlist = async() => {
    await Axios.post('/removewishlist', { wishlistId: modalId.wishlistId });
    setuserWishlist((prev) => (prev+1));
  };

  const totalQuantity = (datas) => {
    const total = datas.reduce((acc, current) => acc + current.qty, 0);
    setqty(total);
  };

  const addToCart = async () => {
    setTouched(true);
    if (size) {
      await Axios.post("/addtocart", {
        productId: product._id,
        size,
        qty: 1,
      });
      toast(
        <div className="flex gap-4 items-center ">
          <img
            width={30}
            src={product.images[0].url}
            onClick={() => navigate("/cart")}
          />
          Added to cart
        </div>,
        { duration: 5000, position: "top-right", invert: true }
      );
      setsize();
      setTouched(false);
      setmodal(false)
      removeWishlist();
    }
  };

  const closeModal = () => {
    setmodal(false);
    setmodalId();
  };

  useEffect(() => {
    fetchdata();
  }, []);
  if (!product) {
    return <div></div>;
  }
  return (
    <>
      
      <Transition.Root show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity " />
          </Transition.Child>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start flex flex-col">
                      <div className=" w-full  flex gap-10 font-poppins text-sm items-center border-b pb-4">
                        <img src={product.images[0].url} width={70} />
                        <div className="flex flex-col">
                          <span className="font-semibold mb-2">
                            {product.name}
                          </span>
                          <span className="font-light mb-2 ">
                            {product.description}
                          </span>
                          <span className="mb-2 font-semibold">
                            Rs. {product.offerPrice}
                          </span>
                        </div>
                      </div>
                      <div className=" w-full p-3 flex-col flex ">
                        <span className="font-semibold text-sm tracking-wide">
                          Select Size
                        </span>
                        {!size && touched && (
                          <span className="text-xs text-red-200">
                            Please select a size
                          </span>
                        )}
                        <span className="pt-2 pb-2 pl-2">
                          {qty > 0 ? (
                            product.variants.map((data, i) =>
                              data.qty === 0 ? (
                                <button
                                  className="rounded-full border font-semibold text-xs py-4 px-[1.2rem] mr-3 mt-3 text-gray-500 "
                                  disabled={true}
                                  key={i}
                                >
                                  {data.size}
                                </button>
                              ) : (
                                <button
                                  className={`rounded-full border font-semibold text-xs py-4 px-[1.2rem] mr-3 mt-3 ${
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
                        </span>
                      </div>
                      <div className="h-10 w-full">
                        <button
                          className="flex items-center rounded-sm  justify-center focus:outline-none text-white text-sm sm:text-base py-3 w-full transition duration-150 ease-in"
                          
                          style={{ background: "#ff3c67" }}
                          onClick={qty === 0 ? closeModal : addToCart}
                        >
                          <span className="mr-2 font-light text-sm tracking-wider ">
                            Done
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default AddtoCartModal;
