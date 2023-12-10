import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate()
  return (
    <div className="w-screen h-screen items-center flex flex-col justify-center font-poppins">
      <div className="absolute md:text-[15rem] text-[8rem]  mb-28" style={{ fontWeight: 5,  WebkitTextStroke: "0.5rem white"  }}>OOPS!</div>
      <div className="relative uppercase md:text-3xl text-xl bg-white font-thin p-2 px-4 mt-24">404- the page can't be found</div>

      <div className="mt-10 bg-[#ff3c67] text-white px-4 py-2 rounded-sm cursor-pointer z-10 hover:text-black hover:bg-yellow-300" onClick={()=> navigate('/home')}>GO TO HOMEPAGE</div>

    </div>
  );
};

export default ErrorPage;
