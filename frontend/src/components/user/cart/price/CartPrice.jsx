import React, { useEffect, useState } from 'react'
import Axios from '../../../../axiosInterceptors/userAxios'

const CartPrice = () => {
    const [items, setitems] = useState()
    const fetchdata = async() => {
        const res = await Axios.get('getCartItems')
        setitems(res.data);
    }
    useEffect(() => {
        fetchdata();
    },[])
    if(!items){
        return <div>Loading</div>
    }
  return (
    <div>
        {
            items.items.map((item,i) => (
                <div key={i}>
                    <p>{item.qty}</p>
                </div>
            ))
        }
    </div>
  )
}

export default CartPrice