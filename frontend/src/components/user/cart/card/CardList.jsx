import React, { useEffect } from 'react'
import ItemCard from './ItemCard'

const CardList = ({items, setRefreshKey, refreshKey, updateCart }) => {


  
  return (
    <div className='md:w-3/5  mt-2 flex items-start '>
                <div className=' w-full text-white md:p-4 p-1 flex flex-col items-center'>
                    {
                    items.items.map((item,i) => (
                        <ItemCard item={item} key={[item.productId,i]} cartId={items._id} setRefreshKey={setRefreshKey} refreshKey={refreshKey} updateCart={updateCart} />
                        ))
                        
                    }
                </div>
            </div>
  )
}

export default CardList