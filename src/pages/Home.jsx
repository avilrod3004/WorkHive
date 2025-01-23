import logo from "../assets/logoHome.png";
import logoDark from "../assets/logoHomeDark.png";
import organiza from "../assets/home/4.png";
import colabora from "../assets/home/5.png";
import exito from "../assets/home/exito.png";

/**
 * Home Component
 *
 * Este componente representa la página de inicio de la aplicación WorkHive.
 * Muestra el menu de navegación, logo y eslogan y
 * una sección con tres artículos que describen las características principales.
 */
const Home = () => {
  return (
    <div className="contenedor__home">
      <section className="home__logo">
        <img className="logo__imagen" src={logo} alt="logoWH" />
        <h3 className="logo__frase">Organiza,colabora y controla tu éxito</h3>
      </section>
      <section className="home__frases">
        <article className="frases__eslogan">
          <img className="eslogan__imagen" src={organiza} alt="organiza" />
          <div className="eslogan__frase">
            <h1 className="frase__titulo">ORGANIZA</h1>
            <p className="frase__parrafo">
              "La clave de un futuro brillante es la organización de tus ideas”
            </p>
          </div>
        </article>
        <article className="frases__eslogan1">
          <img className="eslogan__imagen" src={colabora} alt="colabora" />
          <div className="eslogan__frase1">
            <h1 className="frase__titulo1">COLABORA</h1>
            <p className="frase__parrafo1">
              "El trabajo en equipo transforma sueños individuales en logros
              colectivos."
            </p>
          </div>
        </article>
        <article className="frases__eslogan">
          <img className="eslogan__imagen" src={exito} alt="exito" />
          <div className="eslogan__frase">
            <h1 className="frase__titulo">ÉXITO</h1>
            <p className="frase__parrafo">
              "El éxito no es solo un destino, sino el resultado de la dedicación
              y la estrategia."
            </p>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Home;
