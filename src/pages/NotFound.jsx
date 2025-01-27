import React from 'react'
import margarita from '../assets/margarita.png';
import margaritaDark from '../assets/margaritaDark.png';
import bee from '../assets/bee.png';
import beeDark from '../assets/beedark.png';
import { useTheme } from '../context/ThemeContext'

/**
 * Componente NotFound
 * 
 * Este componente renderiza una página de error 404 (Not Found) personalizada.
 * Utiliza imágenes diferentes dependiendo del tema (claro u oscuro) seleccionado.
 * 
 * @returns {JSX.Element} Página de error 404 personalizada
 */
const NotFound = () => {
  
  /**
   * Hook personalizado para obtener el estado del tema
   * @type {boolean} isDarkMode - Indica si el modo oscuro está activo
   */
  const { isDarkMode } = useTheme();

  return (
    <section className='contenedor__error'>
      <div className='error__notFound'>
        <p className='notFound__number'>4</p>
        <img 
          className='notFound__image' 
          alt='404_margarita' 
          src={isDarkMode ? margaritaDark : margarita} 
        />
        <p className='notFound__number'>4</p>
      </div>
      <p className='notFound'>NOT FOUND</p>
      <div className='bee-container'>
        <img 
          className='bee' 
          alt='bee' 
          src={isDarkMode ? beeDark : bee}  
        />
      </div>    
    </section>
  )
}

export default NotFound
