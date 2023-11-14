import { EyeIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const DatePick = ({setreport}) => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <div className="flex items-center ">
      <Datepicker
        value={value}
        onChange={handleValueChange}
        showShortcuts={true}
        inputClassName={"border rounded-sm text-xs  w-full p-3"}
      />

       {
        value.endDate != null ?
        <Button
        onClick={() => setreport(value)}
          variant="gradient"
          type="#"
          className="flex items-center gap-1 h-9  ml-3 bg-gray-300 hover:bg-gray-400 text-gray-200 font-bold py-0 px-3 rounded-sm  "
        >
          <EyeIcon className="h-4 w-4"/>
          View
        </Button>
        : '' 
        }

    </div>
  );
};

export default DatePick;
