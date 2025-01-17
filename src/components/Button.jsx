/**
 * Componente Button que renderiza un botón personalizable.
 * 
 * @component
 * @param {string} props.text - Texto a mostrar en el botón
 * @param {function} props.onClick - Función a ejecutar cuando se hace clic en el botón
 * @returns {JSX.Element} Componente Button renderizado
 */
const Button = ({ text, onClick }) => {
  return (
    <button className='component__button' onClick={onClick}>
      {text}
    </button>
  )
}

export default Button