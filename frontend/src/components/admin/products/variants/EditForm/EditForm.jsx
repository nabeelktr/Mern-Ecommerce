import { ErrorMessage, Form, Formik, useField } from 'formik'
import React, { useEffect } from 'react'
import { variantSchema } from '../../../../yup';
import { Button } from '@material-tailwind/react';

const EditForm = ({edit, setEdit, variants, setVariants}) => {

    const MyTextField = ({ label, ...props }) => {
        const [field, meta] = useField(props);
    
        return (
          <>
            <label className=" text-sm font-bold text-gray-900 dark:text-white">
              {label}
            </label>
            <input
    
              {...field}
              {...props}
              className={`bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500  ${
                meta.touched && meta.error ? "border-red-500" : "focus:border-black"
              }`}
            />
          <ErrorMessage name={field.name} component="div" className="text-xs text-red-600 mb-2 " />
    
          </>
        );
      };

      const handleEdit = (values, action) => {
        
        const updatedList = variants.map((list)=> list._id === edit._id
        ?(list = {_id:list._id , size : values.size , qty : values.qty})
        :(list = {_id:list._id , size:list.size , qty : list.qty})
        )
        setVariants(updatedList)
        setEdit({})
      }
   
  return (
    <Formik
        initialValues={{
          size: edit?.size,
          qty: edit?.qty,
        }}
        validationSchema={variantSchema}
        onSubmit={handleEdit}
      >
        <Form className=" flex gap-10 ">
          <div className="w-1/5 ">
            <MyTextField type="text" name="size" label="Size" />
          </div>
          <div className="w-1/5 ">
            <MyTextField type="text" name="qty" label="Quantity" />
          </div>
          <div className="w-1/5 pr-2 pt-6">
            
            <Button type="submit" size="sm">
             EDIT
            </Button>
            
          </div>
        </Form>
      </Formik>
  )
}

export default EditForm