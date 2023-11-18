

import {
    Card,
    List,
    ListItem,
    ListItemPrefix,
  } from "@material-tailwind/react";
  import {
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    PowerIcon,
    GiftIcon,
    WalletIcon,
  } from "@heroicons/react/24/solid";
import { IdentificationIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
   
  export function SidebarProfile() {
    const navigate = useNavigate()
    return (
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-none">
      
        <List>
        <ListItem onClick={() => navigate('/profile')}>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Account
          </ListItem>
          <ListItem onClick={() => navigate('/profile/viewAddress')}>
            <ListItemPrefix>
              <IdentificationIcon className="h-5 w-5" />
            </ListItemPrefix>
            Addresses
          </ListItem>
          <ListItem onClick={() => navigate('/profile/viewOrders')}>
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            Orders
          </ListItem>
          <ListItem onClick={() => navigate('/profile/coupons')}>
            <ListItemPrefix>
              <GiftIcon className="h-5 w-5" />
            </ListItemPrefix>
            Coupons
          </ListItem>
          <ListItem onClick={() => navigate('/profile/wallet')}>
            <ListItemPrefix>
              <WalletIcon className="h-5 w-5" />
            </ListItemPrefix>
            Wallet
          </ListItem>
          <ListItem onClick={() => navigate('/profile/changePassword')}>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Password
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
    );
  }