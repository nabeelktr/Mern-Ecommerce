import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { useState } from "react";


const SortByMenu = ({updateProducts,products}) => {
    
    const [sortMenu, setsortMenu] = useState(false);

    const descending = () => {
        const sorted = products.sort((a,b) => b.offerPrice - a.offerPrice);
        updateProducts(sorted)
    }
    const ascending = () => {
        const sorted = products.sort((a,b) => a.offerPrice - b.offerPrice);
        updateProducts(sorted)
    }
    const recommended = () => {
        const sorted = products.sort((a,b) => b.qty - a.qty);
        updateProducts(sorted)
    }
  return (
    <Menu open={sortMenu} handler={setsortMenu} allowHover >
      <MenuHandler>
        <Button
          variant="text"
          className="flex items-center -mb-3 gap-1 text-sm text-gray-700 font-normal capitalize tracking-normal"
        >
          Sort&nbsp;By{" "}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3.5 w-3.5 transition-transform ${
              sortMenu ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList>
        <MenuItem onClick={recommended}>Recommended</MenuItem>
        <MenuItem onClick={descending}>Price: High to Low</MenuItem>
        <MenuItem onClick={ascending}>Price: Low to High</MenuItem>

      
      </MenuList>
      </Menu>
  )
}

export default SortByMenu