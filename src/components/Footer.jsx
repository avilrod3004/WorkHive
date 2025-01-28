/**
 * @module Components
 * @category UI
 */
import React from 'react'
import { NavLink } from 'react-router-dom'

/**
 * Componente de pie de página para la aplicación.
 * Muestra un menú de navegación con un enlace para contactar.
 *
 * @component
 * @returns {JSX.Element} Componente Footer renderizado
 */
const Footer = () => {
  return (
    <footer className='footer'>
        <nav className='footer__menu'>
            <li className='menu__opcion'>
                <NavLink to="/contactUs">contacta con nosotros</NavLink>
            </li>
        </nav>
    </footer>
  )
}

export default Footer

