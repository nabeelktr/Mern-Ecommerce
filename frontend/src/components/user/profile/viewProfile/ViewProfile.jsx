import { useEffect, useState } from "react"
import Axios from '../../../../axiosInterceptors/userAxios'
import { Typography } from "@material-tailwind/react"
import { useNavigate } from "react-router-dom";


const ViewProfile = () => {
  const [user, setuser] = useState();
  const navigate = useNavigate();

  const fetchdata = async() => {
    const response = await Axios.get('/getUser')
    setuser(response.data)
  }
  useEffect(() => {
    fetchdata();
  },[])
  return (
    <div className="p-4 m-4 border  justify-center shadow-sm font-poppins tracking-wide w-full">
      <div className="border-b p-4 md:mx-40 md:px-8 font-semibold tracking-widest md:text-sm text-[0.7rem]" >
        <p>Profile Details</p>
      </div>
    <div className='p-4 md:mx-44 md:px-10 flex flex-row justify-start md:gap-44 gap-8 mt-4'>
        <div className="">
              <p className=" md:text-sm text-[0.5rem] md:mb-8 mb-2">FullName</p>
              <p className="md:text-sm text-[0.5rem] md:mb-8 mb-2">Email</p>
              <p className="md:text-sm text-[0.5rem] md:mb-8 mb-2">Mobile&nbsp;Number</p>
              <p className="md:text-sm text-[0.5rem] md:mb-8 mb-2">Gender</p>
              <p className="md:text-sm text-[0.5rem] md:mb-8 mb-2">Location</p>
        </div>
        <div className="">
              <p className=" md:text-sm text-[0.5rem] md:mb-8 mb-2">{user?.name}</p>
              <p className=" md:text-sm text-[0.5rem] md:mb-8 mb-2 truncate w-[7rem] md:w-[100%]">{user?.email}</p>
              <p className=" md:text-sm text-[0.5rem] md:mb-8 mb-2">{user?.phone}</p>
              <p className=" md:text-sm text-[0.5rem] md:mb-8 mb-2">{user?.gender ? user.gender : '-not added-'}</p>
              <p className=" md:text-sm text-[0.5rem] md:mb-8 mb-2">{user?.location ? user.location : '-not added-'}</p>
        </div>
    </div>
    <div className="md:mx-44 text-[0.7rem] md:text-sm ">

        <button
          onClick={() => navigate('/profile/editProfile')}
          className="flex rounded-sm items-center justify-center focus:outline-none md:mt-10 md:mb-6
             md:py-2 w-full transition duration-150 ease-in bg-[#ff3c67] "            
        >
          <span className=" mr-2 uppercase p-1 font-semibold text-gray-100 tracking-wider">Edit Profile </span>
         </button>
    </div>
    </div>
  )
}

export default ViewProfile