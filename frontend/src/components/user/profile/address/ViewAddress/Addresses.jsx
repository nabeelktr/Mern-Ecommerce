import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Axios from "../../../../../axiosInterceptors/userAxios";
import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Toaster, toast } from "sonner";

const Addresses = () => {
  const [address, setAddress] = useState();
  const navigate = useNavigate();

  const fetchdata = async () => {
    const { data } = await Axios.get("getUserAddress");
    setAddress(data.address[0].shippingAddress);
  };

  const removeAddress = async(id) => {
    await Axios.get(`/removeAddress/${id}`);
    fetchdata();
  }

  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div className="p-4 m-4 border  justify-center shadow-sm font-poppins tracking-wide">
      <Toaster position="top-center"  closeButton />
      <div className="border-b p-4 mx-40 px-8 font-semibold tracking-widest">
        <p>Address Details</p>
      </div>
      <div className="mx-44 pt-4 flex justify-end mb-3  ">
        <button
          onClick={() => navigate("/profile/addAddress")}
          className="bg-white hover:bg-gray-100 font-semibold py-2 px-4 border border-gray-400 text-xs flex items-center gap-2 shadow-sm"
        >
          <PlusIcon className="h-5 w-5"/>  
          ADD ADDRESS
        </button>
      </div>
      <div className="p-4 justify-center mx-40 bg-gray-50 border ">
        <div className=" m-4 gap-10 ">
          {address &&
            address.map((item, i) => (
              <Card
                className="w-4/6  flex-row p-2 m-2 relative rounded-none border shadow-sm text-black 
                hover:shadow-md cursor-pointer"
                onClick={() => navigate('/profile/editAddress', {state: item})}
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
                  <Typography className="mb-2 font-bold text-sm ">
                    {item.name}
                  </Typography>
                  <Typography className="text-xs">
                    {item.address}, {item.pincode}.
                  </Typography>
                  <Typography className="text-xs">{item.phone}</Typography>
                  <Typography className="text-xs">
                    {item.location}, {item.district}, {item.state}.
                  </Typography>
                </CardBody>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); 
                    toast.warning('Delete Address', {
                      description: 'Are you sure you want to delete.',
                      action: {
                        label: 'Yes, Iam sure.',
                        onClick: () => removeAddress(item._id)
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
    </div>
  );
};

export default Addresses;
