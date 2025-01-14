import React from 'react'

/**
 * Componente que muestra un menú con los miembros del equipo.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Array[String]} props.teamMembers - Array con los nombres de los miembros del equipo
 * @returns {JSX.Element} Componente TeamMenu renderizado
 */
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
