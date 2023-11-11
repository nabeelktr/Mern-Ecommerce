import React from 'react'
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


const Profile = () => {
  return (
    <>
    <Navbar />

    <div className='min-h-screen px-10 '>
        <div className='border-b h-36 relative'>
            <Typography className='uppercase absolute sm:pl-10 sm:text-sm  bottom-0 text-xs font-bold p-4 pl-2'>Profile</Typography>
        </div>
        <div className='flex flex-row l h-screen'>
            <div className='w-3/12 border-r '>
            <SidebarProfile />
            </div>
            <div className='w-8/12'>
                <Routes>
                    <Route path='/' element={<ViewProfile />} />
                    <Route path='/editProfile' element={<EditProfile />} />
                    <Route path='/viewAddress' element={<Addresses />} />
                    <Route path='/addAddress' element={<AddAddressProfile />} />
                    <Route path='/viewOrders' element={<OrderList />} />
                    <Route path='/changePassword' element={<ResetPassword />} />
                </Routes>
            </div>
        </div>
    </div>
   
    </>
  )
}

export default Profile