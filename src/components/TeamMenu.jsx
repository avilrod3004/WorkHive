/**
 * @module Components
 * @category UI
 */
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";

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
      <div className="menu__header" onClick={toggleMenu}>
        <h2 className="menu__titulo">EQUIPO</h2>
        <KeyboardArrowDownIcon className="menu__icono" />
      </div>
      {isOpen && (
        <table className="menu__tabla">
          <tbody>
            {teamMembers.map((member, index) => (
              <tr key={index} className="menu__usuario">
                <td>{member.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TeamMenu;

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
