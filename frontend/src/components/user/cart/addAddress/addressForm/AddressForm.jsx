import { TabsBody, Typography } from "@material-tailwind/react";
import { ErrorMessage, Form, Formik, useField } from "formik";
import { AddressSchema } from "../../../../yup";
import Axios from "../../../../../axiosInterceptors/userAxios";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";


const AddressForm = ({ setRefreshKey, refreshKey, modal, setmodal }) => {
  const MyTextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="relative md:mt-5 mt-2 md:text-sm text-[0.6rem] w-[18rem] md:w-full" >
        <input
          {...field}
          {...props}
          className={`peer h-full w-full rounded-[3px] border border-blue-gray-200 border-t-transparent bg-transparent md:px-3 px-2 md:py-3.5 py-3 font-sans md:text-sm text-[0.6rem] font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200
       placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent 
       focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50${
         meta.touched && meta.error ? "border-red-500" : ""
       }`}
          placeholder=" "
        />
        <label
          className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none md:text-[11px] text-[0.6rem]
        font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border 
        before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all 
        after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-sm 
        after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm 
        peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent
         peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 
         peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 
         peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent 
         peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
        >
          {label}
        </label>
        <ErrorMessage
          name={field.name}
          component="div"
          className="md:text-xs text-[0.6rem] text-red-600 mb-2"
        />
      </div>
    );
  };

  const handleSubmit = async (values, action) => {
    const res = await Axios.post("/addAddress", values);
    if (setRefreshKey != undefined) {
      setRefreshKey(refreshKey + 1);
    }
    action.resetForm();
    toast.success("Address added successful");
  };

  return (
    <>
      <Transition.Root show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={() => setmodal(false)}>
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
                  <div className="flex flex-col shadow-sm border  bg-white  px-4 sm:px-6 md:px-8 lg:px-10 py-8  w-full  font-serif">
                    <div>
                      <Formik
                        initialValues={{
                          name: "",
                          phone: "",
                          pincode: "",
                          address: "",
                          location: "",
                          district: "",
                          state: "",
                        }}
                        validationSchema={AddressSchema}
                        onSubmit={handleSubmit}
                      >
                        {({ isSubmitting }) => (
                          <Form>
                            <Typography className="uppercase md:text-xs text-[0.6rem] font-bold">
                              Contact details
                            </Typography>
                            <MyTextField
                              type="text"
                              name="name"
                              label="Name*"
                            />
                            <MyTextField
                              type="text"
                              name="phone"
                              label="Mobile Number*"
                            />

                            <Typography className="uppercase md:text-xs text-[0.6rem] font-bold md:mt-7 mt-4">
                              Address
                            </Typography>
                            <MyTextField
                              type="text"
                              name="pincode"
                              label="Pincode*"
                            />
                            <MyTextField
                              type="text"
                              name="address"
                              label="Address (House No, Building, Street, Area)*"
                            />
                            <MyTextField
                              type="text"
                              name="location"
                              label="Location / Town*"
                            />
                            <MyTextField
                              type="text"
                              name="district"
                              label="city / district*"
                            />
                            <MyTextField
                              type="text"
                              name="state"
                              label="state*"
                            />

                            <button
                              type="submit"
                              className={`flex rounded-sm items-center justify-center focus:outline-none md:mt-20 mt-5  sm:text-[0.6rem] bg-blue-600 hover:bg-blue-700  py-2 w-full transition duration-150 ease-in ${
                                isSubmitting && "opacity-80"
                              }`}
                              style={{ background: "#ff3c67" }}
                            >
                              <Typography className="mr-2 uppercase p-1 font-bold text-gray-100 md:text-sm text-[0.7rem]">
                                Add Address
                              </Typography>
                            </button>
                          </Form>
                        )}
                      </Formik>
                    </div>
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

export default AddressForm;
