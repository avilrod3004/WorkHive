import React from 'react'

const Header = () => {
  return (
    <header className='header'>
        <h1 className='header__titulo'>WORKHIVE</h1>
        <nav className='header__menu'>
            <li className='menu__opcion'><NavLink to="/login">Iniciar sesión</NavLink></li>
            <li className='menu__opcion'><NavLink to="/usuario">Usuario</NavLink></li>
            <li className='menu__opcion'><NavLink to="/register">Registrarse</NavLink></li>
        </nav>
    </header>
  )
}

export default Header