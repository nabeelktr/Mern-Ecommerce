
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Category = ({ category }) => {
  const [imageLoad, setImageLoad] = useState(false);
  const navigate= useNavigate();
  return (
    <>
      <a className=" md:mt-4 relative hover:shadow-sm font-poppins md:h-[280px] md:w-[210px] overflow-hidden"
      onClick={() => navigate('/products', {state: {category: category.name}})}
      >
        {!imageLoad && (
          <div className={"md:h-[280px] h-[150px] bg-gray-200 animate-pulse mb-2 "}></div>
        )}

        <img
          className={` cursor-pointer transition-transform transform hover:scale-110  ${
            !imageLoad ? "hidden" : ""
          }`}
          src={category.image.url}
         // width="210px"
         // height='280px'
          onLoad={() => setImageLoad(true)}
        />

        <span className="w-full bg-gradient-to-b from-transparent to-black absolute bottom-0 ">
          <div className="p-2">
            <span className="  py-[0.4rem] md:text-xs text-[0.6rem] uppercase items-center flex justify-center gap-2 font-semibold text-white tracking-widest">
              {category.name}
            </span>
          </div>
        </span>
      </a>
    </>
  );
};

export default Category;
