import React, { useEffect, useState } from 'react'
import StatusUserCard from './StatusUserCard'
import { AiOutlineClose } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const Status = () => {
  const navigate = useNavigate();
  const [statusUsers, setStatusUsers] = useState([]);

  useEffect(() => {
    
    fetch('http://localhost:5000/api/status-users')
      .then(res => res.json())
      .then(data => setStatusUsers(data))
      .catch(err => console.error('Error fetching status users:', err));
  }, []);

  const handleNavigate = () => {
    navigate(-1)
  }

  return (
    <div>
      <div className='flex items-center px-[14vw] py-[7vh]'>
      
        <div className="left h-[85vh] bg-[#fefefd] lg:w-[30%] w-[50%] px-5">
          <div className="pt-5 h-[13%]">
            
            {statusUsers[0] && <StatusUserCard user={statusUsers[0]} />}
          </div>
          <hr />
          <div className="overflow-y-scroll h-[86%] pt-2">
            
            {statusUsers.slice(1).map(user => (
              <StatusUserCard key={user.id} user={user} />
            ))}
          </div>
        </div>
    
        <div className="relative h-[85vh] lg:[90%] w-[80%] bg-[#5b5b5b]">
          <AiOutlineClose onClick={handleNavigate} className='text-white cursor-pointer absolute top-5 right-10 text-xl' />
        </div>
      </div>
    </div>
  )
}

export default Status
