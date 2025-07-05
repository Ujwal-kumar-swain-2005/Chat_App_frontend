import React from 'react'
import StatusUserCard from './StatusUserCard'
import { AiOutlineClose } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const Status = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1)
  }

  // Simulons des données d'utilisateurs pour l'exemple
  const statusUsers = [
    { id: 1, name: 'omar', profile_picture: 'https://i.pinimg.com/564x/69/98/15/699815725d983812dfe7d091ad3475b3.jpg' },
    { id: 2, name: 'anas', profile_picture: 'https://i.pinimg.com/564x/d6/35/43/d6354364cdca9040e734741e51e8ca84.jpg' },
    { id: 3, name: 'nada', profile_picture: 'https://i.pinimg.com/564x/5f/9c/bc/5f9cbc5988e53f886fc9d5ef5af93d44.jpg' },
    { id: 4, name: 'ilyas', profile_picture: 'https://i.pinimg.com/564x/6d/b6/7e/6db67ea75ac324c96e6e2d75df50068f.jpg' },
    { id: 5, name: 'khadija', profile_picture: 'https://i.pinimg.com/564x/44/f3/42/44f34201eef60e7a6723ab2d712075ae.jpg' },
    { id: 6, name: 'riham', profile_picture: 'https://i.pinimg.com/564x/a7/e5/6c/a7e56cb277a91dc68a356e4c489ee4e3.jpg' },
    { id: 7, name: 'janat', profile_picture: 'https://i.pinimg.com/564x/f0/00/b3/f000b366925428826e2332d2cfca042a.jpg' },
    { id: 8, name: 'ayoub', profile_picture: 'https://i.pinimg.com/564x/62/92/e6/6292e6121939ecda29b1d5027a523638.jpg' },

    // Ajoutez autant d'utilisateurs que nécessaire
  ];

  return (
    <div>
      <div className='flex items-center px-[14vw] py-[7vh]'>
        {/* left half */}
        <div className="left h-[85vh] bg-[#fefefd] lg:w-[30%] w-[50%] px-5">
          <div className="pt-5 h-[13%]">
            {/* Afficher le premier utilisateur (statut) */}
            <StatusUserCard user={statusUsers[0]} />
          </div>
          <hr />
          <div className="overflow-y-scroll h-[86%] pt-2">
            {/* Afficher les autres utilisateurs (statuts) */}
            {statusUsers.slice(1).map(user => (
              <StatusUserCard key={user.id} user={user} />
            ))}
          </div>
        </div>
        {/* right half */}
        <div className="relative h-[85vh] lg:[90%] w-[80%] bg-[#5b5b5b]">
          <AiOutlineClose onClick={handleNavigate} className='text-white cursor-pointer absolute top-5 right-10 text-xl' />
        </div>
      </div>
    </div>
  )
}

export default Status
