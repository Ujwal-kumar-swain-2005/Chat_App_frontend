import React, { useState } from "react";
import { BsArrowLeft, BsCheck2, BsPencil } from 'react-icons/bs'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from "../../Redux/Auth/Action"

const Profile = ({handleProfileDisplay}) => {
  const navigate = useNavigate();
  const[flag, setFlag]= useState(false);
  const[userName, setUserName] = useState(null);
  const [tempPicture, setTempPicture]= useState(null);
  const {auth} = useSelector(store => store);
  const dispatch = useDispatch();

  
  const handleFlag=() => {
    setFlag(true);
  }
  const handleCheckClick=() => {
    setFlag(false);
    const data = {
      id: auth.reqUser?.id,
      token: localStorage.getItem("token"),
      data: {full_name: userName}
    }
    dispatch(updateUser(data))
  }
  const handleChange=(e) => {
    setUserName(e.target.value);

  }
  const handleUpdateName=(e)=> {
    const data = {
      id: auth.reqUser?.id,
      token: localStorage.getItem("token"),
      data: {full_name: userName}
    }
    if(e.target.key === "Enter"){
      dispatch(updateUser(data))
    }
  }
  const uploadToCloudinary=(pics)=>{
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "whatsapp");
    data.append("cloud_name", "dvx5lm9pe");
    fetch("https://api.cloudinary.com/v1_1/dvx5lm9pe/image/upload", {
      method: "POST",
      body: data,
    })
    .then((res)=> res.json())
    .then((data) => {
      console.log("THE DATA",data);
      setTempPicture(data.url.toString());
      const dataa = {
        id: auth.reqUser.id,
        token: localStorage.getItem("token"),
        data: {profile_picture: data.url.toString()}
      };
      dispatch(updateUser(dataa))
    })
  }
  return (
        <div className="w-full h-full">
          <div className='flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5'>
            <BsArrowLeft className='cursor-pointer text-2xl font-bold' onClick={handleProfileDisplay}/>
            <p className='cursor-pointer font-semibold'>Profile</p>
          </div>
                {/* Update profile pic */}
          <div className='flex flex-col justify-center items-center my-12'>
            <label htmlFor='imgInput'>
              <img
                className="rounded-full w-[15vw] h-[15vw] cursor-pointer" 
                src={auth.reqUser?.profile_picture || tempPicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} 
                alt=""
               />
            </label>
            <input onChange={(e) => uploadToCloudinary(e.target.files[0])} type="file" id='imgInput' className='hidden' />
          </div>
                {/* Name Section */}
          <div className="bg-white px-3">
            <p className='py-3'>Your Name</p>

            {!flag && <div className="w-full flex justify-between items-center">
              <p className='py-3'>{auth.reqUser.full_name|| "Username"}</p>
              <BsPencil onClick={handleFlag} className='cursor-pointer'/>
            </div>}
            {
              flag && <div className="w-full flex justify-between items-center py-2">
                <input onKeyPress= {handleUpdateName} onChange={handleChange} className="w-[80%] outline-none border-b-2 border-blue-700 p-2" type="text" placeholder="Enter Your Name"/>
                <BsCheck2 onClick={handleCheckClick} className="cursor-pointer text-2xl"/>
              </div>
            }
          </div>
          <div className="px-3 py-5">
            <p className='py-5'>This is not your username.. This name will be visible to your contacts</p>
          </div>

        </div>

  )
}

export default Profile
