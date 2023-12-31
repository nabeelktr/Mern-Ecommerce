/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/* eslint-disable indent */
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Signup from './pages/user/Signup';
import Login from './pages/user/Login';
import Home from './pages/user/Home';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import UserList from './pages/admin/UserList';
import Products from './pages/admin/Products';
import Category from './pages/admin/Category';
import UserProducts from './pages/user/UserProducts';
import CartPage from './pages/user/CartPage';
import Order from './pages/admin/Order';
import Profile from './pages/user/Profile';
import Coupon from './pages/admin/Coupon';
import Wishlist from './pages/user/Wishlist';
import Chat from './pages/admin/Chat';
import UserChat from './pages/user/UserChat';
import ErrorPage from './components/basic/ErrorPage';



// eslint-disable-next-line react/function-component-definition
const PrivateRoute = ({ element }) => {
const token = localStorage.getItem('adminToken');
const currentTime = Date.now() / 1000;

if (!token) {
  return <Navigate to="/admin" />;
} if (jwtDecode(token).exp < currentTime) {
  localStorage.removeItem('adminToken');
    return <Navigate to="/admin" />;
  }
  return element;
};

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path='*' element={<ErrorPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/*" element={<UserProducts />} />
        <Route path="/cart/*" element={<CartPage />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/userchat" element={<UserChat />} />
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        {/* private */}
        <Route path="/admin/dashboard/*" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/admin/users" element={<PrivateRoute element={<UserList />} />} />
        <Route path="/admin/products/*" element={<PrivateRoute element={<Products />} />} />
        <Route path="/admin/orders/*" element={<PrivateRoute element={<Order />} />} />
        <Route path="/admin/category/*" element={<PrivateRoute element={<Category />} />} />
        <Route path="/admin/coupons/*" element={<PrivateRoute element={<Coupon />} />} />
        <Route path="/admin/chat"  element={<Chat />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
