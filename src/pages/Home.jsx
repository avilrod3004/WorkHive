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
        <img src={hive} alt="colmena" />
        <h1>WORKHIVE</h1>
        <h3>Organiza,colabora y controla tu éxito</h3>
        <img src={logo} alt="logoWH" />
        <img src={hive} alt="colmena" />
        <nav>
            <button>Inicia sesión</button>
            <button>Registrate</button>
        </nav>
        <section>
            <article>
                <img src={organiza} alt="organiza" />
                <h1>ORGANIZA</h1>
                <p>"La clave de un futuro brillante es la organización de tus ideas”</p>
            </article>
            <article>
            <img src={colabora} alt="colabora" />
                <h1>COLABORA</h1>
                <p>"El trabajo en equipo transforma sueños individuales en logros colectivos."</p>
            </article>
            <article>
            <img src={exito} alt="exito" />
                <h1>ÉXITO</h1>
                <p>"El éxito no es solo un destino, sino el resultado de la dedicación y la estrategia."</p>
            </article>
        </section>
    </>
  )
}

export default Home