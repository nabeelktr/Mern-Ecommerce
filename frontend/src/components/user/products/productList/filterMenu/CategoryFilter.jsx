import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useState } from "react";

const CategoryFilter = () => {
  const [categoryMenu, setcategoryMenu] = useState(false);
  return (
    <Menu open={categoryMenu} handler={setcategoryMenu} allowHover>
      <MenuHandler>
        <Button
          variant="text"
          className="flex items-center -mb-3 gap-1   md:text-sm text-xs text-gray-700 font-normal capitalize tracking-normal"
        >
          Category{" "}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`md:h-3.5 h-3 md:w-3.5 w-3 transition-transform ${
              categoryMenu ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList>
          <MenuItem>T-Shirt</MenuItem>
          <MenuItem>Pants</MenuItem>
          <MenuItem>Shirt</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default CategoryFilter;
