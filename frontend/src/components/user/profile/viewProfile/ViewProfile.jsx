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
    <div className="p-4 m-4 border  justify-center shadow-sm">
      <div className="border-b p-4 mx-40 px-8 font-bold" >
        <p>Profile Details</p>
      </div>
    <div className='p-4  mx-44 px-10 flex flex-row justify-start gap-44 mt-4'>
        <div className="">
              <p className=" text-sm mb-8">FullName</p>
              <p className=" text-sm mb-8">Email</p>
              <p className=" text-sm mb-8">Mobile&nbsp;Number</p>
              <p className=" text-sm mb-8">Gender</p>
              <p className=" text-sm mb-8">Location</p>
        </div>
        <div className="">
              <p className=" text-sm mb-8">{user?.name}</p>
              <p className=" text-sm mb-8">{user?.email}</p>
              <p className=" text-sm mb-8">{user?.phone}</p>
              <p className=" text-sm mb-8">{user?.gender ? user.gender : '-not added-'}</p>
              <p className=" text-sm mb-8">{user?.location ? user.location : '-not added-'}</p>
        </div>
    </div>
    <div className="mx-44 ">

        <button
          onClick={() => navigate('/profile/editProfile')}
          className="flex rounded-sm items-center justify-center focus:outline-none mt-10 mb-6   
            sm:text-base bg-blue-600 hover:bg-blue-700  py-2 w-full transition duration-150 ease-in"            
          style={{ background: "#ff3c67" }}
        >
          <Typography className="mr-2 uppercase p-1 font-bold text-gray-100 text-sm">Edit Profile</Typography>
         </button>
    </div>
    </div>
  )
}

export default ViewProfile