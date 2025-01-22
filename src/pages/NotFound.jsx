import React from 'react'
import margarita from '../assets/margarita.png';
import bee from '../assets/bee.png';

const NotFound = () => {
  return (
    <section className='contenedor__error'>
      <div className='error__notFound'>
        <p className='notFound__number'>4</p>
        <img className='notFound__image' alt='404_margarita' src={margarita} />
        <p className='notFound__number'>4</p>
      </div>
      <p className='notFound'>NOT FOUND</p>
      <div className='bee-container'>
        <img className='bee' alt='bee' src={bee} />
      </div>    
    </section>
  )
}

export default NotFound