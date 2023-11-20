import {useReactTable, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel} from '@tanstack/react-table'
import { Button, Typography } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon, ChevronUpIcon, ChevronDownIcon, } from '@heroicons/react/24/outline';
import { useState } from 'react';


const Transactions = ({transactions}) => {
    const [sorting, setsorting] = useState([]); 
    const data = transactions;


    /** @type import('@tanstack/react-table').columndef<any> */
    const columns = [
    {
      header: 'Date',
      accessorKey: 'date',
      cell: (info) => {
        const date = new Date(info.getValue());
        return date.toLocaleDateString()
      }
    },
    {
        header: 'Status',
        accessorKey: 'status',
        cell: (info) => {
            return <p className={`${info.getValue() === 'Credited' ? 'text-green-600' : 'text-red-800'}`}>{info.getValue()}</p>
        }
    },
    {
        header: 'Amount',
        accessorKey: 'amount',
    }
  ]

const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
        sorting: sorting,
    },
    onSortingChange: setsorting,
});

  return (
    <div className="overflow-x-auto font-poppins">
            
    <table className="min-w-full divide-y text-left text-gray-500 dark:text-gray-400">
      <thead className=" text-xs md:text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 tracking-wider">
        {table.getHeaderGroups().map(headergroup => (
          <tr key={headergroup.id}>
             {headergroup.headers.map(header => <th scope="col" className="font-semibold px-1 py-1 md:px-6 md:py-3 cursor-pointer" key={header.id} onClick={header.column.getToggleSortingHandler()}>
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
                <td className="px-1 py-1 md:px-6 md:py-3 text-xs" key={cell.id}>
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
    <div className="flex mb-4 h-16 justify-center items-end gap-4 ">
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
          <Typography color="gray" className="font-normal text-xs mb-3">
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
  )
}

export default Transactions