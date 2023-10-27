
import { useEffect, useState } from 'react';
import BasicTable from '../../../basic/BasicTable';
import Axios from '../../../../axiosInterceptors/axios';
import { useNavigate } from 'react-router-dom';
const ProductTable = () => {
  const [products, setproducts] = useState();
  const navigate = useNavigate()
//console.log(info.row.original)
  /** @type import('@tanstack/react-table').columndef<any> */
  const columns = [
      {
        header: 'Image',
        accessorKey: 'images',
        cell: (info) => (
          <img onClick={()=> navigate('/admin/products/edit', {state: info.row.original._id})} width="50px" height="75px" src={info.getValue()[0]} />
        )
      },
      {
        header: 'Product Name',
        accessorKey: 'name'
      },
      {
          header: 'Price',
          accessorKey: 'price'
      },
      {
          header: 'Offer Price',
          accessorKey: 'offerPrice'
      },
      {
          header: 'Category',
          accessorKey: 'category'
      },
      {
          header: 'Color',
          accessorKey: 'color'
      },
      {
          header: 'Size',
          accessorKey: 'size'
      },
      {
          header: 'Qty',
          accessorKey: 'qty'
      },
      {
          header: 'Gender',
          accessorKey: 'gender'
      },
  ]
  useEffect(()=>{
    const fetchData = async() => {
        try {
            const response = await Axios.get('/admin/products');
            setproducts(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }
    fetchData();
  },[])

  return (
    <BasicTable datas={products} columns={columns} type={"products"}/>
  );
};

export default ProductTable;
