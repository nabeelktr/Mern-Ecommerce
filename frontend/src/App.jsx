import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom'
import Signup from './pages/user/Signup'
import Login from './pages/user/Login'
import Home from './pages/user/Home'
import AdminLogin from './pages/admin/AdminLogin'
import Dashboard from './pages/admin/Dashboard'




function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>

        {/* Admin Routes */}
        <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='/admin/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
  </>
  )
}

export default App
