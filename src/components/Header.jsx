import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

/**
 * Componente de Encabezado para la aplicación.
 * Muestra el título de la aplicación, menú de navegación y botón de cambio de tema.
 *
 * @component
 * @returns {JSX.Element} Componente de Encabezado renderizado
 */
const Header = () => {
    /**
     * Estado para controlar si el modo oscuro está activo.
     * Se inicializa verificando la presencia de la clase 'dark-theme' en el body.
     *
     * @type {[boolean, function]} isDarkMode y setIsDarkMode
     */
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return document.body.classList.contains('dark-theme');
    });

    /**
     * Efecto para alternar la clase 'dark-theme' en el elemento body
     * cuando cambia el estado isDarkMode.
     */
    useEffect(() => {
        document.body.classList.toggle('dark-theme', isDarkMode);
    }, [isDarkMode]);

    /**
     * Cambia el tema entre modo claro y oscuro.
     * Invierte el estado actual de isDarkMode.
     */
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
