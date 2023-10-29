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
import Categoty from './pages/admin/Category';
import UserProducts from './pages/user/UserProducts';

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
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<UserProducts />} />
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        {/* private */}
        <Route path="/admin/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/admin/users" element={<PrivateRoute element={<UserList />} />} />
        <Route path="/admin/products/*" element={<PrivateRoute element={<Products />} />} />
        <Route path="/admin/category/*" element={<PrivateRoute element={<Categoty />} />} />
      </Routes>
    </Router>
  );
}

export default App;
