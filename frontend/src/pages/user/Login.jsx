import React from 'react'
import Navbar from '../../components/user/Navbar'
import LoginForm from '../../components/LoginForm'

const Login = () => {
  return (
    <>
    <div className="flex flex-col min-h-screen justify-between" style={{background:'linear-gradient(to bottom right, #FEEDF6, #FFE1BE)'}}>
    <Navbar />
    <div className="flex items-center justify-center h-full">
      <LoginForm value={'Login'} />
    </div>
  </div>
  </>
  )
}

export default Login