/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { Button, Typography } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Axios from '../../axiosInterceptors/axios';
import DeleteModal from './DeleteModal';
import UpdateModal from './UpdateModal';

const UserTable = () => {
  
  const [deleteModal, setdeleteModal] = useState(false);
  const [editModal, seteditModal] = useState(false);
  const [users, setusers] = useState([]);
  const [searchval, setsearchval] = useState('');
  const [updateUser, setupdateUser] = useState();
  const [load, setload] = useState(false);

  const [currentpage, setcurrentpage] = useState(1);
  const recordsPerPage = 2;
  const lastIndex = recordsPerPage * currentpage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = users.slice(firstIndex, lastIndex);
  const npage = Math.ceil(users.length / recordsPerPage);

  const deleteOnClose = () => {
    setdeleteModal(false);
    seteditModal(false);
  };

  const openDeleteModal = (user) => {
    setupdateUser(user);
    setdeleteModal(true);
  };

  const openEditModal = (user) => {
    setupdateUser(user);
    seteditModal(true);
  };

  const handleSearch = async (e) => {
    setload(true);
    e.preventDefault();
    try {
      const res = await Axios.post('/admin/searchuser', { name: searchval });
      setusers(res.data);
      setsearchval('');
    } catch (err) {
      console.log(err);
    }
    setload(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setload(true);
      try {
        const res = await Axios.get('/admin/userdata');
        setusers(res.data);
      } catch (error) {
        console.log(error, 'usertable err');
      }
      setload(false);
    };

    fetchData();
  }, [deleteModal, editModal]);
  if(!users){
    return(
      <BeatLoader />
    )
  }
  return (
    <>
      <section className=" dark:bg-gray-900 p-3 sm:p-5 antialiased ">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div>
            <p className="text-sm font-bold uppercase my-6 p-2">User List</p>
          </div>
          {/* <!-- Start coding here --> */}
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-1/2 md:text-sm text-xs">
                <form className="flex items-center" onSubmit={handleSearch}>
                  <label className="sr-only"> Search</label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      value={searchval}
                      onChange={(e) => setsearchval(e.target.value)}
                      type="text"
                      id="simple-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search User.."
                      required=""
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs md:text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 tracking-wider">
                  <tr>
                    <th scope="col" className="px-1 py-1 md:px-6 md:py-3">
                      User name
                    </th>
                    <th scope="col" className="px-1 py-1 md:px-6 md:py-3">
                      Phone
                    </th>
                    <th scope="col" className="px-1 py-1 md:px-6 md:py-3">
                      Email
                    </th>
                    <th scope="col" className="px-1 py-1 md:px-6 md:py-3">
                      Address
                    </th>
                    <th scope="col" className="px-1 py-1 md:px-6 md:py-3">
                      Orders
                    </th>
                    <th scope="col" className="px-1 py-1 md:px-6 md:py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users[0]
                    && records.map((user) => (
                      <tr
                        className="border-b dark:border-gray-700 text-xs md:text-sm"
                        key={user._id}
                      >
                        <th
                          scope="row"
                          className="px-1 py-1 md:px-6 md:py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {user.name}
                          {' '}
                        </th>
                        <td className="px-1 py-1 md:px-6 md:py-1">{user.phone}</td>
                        <td className="px-1 py-1 md:px-6 md:py-1">{user.email}</td>
                        <td className="px-1 py-1 md:px-6 md:py-1">{user.address}</td>
                        <td className="px-1 py-1 md:px-6 md:py-1">{user.orders}</td>
                        <td className="px-1 py-1 md:px-6 md:py-1 flex items-center justify-end text-xs md:text-sm">
                          <div className="  flex">
                            <button
                              onClick={() => openEditModal(user)}
                              type="button"
                              data-modal-target="updateProductModal"
                              data-modal-toggle="updateProductModal"
                              className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200"
                            >
                              <svg
                                className="w-4 h-4 mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                />
                              </svg>
                              Edit
                            </button>
                          </div>
                          <div className=" text-sm flex w-28">
                            <button
                              onClick={() => {
                                openDeleteModal(user);
                              }}
                              type="button"
                              className={`flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 ${user.active ? 'text-red-500 dark:hover:text-red-400' : 'text-green-500 dark:hover:text-green-400'} `}
                            >
                              {user.active ? (
                                <svg
                                  className="w-6 h-6 mr-1"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M8.46457 14.1213C8.07404 14.5118 8.07404 15.145 8.46457 15.5355C8.85509 15.926 9.48825 15.926 9.87878 15.5355L15.5356 9.87862C15.9262 9.4881 15.9262 8.85493 15.5356 8.46441C15.1451 8.07388 14.5119 8.07388 14.1214 8.46441L8.46457 14.1213Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6.34315 17.6569C9.46734 20.781 14.5327 20.781 17.6569 17.6569C20.781 14.5327 20.781 9.46734 17.6569 6.34315C14.5327 3.21895 9.46734 3.21895 6.34315 6.34315C3.21895 9.46734 3.21895 14.5327 6.34315 17.6569ZM16.2426 16.2426C13.8995 18.5858 10.1005 18.5858 7.75736 16.2426C5.41421 13.8995 5.41421 10.1005 7.75736 7.75736C10.1005 5.41421 13.8995 5.41421 16.2426 7.75736C18.5858 10.1005 18.5858 13.8995 16.2426 16.2426Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className="w-6 h-6 mr-1"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  aria-hidden="true"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M5.63604 18.364C9.15076 21.8787 14.8492 21.8787 18.364 18.364C21.8787 14.8492 21.8787 9.15076 18.364 5.63604C14.8492 2.12132 9.15076 2.12132 5.63604 5.63604C2.12132 9.15076 2.12132 14.8492 5.63604 18.364ZM7.80749 17.6067C10.5493 19.6623 14.4562 19.4433 16.9497 16.9497C19.4433 14.4562 19.6623 10.5493 17.6067 7.80749L14.8284 10.5858C14.4379 10.9763 13.8047 10.9763 13.4142 10.5858C13.0237 10.1953 13.0237 9.5621 13.4142 9.17157L16.1925 6.39327C13.4507 4.33767 9.54384 4.55666 7.05025 7.05025C4.55666 9.54384 4.33767 13.4507 6.39327 16.1925L9.17157 13.4142C9.5621 13.0237 10.1953 13.0237 10.5858 13.4142C10.9763 13.8047 10.9763 14.4379 10.5858 14.8284L7.80749 17.6067Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              )}

                              {user.active ? 'Block' : 'Unblock'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {load && !users[0] && (
                <div className="flex justify-center h-6">
                  <BeatLoader />
                </div>
              )}
              {!users[0] && !load && (
                <div className="flex justify-center h-9">
                  <p className="h-3 font-medium p-2 text-sm text-gray-500"> No users found.</p>
                </div>
              )}
              <div className="flex mb-4 h-16 justify-center items-end gap-4">
                <Button
                  variant="text"
                  className="flex items-center gap-2"
                  onClick={() => setcurrentpage(currentpage - 1)}
                  disabled={currentpage === 1}
                >
                  <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                  {' '}
                  Previous
                </Button>
                <Typography color="gray" className="font-normal text-xs">
                  Page
                  <strong className="text-gray-900">
                    {' '}
                    {currentpage}
                  </strong>
                  {' '}
                  of
                  {' '}
                  <strong className="text-gray-900">{npage}</strong>
                </Typography>
                <Button
                  variant="text"
                  className="flex items-center gap-2"
                  onClick={() => setcurrentpage(currentpage + 1)}
                  disabled={currentpage === npage}
                >
                  Next
                  <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <DeleteModal modal={deleteModal} closeModal={deleteOnClose} user={updateUser} />
      <UpdateModal
        modal={editModal}
        closeModal={deleteOnClose}
        user={updateUser}
      />
    </>
  );
};

export default UserTable;
