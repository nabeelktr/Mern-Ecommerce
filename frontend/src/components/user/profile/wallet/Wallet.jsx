import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Fragment, useEffect, useState } from "react";
import Axios from "../../../../axiosInterceptors/userAxios";
import Transactions from "./Transactions";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@material-tailwind/react";
import { Toaster, toast } from "sonner";

const Wallet = () => {
  const navigate = useNavigate();
  const [Wallet, setWallet] = useState();
  const [amount, setamount] = useState('');
  const [modal, setmodal] = useState(false);

  const fetchdata = async () => {
    const { data } = await Axios.get("/wallet");
    setWallet(data);
  };



  const checkoutHandler = async () => {
    setmodal(false);
    const {
      data: { key },
    } = await Axios.get("/getkey");

    const {
      data: { order },
    } = await Axios.post("/checkout", {
      price: amount,
    });

    const options = {
      key,
      amount: amount * 100,
      currency: "INR",

      order_id: order.id,
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
      handler: async function (response) {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
        await Axios.post("/addBalance", {
          amount, razorpay_payment_id, razorpay_order_id, razorpay_signature
        });
        toast.success('Amount added successful')
        fetchdata();
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
    setamount('')
  };

  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <>
    <Toaster position="top-center" />
      <div className="p-4 m-4 border w-full  justify-center shadow-sm font-poppins tracking-widest">
        <div className="border-b md:p-4 md:px-8 text-[0.7rem] md:text-sm font-semibold">
          <p>My Wallet</p>
        </div>
        <div className="md:px-16 md:pt-4 pt-2 flex justify-end mb-3  ">
          <button
            onClick={() => setmodal(true)}
            className="bg-white hover:bg-gray-100 font-semibold md:py-2 py-1 px-2 md:px-4 border border-gray-400 md:text-xs text-[0.6rem] flex items-center gap-2 shadow-sm"
          >
            <PlusIcon className="md:h-5 h-3 md:w-5 w-3" />
            ADD BALANCE
          </button>
        </div>
        <div className="md:p-4   md:px-10 flex flex-col justify-start gap-5 md:gap-10 ">
          <div className="md:p-4  w-full flex flex-col justify-center ">
            <div className="flex justify-center items-center gap-3">
              <img src="/mantra-credit-logo.svg" className="w-[4rem] md:w-[5rem]" />
              <span className="font-semibold md:text-[1.5rem] text-[1rem] mt-5">
                &#8377; {Wallet ? Wallet.balance : 0}
              </span>
            </div>
            <div className="border md:mt-16 mt-4 items-center justify-between flex shadow-sm cursor-pointer">
              <span className="py-3 px-5 text-[0.7rem] md:text-sm">Transaction Log</span>
            </div>
            {Wallet && <Transactions transactions={Wallet?.transactions} />}
          </div>
        </div>
      </div>
      <Transition.Root show={modal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 "
          onClose={() => setmodal(false)}
        >
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg p-4 font-poppins ">
                  <Dialog.Title>Enter Amount</Dialog.Title>
                  <div className="flex">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setamount(e.target.value)}
                      className="mt-4 peer h-full w-3/4 rounded-[3px] border border-blue-gray-200  bg-transparent px-3 py-3.5 font-sans text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200
                placeholder-shown:border-t-blue-gray-200  focus:border-black  "
                    />
                    <Button
                      onClick={() => {
                        if(amount){
                          checkoutHandler();
                        }else{
                          toast.warning('enter amount')
                        }
                      }
                      }
                      variant="gradient"
                      className="ml-2 mt-4 w-1/4 items-center bg-gray-300 hover:bg-gray-400 text-gray-200 font-light py-2 px-4 rounded font-poppins tracking-wider"
                    >
                      ADD BALANCE
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Wallet;
