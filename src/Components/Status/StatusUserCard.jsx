import React from 'react'
import { useNavigate } from "react-router-dom"

const StatusUserCard = ({ user }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/status/${user.id}`)
  }

  const profilePic = user.profile_picture || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name);

  return (
    <div
      onClick={handleNavigate}
      className='flex items-center p-3 cursor-pointer hover:bg-gray-100 transition rounded-lg'
      title={user.status_message || user.name}
    >
      <div className="relative">
        <img
          className="h-10 w-10 rounded-full object-cover border"
          src={profilePic}
          alt={user.name}
        />
        {/* Status indicator */}
        {user.is_online !== undefined && (
          <span
            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
              user.is_online ? 'bg-green-500' : 'bg-gray-400'
            }`}
            title={user.is_online ? "Online" : "Offline"}
          />
        )}
      </div>
      <div className="ml-3 flex flex-col">
        <p className="font-medium">{user.name}</p>
        {user.status_message && (
          <span className="text-xs text-gray-500">{user.status_message}</span>
        )}
        {user.timestamp && (
          <span className="text-[10px] text-gray-400">{new Date(user.timestamp).toLocaleTimeString()}</span>
        )}
      </div>
    </div>
  )
}

export default StatusUserCard
