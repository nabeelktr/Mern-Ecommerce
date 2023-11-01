import {
  List,
  ListItem,
  ListItemSuffix,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { ErrorMessage, Form, Formik, useField } from "formik";
import React, {  useState } from "react";
import TrashIcon from "./trashIcon/TrashIcon";
import { variantSchema } from "../../../yup";
import EditForm from "./EditForm/EditForm";


const AddVariants = ({ variants, setVariants }) => {

    const [edit, setEdit] = useState({})
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

  const handleSubmit = (values, action) => {
  
    const dupe = variants.find((variant) => variant.size === values.size);
    if(dupe){
        action.setFieldError('size', 'Already exist');
    }else{
        setVariants([...variants, values]);
        action.resetForm()
    }
   
  };

  const deleteVariant = (variant) => {
    const filtered = variants.filter((vari) => vari !== variant)
    setVariants(filtered)
  }

  
   
  return (
    <>
      {
        edit.size ?
        <EditForm edit={edit} setEdit={setEdit} variants={variants} setVariants={setVariants} />
        
        :
        <Formik
        initialValues={{
          size: "",
          qty: "",
        }}
        validationSchema={variantSchema}
        onSubmit={handleSubmit}
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
             ADD
            </Button>
            
          </div>
        </Form>
      </Formik>
      }

      {variants[0] && (
        <List className="w-4/6 text-sm">
          {variants.map((variant, i) => (
            <ListItem ripple={false} className="py-1 pr-1 pl-4 " key={i}   onClick={() =>  {
                if(edit.size){
                    setEdit({});
                }else{

                    setEdit(variant);
                }
                } }>
              <div className="flex justify-between w-full">
                <span>Size: {variant.size}</span>
                <span className="mr-4">Qty: {variant.qty}</span>
              </div>
              <ListItemSuffix >
                <IconButton variant="text" color="blue-gray" onClick={(e) =>{
                  e.stopPropagation(); 
                  deleteVariant(variant);
                } }>
                  <TrashIcon />
                </IconButton>
              </ListItemSuffix>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default AddVariants;
