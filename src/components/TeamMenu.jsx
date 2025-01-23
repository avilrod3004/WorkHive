import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

/**
 * Componente que muestra un menú con los miembros del equipo.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Array[String]} props.teamMembers - Array con los nombres de los miembros del equipo
 * @returns {JSX.Element} Componente TeamMenu renderizado
 */
const TeamMenu = ({ teamMembers }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="team__menu">
      <h2 className='menu__titulo'>EQUIPO</h2>
      <KeyboardArrowDownIcon 
        className='menu__icono' 
        onClick={toggleMenu}
      />
      {isOpen && (
        <ul className='menu__miembros'>
          {teamMembers.map((member, index) => (
            <li className='menu__usuario' key={index}>{member}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
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
