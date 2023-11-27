import React, { useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  HeartIcon,
  MagnifyingGlassIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import Axios from "../../axiosInterceptors/userAxios";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/features/authSlice";
import { setRefresh } from "../../redux/features/filterSlice";
import { Field, Form, Formik } from "formik";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const [profileMenu, setprofileMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const signout = async () => {
    if (isLoggedIn) {
      dispatch(signOut());
      localStorage.removeItem("userToken");
      await Axios.get("/logout");
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  const handleSubmit = (values) => {
    console.log(values);
    dispatch(setRefresh());
    navigate('/products', { state: values})
  }

  const navigation = [
    {
      name: "MEN",
      current: false,
      onClick: () => {
        dispatch(setRefresh());
        navigate("/products", { state: { gender: "Men" } });
      },
    },
    {
      name: "WOMEN",
      current: false,
      onClick: () => {
        dispatch(setRefresh());
        navigate("/products", { state: { gender: "Women" } });
      },
    },
    {
      name: "KIDS",
      current: false,
      onClick: () => {
        dispatch(setRefresh());
        navigate("/products", { state: { gender: "Kids" } });
      },
    },
    {
      name: "SHOP",
      current: false,
      onClick: () => {
        dispatch(setRefresh());
        navigate("/products");
      },
    },
  ];


  return (
    <Disclosure
      as="nav"
      className="bg-white shadow-sm w-full fixed z-10 font-poppins"
    >
      {({ open }) => (
        <>
          <div className="mr-4 md:ml-8  px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-[4.7rem] items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2  hover:text-white ">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6 text-gray-500" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6 text-gray-500" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="ml-14 item-center sm:ml-0 sm:block cursor-pointer" onClick={() => navigate('/home')} >
                <img
                  className="h-8 ml-1 -mb-1 w-auto"
                  src="/src/assets/Logo.svg"
                  alt="Your Company"
                />
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        onClick={item.onClick}
                        className={classNames(
                          item.current
                            ? "text-black font-bold "
                            : "text-gray-700 hover:text-black ",
                          "rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex  items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-8 gap-3 ">
                <div className="relative pr-10 md:block hidden">
                <Formik
                initialValues={{
                  search: '',
                }}
                onSubmit={handleSubmit}
                >
                  <Form>
                    <MagnifyingGlassIcon className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-600" />
                    <Field type="text" name="search" placeholder="Search for products, brand and more" className=" bg-gray-100 py-[0.7rem] text-xs  font-poppins rounded-sm pl-12 w-[35rem] placeholder:text-gray-600 placeholder:font-light" />
                  </Form>
                </Formik>
                </div>
                <button
                  type="button"
                  className="relative p-3 text-black hover:text-gray-700 "
                  onClick={() => navigate("/cart")}
                >
                  <ShoppingBagIcon className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="relative p-3 text-black hover:text-gray-700 "
                  onClick={() => navigate("/wishlist")}
                >
                  <HeartIcon className="h-5 w-5" />
                </button>

                {/* Profile dropdown */}
                <Menu
                  as="div"
                  className="relative ml-3"
                  onMouseEnter={() => setprofileMenu(true)}
                  onMouseLeave={() => setprofileMenu(false)}
                >
                  <div>
                    <Menu.Button className="relative flex  text-sm">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <UserIcon className="h-5 w-5" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                    show={profileMenu}
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {isLoggedIn && (
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={() => navigate("/profile")}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                      )}

                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={signout}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            {isLoggedIn ? "Sign out" : "Login"}
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
            <div className="relative">
                <Formik
                initialValues={{
                  search: '',
                }}
                onSubmit={handleSubmit}
                >
                  <Form>
                    <MagnifyingGlassIcon className="absolute left-3.5 top-3 w-3 h-3 text-gray-600" />
                    <input type="text" name="search" placeholder="Search for products, brand and more" className="w-full bg-gray-100 py-[0.6rem] text-[0.7rem]  font-poppins rounded-sm pl-10  placeholder:text-gray-600 placeholder:font-light" />
                  </Form>
                </Formik>
                </div>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  onClick={item.onClick}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? "bg-gray-300" : "text-gray-500",
                    "block rounded-md px-3 py-2 text-xs font-normal"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
