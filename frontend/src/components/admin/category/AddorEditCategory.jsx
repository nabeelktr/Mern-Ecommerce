import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
import { AddCategorySchema } from "../../yup";
import { imagedb } from "../../../firebase/config";
import Axios from "../../../axiosInterceptors/axios";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useLocation } from "react-router-dom";

const AddCategory = () => {
  const location = useLocation();
  const imageRef = useRef();
  const [image, setimage] = useState();
  const [uploadedimage, setuploadedimage] = useState();
  const [data, setdata] = useState()

  const handleSubmit = async(values, action) => {
    try{
      let imagedata;
    if(location.state ){
        if(uploadedimage){
          imagedata = await uploadFiles();
          await Axios.post(`admin/editcategory/${location.state}`, {name: values.name, image: imagedata});
        }else{
            imagedata = image;
            await Axios.post(`admin/editcategory/${location.state}`, {name: values.name, image: imagedata});
        }
    }else{
      imagedata = await uploadFiles();
      await Axios.post('admin/addcategory', {name: values.name, image: imagedata});
      action.resetForm();
      setuploadedimage();
    }
  }catch(err){
    console.log(err);
    action.setFieldError('name', 'Category Already exist.')
  }
  }

  const uploadFiles = async () => {
      const uploadImageRef = ref(imagedb, `category/${uploadedimage.name}`);
      const snap = await uploadBytes(uploadImageRef, uploadedimage);
      const url = await getDownloadURL(uploadImageRef);
      return { url: url, path: `category/${uploadedimage.name}` };  
  };

  if(location.state){
    useEffect(() => {
        fetchdata();
    },[])
  }
  
  const deleteImage = async() => {
    const imageref = ref(imagedb, `${image.path}`);
    const res = await deleteObject(imageref);
    setimage()
    return res
  }

  const fetchdata = async() => {
    const response = await Axios.get(`/admin/category/${location.state}`);
    setdata(response.data)
    setimage(response.data.image)
  };

  if (!data && location.state){
    return <BeatLoader />
  }

  return (
    <section className=" dark:bg-gray-900 p-3 sm:p-5 antialiased ">
      <div className="relative mx-auto max-w-screen-xl px-4 lg:px-12">
        <div>
          <p className="text-sm font-bold uppercase my-6 p-2">{location.state ? 'Edit ':'Add '}Category</p>
        </div>
        <div className=" bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden p-4">
          <Formik
            initialValues={{
              name: data?.name ? data.name : '',
              image: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={AddCategorySchema}
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
                  <ErrorMessage name="name" component="div" className="text-xs text-red-600 mb-2" />

                </div>
                <div className="w-1/2 pl-4 mb-2 ">
                  <input
                    hidden
                    ref={imageRef}
                    type="file"
                    onChange={ (e) => {
                      setFieldValue('image', e.target.files[0])
                      if (image?.url){
                        deleteImage()
                        .then(() => {
                            setuploadedimage(e.target.files[0]);
                        })
                      }else{
                        setuploadedimage(e.target.files[0]);
                      }
                    }}
                  />
                  <ErrorMessage name="image" component="div" className="text-xs text-red-600 mb-2" />
                  <button
                    type="button"
                    onClick={() => imageRef.current.click()}
                    className="p-4 mt-7 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                  >
                    {location.state ? 'Change ':'Upload '} Image
                  </button>
                <div className="flex p-4 overflow-auto mb-6">
                  {(uploadedimage || image) &&
                      <img
                      src={image?.url ? image.url : URL.createObjectURL(uploadedimage)}
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
                    {location.state ? 'Update ':'Add '} Category
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
