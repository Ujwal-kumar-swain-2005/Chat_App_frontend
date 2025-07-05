import React from 'react'
import { useNavigate } from "react-router-dom"

const StatusUserCard = ({ user }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    // Rediriger vers le statut de l'utilisateur spécifique lorsqu'il est cliqué
    navigate(`/status/${user.id}`)
  }

  return (
    <div onClick={handleNavigate} className='flex items-center p-3 cursor-pointer'>
      <div>
        <img className="h-9 w-9 lg:w-10 lg:h-10 rounded-full" src={user.profile_picture} alt={user.name} />
      </div>
      <div className="ml-2 text ">
        <p>{user.name}</p>
      </div>
    </div>
  )
}

export default StatusUserCard
