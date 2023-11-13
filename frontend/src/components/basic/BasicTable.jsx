import {useReactTable, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel} from '@tanstack/react-table'
import { useMemo, useState } from 'react';
import { Button, Typography } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon, ChevronUpIcon, ChevronDownIcon, } from '@heroicons/react/24/outline';

import { useNavigate } from 'react-router';
import { Skeleton } from '@mui/material';

const BasicTable = ({datas, columns, type}) => {
    const [sorting, setsorting] = useState([]) 
    const [filter, setfilter] = useState('');
    const data = useMemo(() => datas, [datas])
    const navigate = useNavigate()
    
      
      const table = useReactTable({
          data,
          columns,
          getCoreRowModel: getCoreRowModel(),
          getPaginationRowModel: getPaginationRowModel(),
          getSortedRowModel: getSortedRowModel(),
          getFilteredRowModel: getFilteredRowModel(),
          state: {
              sorting: sorting,
              globalFilter: filter,
          },
          onSortingChange: setsorting,
          onGlobalFilterChange: setfilter,
      });
  
   
    if (!datas) {
      
      return (
        <section className=" dark:bg-gray-900 p-3 sm:p-5 antialiased ">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
          <div>
            <p className="text-sm font-bold uppercase my-6 p-2">{type} List</p>
          </div>
          {/* <!-- Start coding here --> */}
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-1/2 md:text-sm text-xs">
                {/* <form className="flex items-center" onSubmit={handleSearch}> */}
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
                      value={filter}
                      onChange={(e) => setfilter(e.target.value)}
                      type="text"
                      id="simple-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search User.."
                    />
                  </div>
                {/* </form> */}
              </div>
            </div>
            <div className="overflow-x-auto">
            
            <table className="min-w-full divide-y text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs md:text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 tracking-wider">
              {Array(7).fill(null).map((_, rowIndex) => (
      <tr key={rowIndex}>
        {table.getHeaderGroups().map((headerGroup) => (
          headerGroup.headers.map((column, ci) => (
            <td key={column.id} className= {`md:px-5  ${rowIndex === 0  ? 'bg-slate-100 py-4 ' : 'px-1 py-1 md:py-0'}`}>
              {
              rowIndex === 0 ?
                <Skeleton  height={22} className='p-4'/>
              : 
                <Skeleton  height={ci === 0 ? '120px' : 20}  width={ci === 0 ? '50px' : ''}  />
              }
            </td>
          ))
        ))}
      </tr>
    ))}
        </thead>
        </table>
        </div>
        </div>
        </div>
        </section>
        )
      
    }

    return (
      <section className=" dark:bg-gray-900 p-3 sm:p-5 antialiased ">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
          <div>
            <p className="text-sm font-bold uppercase my-6 p-2">{type} List</p>
          </div>
          {/* <!-- Start coding here --> */}
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-1/2 md:text-sm text-xs">
                {/* <form className="flex items-center" onSubmit={handleSearch}> */}
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
                      value={filter}
                      onChange={(e) => setfilter(e.target.value)}
                      type="text"
                      id="simple-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder={`Search ${type}..`}
                    />
                  </div>
                {/* </form> */}
              </div>
              <div className="w-1/2 md:text-sm text-xs flex justify-end p-2">
                {type === 'products' &&
                  <button
                onClick={() => navigate('/admin/products/add')}
                className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center'
                >Add Product</button>
                }

                {type === 'category' &&
                  <button
                onClick={() => navigate('/admin/category/add')}
                className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center'
                >Add Category</button>
                }
              </div>
            </div>
            <div className="overflow-x-auto">
            
            <table className="min-w-full divide-y text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs md:text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 tracking-wider">
                {table.getHeaderGroups().map(headergroup => (
                  <tr key={headergroup.id}>
                     {headergroup.headers.map(header => <th scope="col" className=" px-1 py-1 md:px-6 md:py-3 cursor-pointer" key={header.id} onClick={header.column.getToggleSortingHandler()}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {
                          {asc: <ChevronUpIcon className=" w-5 h-5 " />, desc: <ChevronDownIcon className=" w-5 h-5 " />} [header.column.getIsSorted() ?? null]
                        }
                     </th>
                     )}
                  </tr>
                ))}
              </thead>
              <tbody>
                  {table.getRowModel().rows.map(row => (
                    <tr className="border-b dark:border-gray-700 text-xs md:text-sm" key={row.id}>
                      {row.getVisibleCells().map(cell => (
                        <td className="px-1 py-1 md:px-6 md:py-3" key={cell.id}>
                          {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table> 
            <div className="flex mb-4 h-16 justify-center items-end gap-4">
                  <Button
                    variant="text"
                    className="flex items-center gap-2"
                    onClick={() => 
                      table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                    {' '}
                    Previous
                  </Button>
                  <Typography color="gray" className="font-normal text-xs">
                    Page
                    <strong className="text-gray-900">
                      {' '}
                      {table.getState().pagination.pageIndex+1}
                    </strong>
                    {' '}
                    of
                    {' '}
                    <strong className="text-gray-900">{table.getPageCount()}</strong>
                  </Typography>
                  <Button
                    variant="text"
                    className="flex items-center gap-2"
                    onClick={() => 
                      table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    Next
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                  </Button>
                </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

export default BasicTable