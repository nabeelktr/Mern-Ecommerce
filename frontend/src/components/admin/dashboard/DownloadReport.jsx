import React from 'react'
import DatePick from './DatePick'

const DownloadReport = () => {
  return (
    <div className="relative bg-white flex-col flex border  shadow-sm antialiased h-32 p-4  w-[32.5rem] rounded-sm">
          <span className="font-bold text-sm uppercase mb-7">
            Download Sales Report
          </span>

          <DatePick />
        </div>
  )
}

export default DownloadReport