/* eslint-disable quotes */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { ErrorMessage, Form, Formik, useField } from "formik";
import React, { useRef, useState } from "react";
import { AddImageSchema, AddProductSchema } from "../../yup";
import { imagedb } from "../../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Axios from "../../../axiosInterceptors/axios";
import { BeatLoader } from "react-spinners";
import { Button } from "@material-tailwind/react";
import AddVariants from "./variants/AddVariants";
import Category from "./select/Category";

const MyTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label className="block  text-sm font-bold text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        {...field}
        {...props}
        className={`bg-gray-50 mb-2 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500  ${
          meta.touched && meta.error ? "border-red-500" : "focus:border-black"
        }`}
      />
      <ErrorMessage name={field.name} component="div" className="text-xs text-red-600 mb-2 " />
    </>
  );
};

const MyTextAreaField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label className="block  text-sm font-bold text-gray-900 dark:text-white">
        {label}
      </label>
      <textarea
        {...field}
        {...props}
        className={`bg-gray-50 mb-2 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500  ${
          meta.touched && meta.error ? "border-red-500" : "focus:border-black"
        }`}
      />
      <ErrorMessage name={field.name} component="div" className="text-xs text-red-600 mb-2 " />
    </>
  );
};

const AddProducts = () => {
  const [variants, setVariants] = useState([]);
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
      if (!variants[0]) {
        alert('Add variants size and qty');
      }else if (!images[0]) {
        alert('please upload images');
      }else{

        const urls = await uploadFiles();
        await Axios.post("/admin/addproducts", { values, urls, variants });
        setimages([]);
        setVariants([])
        action.resetForm();
      }
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
        <div className=" flex flex-wrap bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden p-4">
          <Formik
            initialValues={{
              name: "",
              description: "",
              price: "",
              offerPrice: "",
              category: "",
              color: "",
              gender: "",
              subCategory: "",
            }}
            validationSchema={AddProductSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-1/2 flex-wrap">
                <div className="w-1/2 pr-4">
                  <MyTextField type="text" name="name" label="Name" />
                  <MyTextField type="number" name="price" label="Price" />
                  <MyTextField
                    type="number"
                    name="offerPrice"
                    label="Offerprice"
                  />
                  {/* <MyTextField type="text" name="category" label="Category" /> */}
                  <Category name="category" type="text" label="Category" />
                </div>
                <div className="w-1/2 pr-4">
                  <MyTextField type="text" name="color" label="Color" />
                  <MyTextField type="text" name="gender" label="Gender" />
                  <MyTextField
                    type="text"
                    name="subCategory"
                    label="Sub Category"
                  />
                </div>
                <div className="w-full pr-4">
                  <MyTextAreaField
                    type="textarea"
                    name="description"
                    label="Description"
                  />
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
                    ADD
                  </button>
                )}
              </Form>
            )}
          </Formik>

          <div className="w-1/2 pl-20 ">
            <AddVariants variants={variants} setVariants={setVariants} />

            <Formik
              initialValues={{
                image: "",
              }}
              validationSchema={AddImageSchema}
              onSubmit={imgHandle}
            >
              {({ setFieldValue }) => (
                <Form>
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
                    className="text-xs text-red-600 mb-2 "
                  />
                  <Button
                    variant="gradient"
                    type="#"
                    onClick={() => imgRef.current.click()}
                    className="flex items-center gap-3 p-4 mt-5 bg-gray-300 hover:bg-gray-400 text-gray-200 font-bold py-2 px-4 rounded "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                      />
                    </svg>
                    Upload Image
                  </Button>
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
      </div>
    </section>
  );
};

export default AddProducts;
