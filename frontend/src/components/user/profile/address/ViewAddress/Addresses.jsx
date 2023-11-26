import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Axios from "../../../../../axiosInterceptors/userAxios";
import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Toaster, toast } from "sonner";
import AddressForm from "../../../cart/addAddress/addressForm/AddressForm";

const Addresses = ({ refreshKey, setRefreshKey }) => {
  const [modal, setmodal] = useState(false);
  const [address, setAddress] = useState();
  const navigate = useNavigate();

  const fetchdata = async () => {
    const { data } = await Axios.get("getUserAddress");
    setAddress(data.address[0].shippingAddress);
  };

  const removeAddress = async (id) => {
    await Axios.get(`/removeAddress/${id}`);
    fetchdata();
  };

  const closeModal = () => {
    setmodal(false);
  };

  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div className="p-4 m-4 border w-full  justify-center shadow-sm font-poppins tracking-wide">
      <Toaster position="top-center" closeButton />
      <div className="border-b md:p-4 md:mx-40 md:px-8 font-semibold tracking-widest md:text-sm text-[0.7rem] ">
        <p>Address Details</p>
      </div>
      <div className="md:mx-44 pt-4 flex justify-end mb-3  ">
        <button
          onClick={() => setmodal(true)}
          className="bg-white hover:bg-gray-100 font-semibold md:py-2 py-1 md:px-4 px-1 border border-gray-400 md:text-xs text-[0.6rem] flex items-center gap-2 shadow-sm"
        >
          <PlusIcon className="md:h-5 h-3 md:w-5 w-3" />
          ADD&nbsp;ADDRESS
        </button>
      </div>
      <div className="md:p-4 p-2 justify-center md:mx-40 bg-gray-50 border ">
        <div className="md:m-4 md:gap-10 ">
          {address &&
            address.map((item, i) => (
              <Card
                className="md:w-4/6 flex-row md:p-2 md:m-2 relative rounded-none border shadow-sm text-black 
                hover:shadow-md cursor-pointer"
                onClick={() =>
                  navigate("/profile/editAddress", { state: item })
                }
                style={{
                  transition: "transform 0.3s",
                  transformOrigin: "center",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.01)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
                key={i}
              >
                <CardBody>
                  <Typography className="md:mb-2 font-bold text-[0.6rem] md:text-sm ">
                    {item.name}
                  </Typography>
                  <Typography className="text-[0.6rem] md:text-sm">
                    {item.address}, {item.pincode}.
                  </Typography>
                  <Typography className="text-[0.6rem] md:text-sm">
                    {item.phone}
                  </Typography>
                  <Typography className="text-[0.6rem] md:text-sm">
                    {item.location}, {item.district}, {item.state}.
                  </Typography>
                </CardBody>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.warning("Delete Address", {
                      description: "Are you sure you want to delete.",
                      action: {
                        label: "Yes, Iam sure.",
                        onClick: () => removeAddress(item._id),
                      },
                    });
                  }}
                  type="button"
                  className="absolute bg-white rounded-md p-1 h-6 right-1 top-1 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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
              </Card>
            ))}
        </div>
      </div>
      <AddressForm
        setRefreshKey={setRefreshKey}
        refreshKey={refreshKey}
        modal={modal}
        closeModal={closeModal}
      />
    </div>
  );
};

export default Addresses;
