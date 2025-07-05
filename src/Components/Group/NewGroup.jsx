import { Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";

import { BsArrowLeft, BsCheck2 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { createGroupChat } from "./../../Redux/Chat/Action";

const NewGroup = ({groupMember, setIsGroup}) => {
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState(null);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const uploadToCloudinary=(pics)=>{
    setIsImageUploading(true);
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
      setGroupImage(data.url.toString());
      isImageUploading(false);
    })
  }

  const handleCreateGroup=() => {
    let userIds = []

    for(let user of groupMember) {
      userIds.push(user.id);
    }  
    const group = {
      userIds,
      chat_name: groupName,
      chat_image: groupImage
    };
    const data = { group, token };
    dispatch(createGroupChat(data));
    setIsGroup(false);
  }
  return (
    <div className="w-full h-full">
      <div className="flex items-center text-white space-x-10 px-10 pb-5 bg-[#008069]">
        <BsArrowLeft className="curesor-pointer text-2xl font-bold" />
        <p className="text-2xl font-semibold">NewGroup</p>
      </div>
      <div className="rounded-full flex flex-col justify-center items-center my-12">
        <label htmlFor="imgInput" className="relative">
          <img
          className="h-22 w-22 rounded-full" 
            src={groupImage || "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579__340.png"}
            alt=""
            style={{ borderRadius: '50%' }}
          />
          {isImageUploading && (
            <CircularProgress className="absolute top-[5rem] left-[6rem]" />
          )}
        </label>
        <input
          type="file"
          id="imgInput"
          className="hidden"
          onChange={(e) => uploadToCloudinary(e.target.files[0])}
          value={""}
        />
      </div>
      <div className="w-full flex justify-between items-center py-2 px-5">
        <input
          className="w-full outline-none border-b-2 border-green-70 px-2 bg-transparent"
          placeholder="Group Subject"
          value={groupName}
          type="text"
          onChange={(e) => setGroupName(e.target.value)}
        />
      </div>
      {groupName && (
        <div className="py-10 bg-slate-200 flex items-center justify-center">
          <Button onClick={handleCreateGroup}>
            <div className="bg-[#0c977d] rounded-full p-4 ">
              <BsCheck2 className="text-white font-bold text-3xl" />
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewGroup;
