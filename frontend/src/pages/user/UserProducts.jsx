import ProductList from '../../components/user/products/productList/ProductList';
import Navbar from '../../components/user/Navbar'
import { Route, Routes } from 'react-router-dom';
import ViewProduct from '../../components/user/products/viewProduct/ViewProduct';

const UserProducts = () => {
  return (
    <>
    <Navbar />
    <Routes>
        <Route path='/' element={<ProductList />} />
        <Route path='/view/:id' element={<ViewProduct />} />
    </Routes>
    </>
  )
}

export default UserProducts