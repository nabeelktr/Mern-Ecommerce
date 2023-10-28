import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
import { AddProductSchema } from "../../yup";
import { imagedb } from "../../../firebase/config";
import Axios from "../../../axiosInterceptors/axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const AddCategory = () => {
  const imageRef = useRef();
  const [image, setimage] = useState()

  const handleSubmit = async(values, action) => {
    const imagedata = await uploadFiles();
    await Axios.post('admin/addcategory', {name: values.name, image: imagedata});
    action.resetForm();
    setimage();
  }

  const uploadFiles = async () => {
      const uploadImageRef = ref(imagedb, `category/${image.name}`);
      const snap = await uploadBytes(uploadImageRef, image);
      const url = await getDownloadURL(uploadImageRef);
      return { url: url, path: `category/${image.name}` };  
  };

  return (
    <section className=" dark:bg-gray-900 p-3 sm:p-5 antialiased ">
      <div className="relative mx-auto max-w-screen-xl px-4 lg:px-12">
        <div>
          <p className="text-sm font-bold uppercase my-6 p-2">Add Category</p>
        </div>
        <div className=" bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden p-4">
          <Formik
            initialValues={{
              name: "",
              image: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={AddProductSchema}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="flex w-full">
                <div className="w-1/2 pr-4">
                  <label
                  className="block mb-2 ml-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                  Category Name
                  </label>
                  <Field type="text" name="name" label="Name"
                   className='bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  />
                </div>
                <div className="w-1/2 pl-4 mb-2 ">
                  <input
                    hidden
                    ref={imageRef}
                    type="file"
                    onChange={ (e) => {
                      setFieldValue("image", e.target.files[0]);
                      setimage(e.target.files[0]);
                    }}
                  />
                  <ErrorMessage name="image" component="div" className="text-xs text-red-600 mb-2" />
                  <button
                    type="button"
                    onClick={() => imageRef.current.click()}
                    className="p-4 mt-7 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                  >
                    Upload Image
                  </button>
                <div className="flex p-4 overflow-auto mb-6">
                  {image &&
                      <img
                      src={URL.createObjectURL(image)}
                      alt="Uploaded Image"
                      height="400px"
                      width="300px"
                      className="m-2"
                      />
                    }
                </div>
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
                    Add Category
                  </button>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default AddCategory;
