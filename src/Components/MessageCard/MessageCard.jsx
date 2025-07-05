import React from 'react';

const MessageCard = ({ isReqUser, content, userImg, messageRef }) => {
  return (
    <div
      ref={messageRef}
      className={`flex items-start py-2 px-2 rounded-md max-w-[50%] ${isReqUser ? "self-start bg-white " : "self-end bg-[#d9fdd3]"}`}
    >
      {isReqUser ? (
        <img src={userImg} alt="User" className="w-8 h-8 rounded-full mr-2" />
      ) : null}
      <div>
        <p>{content}</p>
      </div>
      {!isReqUser ? (
        <img src={userImg} alt="User" className="w-8 h-8 rounded-full ml-2" />
      ) : null}
    </div>
  );
};

export default MessageCard;
