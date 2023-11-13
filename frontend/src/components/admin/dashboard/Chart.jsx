import { BanknotesIcon } from "@heroicons/react/24/outline";
import {  LineChart } from "@mui/x-charts";
import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const Chart = () => {
    const [sizeMenu, setsizeMenu] = useState(false);
  return (
    <>
      <div className="max-w-lg w-full bg-white rounded-sm shadow dark:bg-gray-800 p-4 md:p-6">
        <div className="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center me-3">
              <BanknotesIcon className="p-2"/>
            </div>
            <div>
              <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1">
                3.4k
              </h5>
              <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Generated Income
              </p>
            </div>
          </div>
          {/* <div>
            <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900
             dark:text-green-300">
              
              42.5%
            </span>
          </div> */}
        </div>
        <LineChart
          xAxis={[
            { scaleType: "band", data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] },
          ]}
          series={[
            { data: [4, 3, 5, 3, 5, 9, 2, 3, 0, 8, 4, 9] },

          ]}
          width={500}
          height={300}
        />

        <div id="column-chart"></div>
        <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
          <div className="flex justify-between items-center pt-5">
           
          <Menu open={sizeMenu} handler={setsizeMenu} allowHover >
      <MenuHandler>
        <Button
          variant="text"
          className="flex items-center -mb-3 gap-1 text-sm text-gray-700 font-normal capitalize tracking-normal"
        >
          Year{" "}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3.5 w-3.5 transition-transform ${
              sizeMenu ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList >

        <MenuItem>2023</MenuItem>
        <MenuItem>2024</MenuItem>
        <MenuItem>2025</MenuItem>
      
      </MenuList>
      </Menu>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chart;
