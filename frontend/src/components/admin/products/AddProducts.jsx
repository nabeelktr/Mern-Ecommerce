/* eslint-disable quotes */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { ErrorMessage, Form, Formik, useField } from "formik";
import React, { useRef, useState } from "react";
import { AddProductSchema } from "../../yup";
import { imagedb } from "../../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Axios from "../../../axiosInterceptors/axios";
import { BeatLoader } from "react-spinners";

const MyTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {label}
      <input
        {...field}
        {...props}
        className={`bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500  ${
          meta.touched && meta.error ? "border-red-500" : "focus:border-black"
        }`}
      />
    </label>
  );
};

const MyTextAreaField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {label}
      <textarea
        {...field}
        {...props}
        className={`bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500  ${
          meta.touched && meta.error ? "border-red-500" : "focus:border-black"
        }`}
      />
    </label>
  );
};

const AddProducts = () => {
  const [images, setimages] = useState([]);
  const imgRef = useRef();
  const submitRef = useRef();

  const imgHandle = (values) => {
    if (imgRef.current.value) {
      setimages([...images, values.image]);
      imgRef.current.value = null;
    }
  };

  const handleSubmit = async (values, action) => {
    try {
      const urls = await uploadFiles();
      await Axios.post("/admin/addproducts", { values, urls });
      setimages([]);
      action.resetForm();
    } catch (error) {
      console.error("Error during image upload or data post:", error);
    }
  };

  const uploadFiles = async () => {
    const uploadPromises = images.map(async (image) => {
      const uploadImageRef = ref(imagedb, `products/${image.name}`);
      const snap = await uploadBytes(uploadImageRef, image);
      const url = await getDownloadURL(uploadImageRef);
      return { url: url, path: `products/${image.name}` };
    });
    const uploadedUrls = await Promise.all(uploadPromises);
    return uploadedUrls;
  };

  return (
    <section className=" dark:bg-gray-900 p-3 sm:p-5 antialiased ">
      <div className="relative mx-auto max-w-screen-xl px-4 lg:px-12">
        <div>
          <p className="text-sm font-bold uppercase my-6 p-2">Add Product</p>
        </div>
        <div className=" flex flex-row bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden p-4">
          <Formik
            initialValues={{
              name: "",
              description: "",
              price: "",
              offerPrice: "",
              category: "",
              color: "",
              size: "",
              qty: "",
              gender: "",
            }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-1/2">
                <div className="w-full pr-4">
                  <MyTextField type="text" name="name" label="Name" />
                  <MyTextAreaField
                    type="textarea"
                    name="description"
                    label="Description"
                  />
                  <MyTextField type="number" name="price" label="Price" />
                  <MyTextField
                    type="number"
                    name="offerPrice"
                    label="Offerprice"
                  />
                  <MyTextField type="text" name="category" label="Category" />
                  <MyTextField type="text" name="color" label="Color" />
                  <MyTextField type="text" name="size" label="Size" />
                  <MyTextField type="number" name="qty" label="Quantity" />
                  <MyTextField type="text" name="gender" label="Gender" />
                </div>
                {isSubmitting ? (
                  <div className="flex justify-center h-6 p-2  absolute bottom-4 right-4">
                    <BeatLoader color="#4299e1" />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="p-2  absolute bottom-4 right-4 bg-blue-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                  >
                    Add Product
                  </button>
                )}
              </Form>
            )}
          </Formik>

          <Formik
            initialValues={{
              image: "",
            }}
            validationSchema={AddProductSchema}
            onSubmit={imgHandle}
          >
            {({ setFieldValue }) => (
              <Form className="w-1/2 pl-4 mb-2 ">
                <input
                  hidden
                  ref={imgRef}
                  type="file"
                  onChange={async (e) => {
                    await setFieldValue("image", e.target.files[0]);
                    submitRef.current.click();
                  }}
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-xs text-red-600 mb-2"
                />
                <button
                  type="#"
                  onClick={() => imgRef.current.click()}
                  className="p-4 mt-5 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                >
                  Upload Image
                </button>
                <div className="flex flex-row p-4 overflow-auto mb-6">
                  {images[0] &&
                    images.map((img, i) => (
                      <img
                        src={URL.createObjectURL(img)}
                        key={i}
                        alt="Uploaded Image"
                        height="400px"
                        width="300px"
                        className="m-2"
                        onClick={uploadFiles}
                      />
                    ))}
                </div>
                <button type="submit" className="hidden" ref={submitRef}>
                  Add Image
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default AddProducts;
