import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';

const AddProducts = () => {
  const [color, setColor] = useState({
    color: '',
    qty: '',
  });
  return (
    <div>
      <Formik>
        <Form>
          <Field type="text" name="nsme" />
        </Form>
      </Formik>
      <div>
        <p>{color}</p>
      </div>
    </div>
  );
};

export default AddProducts;
