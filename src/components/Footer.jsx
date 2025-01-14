import React from 'react'

const Footer = () => {
  return (
    <footer className='footer'>
        <nav className='footer__menu'>
            <li className='menu__opcion'><NavLink to="/contactUs">Contacta con nosotros</NavLink></li>
        </nav>
    </footer>
  )
}

export default Footer