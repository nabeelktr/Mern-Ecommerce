import React from 'react'
import AdminNav from '../../components/admin/AdminNav'
import LoginForm from '../../components/LoginForm'

const AdminLogin = () => {
  return (
    <>
    <div className="flex flex-col min-h-screen justify-between" style={{background:'linear-gradient(to bottom right, #FEEDF6, #FFE1BE)'}}>
    <AdminNav />
    <div className="flex items-center justify-center h-full">
      <LoginForm value={'Admin Login'}/>
    </div>
  </div>
  </>
  )
}

export default AdminLogin