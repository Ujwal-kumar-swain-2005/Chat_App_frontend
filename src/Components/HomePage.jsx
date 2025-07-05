import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbCircleDashed } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import {
  BsEmojiSmile,
  BsFilter,
  BsMicFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { useRef } from "react";
import Picker from "emoji-picker-react";
import ChatCard from "./ChatCard/ChatCard";
import Profile from "./Profile/Profile";
import MessageCard from "./MessageCard/MessageCard";
import { useDispatch, useSelector } from "react-redux";
import "./Homepage.css";
import Button from "@mui/material/Button";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CreateGroup from "./Group/CreateGroup";
import { currentUser, logoutAction, searchUser } from "../Redux/Auth/Action";
import { createChat, getUsersChat } from "../Redux/Chat/Action";
import { createMessage, getAllMessages } from "../Redux/Message/Action"
import SockJS, { colors } from "sockjs-client/dist/sockjs";
import { over } from "stompjs";

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [content, setContent] = useState("");
  const [isProfile, setIsProfile] = useState(false);
  const navigate = useNavigate();
  const messageRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { auth, chat, message } = useSelector(store => store);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const open = Boolean(anchorEl);
  const [stompClient, setStompClient] = useState();
  const [isConnect, setIsConnect] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const connect = () => {
    const sock = new SockJS("http://localhost:8080/ws");
    const temp = over(sock);
    setStompClient(temp);

    const headers = {
      Authorization: `Bearer ${token}`,
      "X-XSRF-TOKEN": getCookie("XSRF-TOKEN")
    };
    temp.connect(headers, onConnect, onError);
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  }

  const onError = (error) => {
    console.log("error, ", error);
  }
  const onConnect = () => {
    setIsConnect(true);
  }
  useEffect(() => {
    if (message.newMessage && stompClient) {
      setMessages([...messages, message.newMessage])
      stompClient?.send("/app/message", {}, JSON.stringify(message.newMessage));
      messageRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [message.newMessage])
  useEffect(() => {
    if (message.messages) setMessages(message.messages);
  }, [message.messages]);

  const onMessageReceive = (payload) => {
    console.log("onMessageRecive ............. -----------", payload);
    console.log("Receive message======>>>", JSON.parse(payload.body))
    const receiveMessage = JSON.parse(payload.body);
    setMessages([...messages, receiveMessage]);
  }

  const sendMessageToServer = () => {
    if (stompClient) {
      const value = {
        content,
        chatId: currentChat?.id,
      };
      console.log("---- send message --- ", value);
      stompClient?.send(
        `/app/chat/${currentChat?.id.toString()}`,
        {},
        JSON.stringify(value)
      );
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    setContent((prevContent) => prevContent + emojiObject?.emoji || "");
  };

  const handleEmojiBoxClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isConnect && stompClient && auth.reqUser && currentChat) {
      const subscription = stompClient.subscribe(
        `/user/${currentChat?.id}/private`,
        onMessageReceive
      );
      // stompClient.subscribe('/user/'+currentChat?.id+'/private', onMessageRecive);
      stompClient.subscribe(
        "/group/" + currentChat.id.toString(),
        onMessageReceive
      );
      // stompClient.subscribe('/group/public', onMessageRecive);
      return () => {
        subscription.unsubscribe();
      };
    }
  })


  useEffect(() => {
    connect()
  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOnChatCard = (userId) => {
    const data = { token, userId };
    if (token) dispatch(createChat(data));
  };

  const handleSearch = (query) => {
    dispatch(searchUser({ query, token }));
  };
  const handleCreateNewMessage = () => {
    dispatch(createMessage({ token, chatId: currentChat?.id, content }));
    sendMessageToServer();
    messageRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (token) dispatch(getUsersChat(token));
  }, [token, chat.singleChat, chat.createdGroup]);

  useEffect(() => {
    if (currentChat?.id) {
      dispatch(getAllMessages({ chatId: currentChat?.id, token }))
    }
  }, [currentChat, message.newMessage])

  const handleNavigate = () => {
    setIsProfile(true);
  };
  const profileDisplayHandler = () => {
    setIsProfile(false);
  };
  const handleCreateGroup = () => {
    setIsGroup(true);
  };
  const handleCurrentChat = (item) => {
    setCurrentChat(item);
    messageRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }
  useEffect(() => {
    dispatch(currentUser(token));
  }, [token]);
  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/signup");
  };
  useEffect(() => {
    if (!auth.reqUser) {
      navigate("/signup");
    }
  }, [auth.reqUser]);

  return (
    <div className="relative">


      <div className="absolute w-[100vw] h-[100vh] bg-[#f0f2f5]  flex">
        <div className="w-[30%] bg-[#e8e9ec] h-full">
          {/* Profile */}
          {isGroup && <CreateGroup setIsGroup={setIsGroup} />}
          {isProfile && (
            <div className="w-full h-full">
              <Profile handleProfileDisplay={profileDisplayHandler} />
            </div>
          )}

          {!isProfile && !isGroup && (
            <div className="w-full">
              {/* Home */}
              {
                <div className="flex justify-between item-center px-3 py-3">
                  <div className="flex item-center space-x-3">
                    <img
                      onClick={() => setIsProfile(true)}
                      className="rounded-full w-10 h-10 cursor-pointer"
                      src={auth.reqUser?.profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"}
                      alt=""
                    />
                    <p className="names2">{auth.reqUser?.full_name}</p>
                  </div>


                  <div
                    onClick={handleNavigate}
                    className="flex item-center space-x-3"
                  >
                  </div>
                  <div className="space-x-3 text-2xl flex">
                    <TbCircleDashed
                      className="cursor-pointer"
                      onClick={() => navigate("/status")}
                    />
                    <BiCommentDetail />
                    <div className="">
                      <BsThreeDotsVertical
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                      />
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleCreateGroup}>
                          Create Group
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </div>
                  </div>
                </div>
              }
              {/* {input} */}
              <div className="relative flex justify-center item-center bg-white py-4 px-3">
                <input
                  className="border-none outline-none bg-slate-200 rounded-md w-[93%] pl-9 py-2"
                  type="text"
                  placeholder="Search or Start New Chat"
                  onChange={(e) => {
                    setQuery(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  value={query}
                />
                <AiOutlineSearch className="left-5 top-7 absolute" />
                <div>
                  <BsFilter className="ml-4 text-3xl" />
                </div>
              </div>
              {/* all user */}
              <div className="bg-white overflow-y-scroll h-[82vh] px-3" style={{ cursor: 'pointer' }} >
                {query &&
                  auth.searchUser?.map((item) => (
                    <div
                      onClick={() => {
                        handleClickOnChatCard(item?.id);
                        setQuery("");
                      }}
                      key={item?.id}
                    >
                      <hr />
                      <ChatCard
                        isChat={false}
                        name={item.full_name}
                        userImg={
                          item.profile_picture ||
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                        }
                      />
                    </div>
                  ))}
                {chat.chats !== null && chat.chats.length > 0 && !query &&
                  chat.chats?.map((item) => (
                    <div onClick={() => handleCurrentChat(item)} key={item.id}>

                      <hr /> {item.is_group ? (
                        <ChatCard
                          name={item.chat_name}
                          userImg={
                            item.chat_image ||
                            "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_1280.png"
                          }
                        />
                      ) : (
                        <ChatCard
                          isChat={true}
                          name={
                            auth.reqUser?.id !== item.users[0]?.id
                              ? item.users[0].full_name
                              : item.users[1].full_name
                          }
                          userImg={
                            auth.reqUser.id !== item.users[0].id ?
                              item.users[0].profile_picture ||
                              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" :
                              item.users[1].profile_picture ||
                              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                          }
                          notification={notifications.length}
                          isNotification={
                            notifications[0]?.chat?.id === item.id
                          }
                          message={
                            (item.id ===
                              messages[messages.length - 1]?.chat?.id &&
                              messages[messages.length - 1]?.content) ||
                            (item.id === notifications[0]?.chat?.id &&
                              notifications[0]?.content)
                          }
                        />
                      )
                      }

                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
        {/* default lander page */}
        {!currentChat && (
          <div className="w-[70%] flex flex-col items-center justify-center">
            <div className="max-w-[70%] text-center">
              <img
                src="https://res.cloudinary.com/zarmariya/image/upload/v1662264838/whatsapp_multi_device_support_update_image_1636207150180-removebg-preview_jgyy3t.png"
                alt=""
              />
              <h1 className="text-4xl text-gray-600">WhatsApp Web</h1>
              <p className=" my-9">
                send and reveive message without keeping your phone online. Use
                WhatsApp on Up to 4 Linked devices and 1 phone at the same time.
              </p>
            </div>
          </div>
        )}
        {/* message part */}

        {currentChat && (
          <div className="w-[70%] relative chat-background">
            <div className="header absolute top-0 w-full bg-[#f0f2f5]">
              <div className="flex justify-between">
                <div className="py-3 space-x-4 flex item-center px-3 bg">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={currentChat?.is_group ? (currentChat?.chat_image || "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579__340.png") :
                      (auth.reqUser?.id !== currentChat?.users[0].id
                        ? currentChat?.users[0].profile_picture ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                        : currentChat?.users[1].profile_picture ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png")
                    }
                    alt=""
                  />
                  <p>
                    {currentChat?.is_group ? (
                      <React.Fragment>
                        {currentChat?.chat_name}
                        <br />
                        <p className="names">{currentChat?.users.map(user => user.full_name).join(',')}</p>

                      </React.Fragment>
                    ) : (
                      auth.reqUser?.id !== currentChat?.users[0].id
                        ? currentChat?.users[0].full_name
                        : currentChat?.users[1].full_name
                    )}
                  </p>
                </div>
                <div className="py-3 space-x-4 flex items-center px-3 bg">
                  <AiOutlineSearch />
                  <BsThreeDotsVertical />
                </div>
              </div>
            </div>

            {/* Chat Portion */}
            <div
              onClick={handleEmojiBoxClose}
              className="px-10   h-[85vh] overflow-y-scroll"
            >
              <div className=" space-y-1 flex flex-col justify-center mt-20 py-2">
                {messages.length > 0 &&
                  messages?.map((item, index) => (
                    <MessageCard
                      messageRef={messageRef}
                      key={item.id}
                      isReqUser={item.user?.id !== auth.reqUser.id}
                      content={`${item.content}`}
                      userImg={item.user?.profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"}
                    />

                  ))}
              </div>
            </div>
            {/* footer */}
            <div className="footer bg-[#f0f2f5] absolute bottom-0 w-full py-3 text-2xl">
              <div className="flex justify-between items-center px-5 relative">
                <BsEmojiSmile
                  onClick={() => setIsOpen(!isOpen)}
                  className="cursor-pointer"
                />
                <ImAttachment />
                <div
                  className={`${isOpen ? "block" : "hidden"
                    } absolute bottom-16`}
                >
                  <Picker onEmojiClick={onEmojiClick} />
                </div>

                <input
                  onChange={(e) => setContent(e.target.value)}
                  className="py-2 outline-none border-none bg-white pl-4 rounded-md w-[85%]"
                  placeholder="Type message"
                  value={content}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleCreateNewMessage();
                      setContent("");
                    }
                  }}
                />
                <BsMicFill />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
