import React, { useEffect } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, HeartIcon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import Axios from '../../axiosInterceptors/userAxios'
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

const Navbar = () => {
  const navigate = useNavigate();
  let token;
  const signout = async() => {
    if(token){
      localStorage.removeItem('userToken');
      await Axios.get('/logout');
      navigate('/home');
    }else{
      navigate('/login');
    }
  };

  const navigation = [
    { name: "HOME", current: false, onClick: () => navigate('/home') },
    { name: "MEN", current: false },
    { name: "WOMEN", current: false },
    { name: "KIDS", current: false },
    { name: "SHOP", current: false, onClick: () => navigate('/products') },
  ];
  
  useEffect(() => {
    token = localStorage.getItem('userToken')
  },[signout])
  return (
    <Disclosure as="nav" className="bg-white shadow-sm w-full fixed z-10">
      {({ open }) => (
        <>
          <div className="mr-4 ml-8  px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
                <div className="ml-14 item-center sm:ml-0 sm:block">
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
              <div className="absolute inset-y-0 right-0 flex  items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-8 gap-4">
                <button
                  type="button"
                  className="relative p-3 text-black hover:text-gray-700 "
                  onClick={() => navigate('/cart')}
                >

                  <ShoppingBagIcon className="h-5 w-5" />

              
                </button>
                <button
                  type="button"
                  className="relative p-3 text-black hover:text-gray-700 "
                  
                >
                  <HeartIcon className="h-5 w-5" />
                 
                 
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex  text-sm   focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
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
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {token &&
                        <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => navigate('/profile')}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      }

                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={signout}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            {token ? 'Sign out' : 'Login'}
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
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-300"
                      : "text-gray-500",
                    "block rounded-md px-3 py-2 text-base font-normal"
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
