import React from 'react'

const TeamMenu = ({ teamMembers }) => {
  return (
    <div className="team__menu">
      <h3 className='menu__titulo'>Equipo</h3>
      <ul className='menu__miembros'>
        {teamMembers.map((member, index) => (
          <li className='menu__usuario' key={index}>{member}</li>
        ))}
      </ul>
    </div>
  )
}

export default TeamMenu

// PENSADO PARA PASARLE UN ARRAY, EJEMPLO:
// import React from 'react'
// import TeamMenu from './TeamMenu'

// const App = () => {
//   const teamMembers = ['Ana', 'Juan', 'María', 'Carlos']

//   return (
//     <div>
//       <TeamMenu teamMembers={teamMembers} />
//     </div>
//   )
// }

// export default App
