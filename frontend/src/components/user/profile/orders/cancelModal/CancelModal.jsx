import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import Axios from "../../../../../axiosInterceptors/userAxios";
import { Button } from "@material-tailwind/react";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CancelModal = ({ id, modal, closeModal }) => {
    const navigate = useNavigate();
    const cancelOrder = async () => {
        try{
            await Axios.post('/cancelorder', {id})
            closeModal();
            navigate('/profile/viewOrders');
        }catch{
            toast.warning('This Order cannot be cancelled')
            closeModal();
        }
    }
  return (
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg p-4 font-poppins ">
                <span className="font-semibold text-sm">
                  Are you sure, you want to cancel this order?
                </span>
                <div className="mt-4 flex justify-end gap-2">
                  <Button
                    className="mt-2 flex gap-1 items-center border border-black bg-white hover:bg-gray-400 text-black font-light py-2 px-4 rounded font-poppins tracking-wider"
                  >
                     contact seller
                    <ChatBubbleLeftRightIcon className="h-4 w-4"/>
                  </Button>
                  <Button
                  onClick={cancelOrder}
                    variant="gradient"
                    className="mt-2 items-center bg-gray-300 hover:bg-gray-400 text-gray-200 font-light py-2 px-4 rounded font-poppins tracking-wider"
                  >
                    Yes, I'm sure
                  </Button>
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
  );
};

export default CancelModal;
