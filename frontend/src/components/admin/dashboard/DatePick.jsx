import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const DatePick = () => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };
  return (
    <Datepicker
      value={value}
      onChange={handleValueChange}
      showShortcuts={true}
      showFooter={true}
      inputClassName={'border rounded-sm text-xs  w-full p-3'}
    />
  );
};

export default DatePick;
