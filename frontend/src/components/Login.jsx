import React from 'react'

const Login = () => {
  return (
 
    <div className="flex flex-col bg-white  px-4 sm:px-6 md:px-8 lg:px-10 py-8  w-full max-w-md font-serif">
      <div className="font-medium  text-xl sm:text-2xl  text-gray-800">
        Login
      </div>
      
      
      <div className="mt-10">
        <form action="#">
          <div className="flex flex-col mb-6">
            <label
              htmlFor="email"
              className="mb-1 text-xs sm:text-sm tracking-wide text-gray-400"
            >
              E-Mail Address:
            </label>
            <div className="relative">
              
              <input
                id="email"
                type="email"
                name="email"
                className="text-sm sm:text-base placeholder-gray-400 pl-4 pr-4  border border-gray-400 w-full py-2 focus:outline-none focus:border-black"
                placeholder="Email Address"
              />
            </div>
          </div>
          <div className="flex flex-col mb-6">
            <label
              htmlFor="password"
              className="mb-1 text-xs sm:text-sm tracking-wide text-gray-400"
            >
              Password:
            </label>
            <div className="relative">
              
              <input
                id="password"
                type="password"
                name="password"
                className="text-sm sm:text-base placeholder-gray-400 pl-4 pr-4 border border-gray-400 w-full py-2 focus:outline-none focus:border-black"
                placeholder="Password"
              />
            </div>
          </div>
          <p className='mb-8 mt-10 text-xs flex justify-center text-gray-500'>By continuing, I agree the<span style={{color:'#ff3c67'}}>&nbsp;Terms of use&nbsp;</span> & <span style={{color:'#ff3c67'}}>&nbsp;Privacy Policy&nbsp;</span> </p>
          <div className="flex w-full mt-10">
            <button
              type="submit"
              className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700  py-2 w-full transition duration-150 ease-in"
              style={{background:'#ff3c67'}}
            >
              <span className="mr-2 uppercase font-medium">Continue</span>
              
            </button>
          </div>
          <div className="flex items-center mb-40 mt-10">
            <div className="flex ">
              <a
                href="#"
                className="inline-flex text-xs sm:text-sm text-gray-500 hover:text-blue-700"
              >
               <p className='text-xs'>Forgot Your Password?</p> 
              </a>
            </div>
            <div className="ml-auto ">
        <a
          href="#"
          target="_blank"
          className="inline-flex  text-blue-500 hover:text-blue-700 text-xs text-center"
        >
          
          <span className="ml-2">Sign up</span>
        </a>
      </div>

          </div>
        </form>
      </div>
      
    </div>

  )
}

export default Login