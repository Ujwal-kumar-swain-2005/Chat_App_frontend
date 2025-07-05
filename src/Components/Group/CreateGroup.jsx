import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import SelectedMember from "./SelectedMember";
import ChatCard from "../ChatCard/ChatCard";
import NewGroup from "./NewGroup";
import { searchUser } from "../../Redux/Auth/Action";

const CreateGroup = ({ setIsGroup }) => {
  const [newGroup, setNewGroup] = useState(false);
  const [groupMember, setGroupMember] = useState(new Set());
  const [query, setQuery] = useState("");
  const { auth } = useSelector(store => store);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const handleRemoveMember = (item) => {
    groupMember.delete(item);
    setGroupMember(groupMember);
  };
  const handleSearch = () => {
    const data = { query: query, token };
    dispatch(searchUser(data))
  };

  return (
    <div className="w-full h-full">
      {!newGroup && (
        <div>
          <div className="flex items-center space-x-10 bg-[#228e7a] text-white pt-16 px-10 pb-5">
            <BsArrowLeft className="cursor-pointer text-2xl font-bold" />
            <p className="text-xl font-semibold"> Add Group Participants</p>
          </div>
          <div className="relative bg-white py-4 px-3">
            <div className="flex space-x-2 flex-wrap space-y-1">
              {groupMember.size > 0 &&
                Array.from(groupMember).map((item) => (
                  <SelectedMember
                    handleRemoveMember={() => handleRemoveMember(item)}
                    member={item}
                  />
                ))}
            </div>
            <input type="text" onChange={(e) => {
              handleSearch(e.target.value)
              setQuery(e.target.value)
            }}
              className="outline-none border-b border-[#8888] p-2 w-[93%]"
              placeholder="Search User"
              value={query}
            />
          </div>
          <div className="bg-white overflow-y-scroll h-[50.2vh]">
            {query && auth.searchUser?.map((item) => <div onClick={() => {
              groupMember.add(item);
              setGroupMember(groupMember);
              setQuery("")
            }}
              key={item?.id}
            >
              <hr />
              <ChatCard userImg={item.profile_picture} name={item.full_name} />
            </div>)}
          </div>
          <div className="py-10 bottom-10 bg-slate-200 flex item-center justify-center">
            <div className="bg-green-600 rounded-full p-4 cursor-pointer" onClick={() => {
              setNewGroup(true)
            }}>
              <BsArrowRight className="text-white font-bold text-3xl " />
            </div>
          </div>
        </div>
      )}
      {newGroup && <NewGroup setIsGroup={setIsGroup} groupMember={groupMember} />}
    </div>
  );
};

export default CreateGroup;
