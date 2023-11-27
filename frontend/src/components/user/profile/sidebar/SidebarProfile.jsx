

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
    ChatBubbleLeftRightIcon,
  } from "@heroicons/react/24/solid";
import { IdentificationIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
   
  export function SidebarProfile() {
    const navigate = useNavigate()
    return (
      <Card className="h-[calc(100vh-2rem)] max-w-[20rem] md:p-4 shadow-none">
      
        <List>
        <ListItem onClick={() => navigate('/profile')} className="font-poppins p-0 md:p-3 w-[5rem] md:w-[15rem] text-[0.6rem] md:text-sm">
            <ListItemPrefix>
              <UserCircleIcon className="md:h-5 h-3 md:w-5 w-3" />
            </ListItemPrefix>
            Account
          </ListItem>
          <ListItem onClick={() => navigate('/profile/viewAddress')} className="font-poppins w-[5rem] md:w-[15rem] p-0 md:p-3 text-[0.6rem] md:text-sm">
            <ListItemPrefix>
              <IdentificationIcon className="md:h-5 h-3 md:w-5 w-3" />
            </ListItemPrefix>
            Addresses
          </ListItem>
          <ListItem onClick={() => navigate('/profile/viewOrders')} className="font-poppins w-[5rem] md:w-[15rem] p-0 md:p-3 text-[0.6rem] md:text-sm">
            <ListItemPrefix>
              <ShoppingBagIcon className="md:h-5 h-3 md:w-5 w-3" />
            </ListItemPrefix>
            Orders
          </ListItem>
          <ListItem onClick={() => navigate('/profile/coupons')} className="font-poppins w-[5rem] md:w-[15rem] p-0 md:p-3 text-[0.6rem] md:text-sm">
            <ListItemPrefix>
              <GiftIcon className="md:h-5 h-3 md:w-5 w-3" />
            </ListItemPrefix>
            Coupons
          </ListItem>
          <ListItem onClick={() => navigate('/profile/wallet')} className="font-poppins w-[5rem] md:w-[15rem] p-0 md:p-3 text-[0.6rem] md:text-sm">
            <ListItemPrefix>
              <WalletIcon className="md:h-5 h-3 md:w-5 w-3" />
            </ListItemPrefix>
            Wallet
          </ListItem>
          <ListItem onClick={() => navigate('/userchat')} className="font-poppins w-[5rem] md:w-[15rem] p-0 md:p-3 text-[0.6rem] md:text-sm">
            <ListItemPrefix>
              <ChatBubbleLeftRightIcon className="md:h-5 h-3 md:w-5 w-3" />
            </ListItemPrefix>
            Chat
          </ListItem>
          <ListItem onClick={() => navigate('/profile/changePassword')} className="font-poppins w-[5rem] md:w-[15rem] p-0 md:p-3 text-[0.6rem] md:text-sm">
            <ListItemPrefix>
              <Cog6ToothIcon className="md:h-5 h-3 md:w-5 w-3" />
            </ListItemPrefix>
            Password
          </ListItem>
          <ListItem className="font-poppins w-[5rem] md:w-[15rem] p-0 md:p-3 text-[0.6rem] md:text-sm">
            <ListItemPrefix>
              <PowerIcon className="md:h-5 h-3 md:w-5 w-3" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
    );
  }