import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useState } from "react";

const SizeFilter = ({ setproducts }) => {
  const [sizeMenu, setsizeMenu] = useState(false);
  return (
    <Menu open={sizeMenu} handler={setsizeMenu} allowHover>
      <MenuHandler>
        <Button
          variant="text"
          className="flex items-center -mb-3 gap-1 text-sm text-gray-700 font-normal capitalize tracking-normal"
        >
          Size{" "}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3.5 w-3.5 transition-transform ${
              sizeMenu ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList>
        <MenuItem>32</MenuItem>
        <MenuItem>34</MenuItem>
        <MenuItem>36</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SizeFilter;
