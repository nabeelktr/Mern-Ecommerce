import {
    ErrorMessage,
    Form, Formik, useField,
  } from 'formik';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { AddProductSchema } from '../../yup';
import { imagedb } from '../../../firebase/config';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import Axios from '../../../axiosInterceptors/axios';
import { BeatLoader } from 'react-spinners';
import { useLocation } from 'react-router-dom';

const MyTextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
        <input
          {...field}
          {...props}
          className={`bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500  ${
            meta.touched && meta.error ? 'border-red-500' : 'focus:border-black'
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
            meta.touched && meta.error ? 'border-red-500' : 'focus:border-black'
          }`}
        />
      </label>
    );
  };

const EditProduct = () => {
  const location = useLocation()
  const [products, setproducts] = useState([]);
  const [images, setimages] = useState();
  const [uploadedimg, setuploadedimg] = useState([]);
  const submitRef = useRef();
  const imgRef = useRef()

  const deleteImage = (img) => {
    const result = images.filter((imgs) => imgs != img);
    setimages(result);
  }

  const deleteUploadedImage = (img) => {
    const result = uploadedimg.filter((imgs) => imgs != img);
    setuploadedimg(result);
  }
  
  const imgHandle = (values) => {
    if(imgRef.current.value){
        setuploadedimg([...uploadedimg, values.image]);
        imgRef.current.value=null;
      }
  }

  useEffect(() => {
    const fetchdata = async() => {
        const response = await Axios.get(`/admin/products/${location.state}`);
        setproducts(response.data)
        setimages(response.data.images)
    };
    fetchdata();
  },[])
 
  const handleSubmit = async(values) => {
    try {
        if(uploadedimg[0]){
            const urls = await uploadFiles();
            for (const url of urls) {
                images.push(url);
            }
            setuploadedimg([]);
        }
        await Axios.post(`/admin/editproduct/${location.state}`, { values, images });
      } catch (error) {
        console.error('Error during image upload or data post:', error);
      }
  }

  const uploadFiles = async () => {
    const uploadPromises = uploadedimg.map(async (image) => {
      const uploadImageRef = ref(imagedb, `products/${image.name}`);
      const snap = await uploadBytes(uploadImageRef, image);
      const url = await getDownloadURL(uploadImageRef);
      return url
    });
    const uploadedUrls = await Promise.all(uploadPromises);
    return uploadedUrls;
  }

  return (
    <section className=" dark:bg-gray-900 p-3 sm:p-5 antialiased ">
        <div className="relative mx-auto max-w-screen-xl px-4 lg:px-12">
          <div>
            <p className="text-sm font-bold uppercase my-6 p-2">Edit Product</p>
          </div>
          {/* <!-- Start coding here --> */}
          <div className= " flex flex-row bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden p-4">
   
     {products.name && <Formik
      initialValues={{
        name: products?.name,
        description: products?.description,
        price: products?.price,
        offerPrice: products?.offerPrice,
        category: products?.category,
        color: products?.color,
        size: products?.size,
        qty: products?.qty,
        gender: products?.gender,
       
      }}
       onSubmit={handleSubmit}
      >
        {({isSubmitting}) => (
        <Form className='flex w-1/2'>
            <div className='w-full pr-4'>
          <MyTextField type="text" name="name" label="Name" />
          <MyTextAreaField type="textarea" name="description" label="Description" />
          <MyTextField type="number" name="price" label="Price" />
          <MyTextField type="number" name="offerPrice" label="Offerprice" />
          <MyTextField type="text" name="category"  label="Category" />
          <MyTextField type="text" name="color"  label="Color" />
          <MyTextField type="text" name="size"  label="Size" />
          <MyTextField type="number" name="qty"  label="Quantity" />
          <MyTextField type="text" name="gender"  label="Gender" />
          </div>
          {isSubmitting ? <div className="flex justify-center h-6 p-2  absolute bottom-4 right-4">
                  <BeatLoader color='#4299e1' />
                </div> :<button type="submit" className="p-2  absolute bottom-4 right-4 bg-blue-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded inline-flex items-center" >Update Product</button>
          }
        </Form>
        )}
        </Formik>}
           
          <Formik
          initialValues={{
            image: '',
          }}
          validationSchema={AddProductSchema}
          onSubmit={imgHandle}
          >
            {({setFieldValue}) => (
            <Form className='w-1/2 pl-4 mb-2 '>
          <input
            hidden
            ref={imgRef}
            type='file'
            onChange={async(e) => {
              await setFieldValue('image', e.target.files[0]);
              submitRef.current.click();
            }}
            
            />
            <ErrorMessage name="image" component="div" className="text-xs text-red-600 mb-2" />
            <button
            type='#'
            onClick={() => imgRef.current.click()}
            className='p-4 mt-5 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center'>
              Upload Image
              </button>
             <div className='flex flex-row p-4 overflow-auto mb-6'>

                {images && images.map((img,i) => (
                    <Fragment key={i} >
                  <img src={img}  alt="Uploaded Image" height="400px" width="300px" className='m-2' />
                  <button onClick={() => deleteImage(img)} className='flex mt-3 text-xs items-center bg-slate-300 h-6 p-2 rounded-lg -ml-10 mr-2 text-red-600 hover:bg-slate-100 hover:text-black'>X</button>
                    </Fragment>
                  ))}
                
                {uploadedimg[0] && uploadedimg.map((img,i) => (
                  <Fragment key={i} >
                  <img src={URL.createObjectURL(img)}  alt="Uploaded Image" height="400px" width="300px" className='m-2' />
                  <button onClick={() => deleteUploadedImage(img)} className='flex mt-3 text-xs items-center bg-slate-300 h-6 p-2 rounded-lg -ml-10 mr-2 text-red-600 hover:bg-slate-100 hover:text-black'>X</button>
                  </Fragment>
                  ))}
                  

            </div> 
          <button type="submit" className='hidden' ref={submitRef} >Add Image</button>
          </Form>
          )}
          </Formik>
          
        


    </div>
    </div>
    </section>
  )
}

export default EditProduct