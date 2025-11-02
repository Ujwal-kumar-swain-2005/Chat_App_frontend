import React from 'react';

const ChatCard = ({
  userImg,
  name,
  message,
  time = "Now",
  unreadCount = 0,
  active,
  isGroup,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center px-3 py-3 hover:bg-[#DCF8C6] transition-all cursor-pointer rounded-md mb-1 ${active ? 'bg-[#E6FFDE]' : 'bg-white'}`}
      style={{borderLeft: active ? '4px solid #25D366' : '4px solid transparent'}}
    >
      <img
        className="h-14 w-14 rounded-full object-cover"
        src={userImg}
        alt=""
      />
      <div className="pl-4 flex-1">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-md">{name}</span>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span
            className="text-gray-600 text-sm truncate"
            title={message}
            style={{maxWidth: "70%"}}
          >{message}</span>
          {unreadCount > 0 && (
            <span className="ml-2 bg-green-500 text-white rounded-full px-2 py-0.5 text-xs font-bold">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
      {isGroup && (
        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full" title="Group">
          Group
        </span>
      )}
    </div>
  );
};

export default ChatCard;
