import { useNavigate } from 'react-router-dom'
import Axios from '../../../axiosInterceptors/userAxios'
import React, { useEffect, useState } from 'react'
import Card from './card/ItemCard';
import CartPrice from './price/CartPrice';
import CardList from './card/CardList';

const Cart = () => {
    const navigate = useNavigate();
    const [cardKey, setcardKey] = useState(0)
    const [items, setitems] = useState();
    const [refreshKey, setRefreshKey] = useState(0)

    const fetchdata = async() => {
        try{
            const res = await Axios.get('/getCartItems');
            setitems(res.data)
        }catch(err){
            if(err.response.status === 401){
                navigate('/login');
            }
        }
    }
    
    const updateCart = () => {
        fetchdata();
        setcardKey(cardKey + 1);
        setRefreshKey(refreshKey + 1);
    }
    useEffect(() => {
        fetchdata();
    },[])
    if(!items || (items && items.items.length === 0)){
        return (
            <div className='flex pt-12'>
        <div className='flex justify-end w-7/12  h-screen'>
            <div className='w-3/4  p-4 flex items-center'>
                <div className='h-20 w-full text-black p-4 flex items-center justify-end'>
                    <span className='text-2xl font-extrabold'>Cart Empty..</span>
                </div>
            </div>
        </div>
        
    </div>
        )
    }

  return (
    <>
    <div>
      <p className="text-sm font-bold uppercase pt-28 pl-52 p-2">Your Cart </p>
    </div>
    <div className='flex '>
        <div className='flex justify-end w-7/12  border-r min-h-screen'>
            <CardList items={items}  setRefreshKey={setRefreshKey} refreshKey={refreshKey} updateCart={updateCart} key={cardKey}/>
        </div>
        <div className='w-5/12 h-full'> 
          <CartPrice key={refreshKey} cartId={items._id} /> 
        </div>
    </div>
    </>
  )
}

export default Cart