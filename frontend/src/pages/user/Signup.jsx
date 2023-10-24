import Navbar from "../../components/user/Navbar"
import SignupForm from "../../components/user/SignupForm"


import React from 'react'


const Signup = () => {
  return (
    <>
    <div className="flex flex-col min-h-screen justify-between" style={{background:'linear-gradient(to bottom right, #FEEDF6, #FFE1BE)'}}>
    <Navbar />
    <div className="flex items-center justify-center h-full">
      <SignupForm />
    </div>
  </div>
  </>
  )
}

export default Signup