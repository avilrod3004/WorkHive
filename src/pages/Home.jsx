import logo from './assets/logo.png';
import hive from './assets/hive.png';
import organiza from './assets/home/4.png';
import colabora from './assets/home/5.png';
import exito from './assets/home/exito.png';

/**
 * Home Component
 * 
 * Este componente representa la página de inicio de la aplicación WorkHive.
 * Muestra el logo, el nombre de la aplicación, botones de navegación y
 * una sección con tres artículos que describen las características principales.
 */
const Home = () => {
  return (
    <>
        <section className='home__logo'>
            <img className='logo__colmena' src={hive} alt="colmena" />
            <h3 className='logo__frase'>Organiza,colabora y controla tu éxito</h3>
            <img className='logo__imagen' src={logo} alt="logoWH" />
            <img className='logo__colmena' src={hive} alt="colmena" />
        </section>
        <section className='home__frases'>
            <article className='frases__eslogan'>
                <img className='eslogan__imagen' src={organiza} alt="organiza" />
                <h1 className='eslogan__titulo'>ORGANIZA</h1>
                <p className='eslogan__frase'>"La clave de un futuro brillante es la organización de tus ideas”</p>
            </article>
            <article className='frases__eslogan'>
                <img className='eslogan__imagen' src={colabora} alt="colabora" />
                <h1 className='eslogan__titulo'>COLABORA</h1>
                <p className='eslogan__frase'>"El trabajo en equipo transforma sueños individuales en logros colectivos."</p>
            </article>
            <article className='frases__eslogan'>
                <img className='eslogan__imagen' src={exito} alt="exito" />
                <h1 className='eslogan__titulo'>ÉXITO</h1>
                <p className='eslogan__frase'>"El éxito no es solo un destino, sino el resultado de la dedicación y la estrategia."</p>
            </article>
        </section>
    </>
  )
}

export default Home