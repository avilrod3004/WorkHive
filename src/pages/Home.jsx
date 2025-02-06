/**
 * @module Pages
 * @category Routes
 */
import logo from "../assets/logoHome.png";
import logoDark from "../assets/logoHomeDark.png";
import organiza from "../assets/home/4.png";
import colabora from "../assets/home/5.png";
import exito from "../assets/home/exito.png";
import { useTheme } from "../context/ThemeContext";
import { Helmet } from "react-helmet";

/**
 * @page
 * Home Component
 *
 * Página de inicio de WorkHive, una plataforma de gestión de proyectos colaborativos.
 * Aquí se presentan las principales funcionalidades para optimizar la productividad y el trabajo en equipo.
 *
 * @return {JSX.Element} Página de inicio optimizada para SEO.
 */
const Home = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="contenedor__home">
      <Helmet>
        <title>WorkHive - Gestión de Proyectos y Productividad</title>
        <meta
          name="description"
          content="Aumenta la productividad y mejora la colaboración con WorkHive, la plataforma ideal para gestionar proyectos en equipo de forma eficiente."
        />
        <meta
          name="keywords"
          content="gestión de proyectos, productividad, colaboración en equipo, planificación, organización de tareas, éxito empresarial"
        />
      </Helmet>
      <section className="home__logo">
        <img
          className="logo__imagen"
          src={isDarkMode ? logoDark : logo}
          alt="Logo de WorkHive - Plataforma de gestión de proyectos"
        />
        <h3 className="logo__frase">
          Organiza, colabora y alcanza el éxito en tus proyectos
        </h3>
      </section>
      <section className="home__frases">
        <article className="frases__eslogan">
          <img
            className="eslogan__imagen"
            src={organiza}
            alt="Organiza tus proyectos con eficiencia"
          />
          <div className="eslogan__frase">
            <h1 className="frase__titulo">ORGANIZA TUS PROYECTOS</h1>
            <p className="frase__parrafo">
              Planifica y gestiona cada tarea con precisión. Una organización
              efectiva es la clave del éxito en cualquier equipo.
            </p>
          </div>
        </article>
        <article className="frases__eslogan1">
          <img
            className="eslogan__imagen"
            src={colabora}
            alt="Colabora en equipo con WorkHive"
          />
          <div className="eslogan__frase1">
            <h1 className="frase__titulo1">TRABAJA EN EQUIPO</h1>
            <p className="frase__parrafo1">
              Fomenta la colaboración y la comunicación en tiempo real. Un
              equipo bien conectado logra grandes resultados.
            </p>
          </div>
        </article>
        <article className="frases__eslogan">
          <img
            className="eslogan__imagen"
            src={exito}
            alt="Alcanza el éxito con una gestión eficiente"
          />
          <div className="eslogan__frase">
            <h1 className="frase__titulo">ALCANZA EL ÉXITO</h1>
            <p className="frase__parrafo">
              Con herramientas avanzadas de planificación y seguimiento, lleva
              tus proyectos al siguiente nivel y obtén resultados
              extraordinarios.
            </p>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Home;
