import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return document.documentElement.getAttribute('data-theme') === 'dark';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };
    
    return (
        <header className='header'>
            <h1 className='header__titulo'>WORKHIVE</h1>
            <nav className='header__menu'>
                <ul>
                    <li className='menu__opcion'><NavLink to="/login">Iniciar sesión</NavLink></li>
                    <li className='menu__opcion'><NavLink to="/usuario">Usuario</NavLink></li>
                    <li className='menu__opcion'><NavLink to="/register">Registrarse</NavLink></li>
                </ul>
                <div 
                    onClick={toggleTheme} 
                    className={`theme-icon ${isDarkMode ? 'theme-icon--dark' : 'theme-icon--light'}`}
                >
                    {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </div>
            </nav>
        </header>
    )
}

export default Header
