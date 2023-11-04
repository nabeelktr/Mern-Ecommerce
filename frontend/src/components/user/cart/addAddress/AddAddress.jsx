import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CartPrice from '../price/CartPrice';
import AddressForm from './addressForm/AddressForm'
import AddressList from './listAddress/AddressList';

const AddAddress = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [cartId, setcartId] = useState();
    const [addressChosen, setAddressChosen] = useState()
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        if(!location.state){
            navigate('/cart');
        }else{
            setcartId(location.state.cartId);
        }
    },[])

  return (
    <div className='flex pt-24'>
    <div className='flex p-2 w-8/12  border-r min-h-screen justify-between'>
        <div className=' m-2  w-1/2 border-r h-full '><AddressList setAddressChosen={setAddressChosen} key={refreshKey} /></div>
        <div className=' m-2 w-1/2 '><AddressForm setRefreshKey={setRefreshKey} refreshKey={refreshKey} />  </div>
    </div>
    <div className='w-4/12 h-full'> { cartId && <CartPrice  cartId={cartId} addressChosen={addressChosen} /> }</div>
</div>
  )
}

export default AddAddress