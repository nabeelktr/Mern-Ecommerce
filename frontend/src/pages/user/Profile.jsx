import React, { useState } from 'react'
import Navbar from '../../components/user/Navbar'
import { Route, Routes } from 'react-router-dom'
import ViewProfile from '../../components/user/profile/viewProfile/ViewProfile'
import { Typography } from '@material-tailwind/react'
import { SidebarProfile } from '../../components/user/profile/sidebar/SidebarProfile'
import EditProfile from '../../components/user/profile/editProfile/EditProfile'
import ResetPassword from '../../components/user/profile/passwordReset/ResetPassword'
import AddAddressProfile from '../../components/user/profile/address/addAddress/AddAddressProfile'
import OrderList from '../../components/user/profile/orders/orderList/OrderList'
import Addresses from '../../components/user/profile/address/ViewAddress/Addresses'
import EditAddress from '../../components/user/profile/address/edit/EditAddress'
import OrderDetails from '../../components/user/profile/orders/orderdetails/OrderDetails'
import ListCoupons from '../../components/user/profile/coupon/ListCoupons'
import Wallet from '../../components/user/profile/wallet/Wallet'


const Profile = () => {
    const [refreshKey, setRefreshKey] = useState(0)
  return (
    <>
    <Navbar />

    <div className='min-h-screen md:px-10 '>
        <div className='border-b h-36 relative'>
            <Typography className='uppercase absolute sm:pl-10 md:text-sm text-xs bottom-0  font-semibold p-4 pl-2 font-poppins tracking-wider'>Profile</Typography>
        </div>
        <div className='flex flex-row l h-screen'>
            <div className='w-3/12 border-r '>
            <SidebarProfile />
            </div>
            <div className='w-8/12'>
                <Routes>
                    <Route path='/' element={<ViewProfile />} />
                    <Route path='/editProfile' element={<EditProfile />} />
                    <Route path='/viewAddress' element={<Addresses refreshKey={refreshKey} setRefreshKey={setRefreshKey} key={refreshKey}/>} />
                    <Route path='/editAddress' element={<EditAddress />} />
                    <Route path='/viewOrders' element={<OrderList />} />
                    <Route path='/viewOrder' element={<OrderDetails />} />
                    <Route path='/wallet' element={<Wallet />} />
                    <Route path='/coupons' element={<ListCoupons />} />
                    <Route path='/changePassword' element={<ResetPassword />} />
                </Routes>
            </div>
        </div>
    </div>
   
    </>
  )
}

export default Profile