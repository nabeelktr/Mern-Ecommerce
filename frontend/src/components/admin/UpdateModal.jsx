/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
import React, {
  Fragment, useRef,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  ErrorMessage, Formik, useField, Form,
} from 'formik/dist';
import Axios from '../../axiosInterceptors/axios';

const MyTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (

    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {label}
      <input
        {...field}
        {...props}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500  ${
          meta.touched && meta.error ? 'border-red-500' : 'focus:border-black'
        }`}
      />
    </label>

  );
};

const UpdateModal = ({ modal, closeModal, user }) => {
  const cancelButtonRef = useRef(null);
  const updateUser = async (values) => {
    try {
      await Axios.post(`/admin/updateuser/${user._id}`, values);
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (

    <Transition.Root show={modal} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Edit User Details
                      </Dialog.Title>
                      <div className="mt-2">
                        <Formik
                          initialValues={{
                            name: user?.name,
                            phone: user?.phone,
                            email: user?.email,
                          }}
                          onSubmit={updateUser}
                        >
                          {({ isSubmitting }) => (
                            <Form>
                              <MyTextField name="name" type="text" label="Name" />
                              <ErrorMessage name="name" component="div" className="text-xs text-red-600 mb-2" />
                              <MyTextField name="phone" type="text" label="Phone" />
                              <ErrorMessage name="phone" component="div" className="text-xs text-red-600 mb-2" />
                              <MyTextField name="email" type="email" label="Email" />
                              <ErrorMessage name="email" component="div" className="text-xs text-red-600 mb-2" />
                              <div className="flex items-center space-x-4">
                                {isSubmitting && null}
                                <button
                                  type="submit"
                                  className={`text-white bg-cyan-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ease-in ${
                                    isSubmitting && 'opacity-80'
                                  }`}
                                >
                                  Update User
                                </button>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </div>
                  </div>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>

  );
};

export default UpdateModal;
