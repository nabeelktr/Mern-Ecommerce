/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate, useLocation } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const AdminNav = () => {
  const location = useLocation();
  const [currentRoute] = useState(location.pathname);
  const admin = localStorage.getItem('adminToken');
  const navigate = useNavigate();
  const signOut = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };
  const navigation = [
    { name: 'DASHBOARD', current: /^\/admin\/dashboard($|\/)/.test(currentRoute), onClick: () => navigate('/admin/dashboard')},
    { name: 'ORDERS', current: /^\/admin\/orders($|\/)/.test(currentRoute), onClick: () => navigate('/admin/orders')},
    { 
      name: 'PRODUCTS', current: /^\/admin\/products($|\/)/.test(currentRoute), onClick: () => navigate('/admin/products')
    },
    {
      name: 'USERS', current: currentRoute === '/admin/users', onClick: () => navigate('/admin/users'),
    },
    {
      name: 'CATEGORY', current: /^\/admin\/category($|\/)/.test(currentRoute), onClick: () => navigate('/admin/category'),
    },
    { name: 'COUPONS', current: /^\/admin\/coupons($|\/)/.test(currentRoute), onClick: () => navigate('/admin/coupons') },
    { name: 'MESSAGES', current: currentRoute === '/admin/messages' },
  ];
  return (
    <>
    <Disclosure as="nav" className="bg-white shadow-sm w-full fixed z-10">
      {({ open }) => (
        <>
          <div className="mx-auto  px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
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
              <div className="ml-14  sm:ml-0 sm:block">
                <img
                  className="h-8  w-auto"
                  src="../../src/assets/Logo.svg"
                  alt="Your Company"
                />
              </div>
              {admin
              && (
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          onClick={item.onClick}
                          className={classNames(
                            item.current
                              ? 'text-black font-bold'
                              : 'text-gray-500 hover:text-black ',
                            'rounded-md px-3 py-2 text-sm font-medium cursor-pointer',
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div className="absolute inset-y-0 right-0 flex  items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  {admin
                  && (
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  )}
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
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={signOut}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700',
                            )}
                          >
                            Sign out
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
                  onClick={item.onClick}
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-300'
                      : 'text-gray-500',
                    'block rounded-md px-3 py-2 text-base font-normal',
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
    <div className='pt-16'></div>
    </>
  );
};

export default AdminNav;
