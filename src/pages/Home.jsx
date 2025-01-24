import logo from "../assets/logoHome.png";
import logoDark from "../assets/logoHomeDark.png";
import organiza from "../assets/home/4.png";
import colabora from "../assets/home/5.png";
import exito from "../assets/home/exito.png";
import { useTheme } from '../context/ThemeContext'
import * as Yup from "yup";
import FormModal from "../modals/FormModal.jsx";
import {useState} from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {brown} from "@mui/material/colors";
import Abeja from "../assets/bee.png"

/**
 * Home Component
 *
 * Este componente representa la página de inicio de la aplicación WorkHive.
 * Muestra el menu de navegación, logo y eslogan y
 * una sección con tres artículos que describen las características principales.
 */
const Home = () => {

  const { isDarkMode } = useTheme();
  const [modalFormOpen, setModalFormOpen] = useState(false);


  const validationSchemaForm = Yup.object().shape({
    email: Yup.string().trim()
        .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, "El formato del email no es válido")
        .required("El campo email es obligatorio"),
    password: Yup.string().trim()
        .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/, "La contraseña no cumple los requisitos. Debe tener una longitud mínima de 8 caracteres y contener una letra en mayúscula, un número y un caracter especial.")
        .required("El campo contraseña es obligatorio.")
  })

  return (
    <div className="contenedor__home">
      <section className="home__logo">
        <img 
          className="logo__imagen" 
          src={isDarkMode ? logoDark : logo} 
          alt="logoWH" 
        />
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

      <button onClick={() => setModalFormOpen(true)}>Modal formulario</button>
      <FormModal
          isOpen={modalFormOpen}
          onClose={() => setModalFormOpen(false)}
          initialValues={{
            email: "",
            password: ""
          }}
          validationSchema={validationSchemaForm}
          onSubmit={(values) => {
            console.log("Sesion iniciada ", values);
            setModalFormOpen(false)
          }}
          title="Configurar usuario"
      >
        {
          ({values, handleChange, handleBlur, errors, touched}) => (
              <>

                <div className="formulario-perfil">
                  <img src={Abeja} alt="" className="modal__abeja"/>

                  <img src={organiza} alt="" className="imagen-redonda"/>

                  <input type="file" id="fileInput" className="file-input"/>

                  <label htmlFor="fileInput" className="custom-button">
                    <AddPhotoAlternateIcon sx={{ color: brown[400] }}/>
                  </label>
                </div>

                <label htmlFor="email">
                  Nombre
                  <input
                      type="text"
                      name="email"
                      id="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                  />
                  {
                      errors.email && touched.email && errors.email
                  }
                </label>

                <label htmlFor="password">
                  Email:
                  <input
                      type="password"
                      name="password"
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                  />
                  {
                      errors.password && touched.password && errors.password
                  }
                </label>
              </>
          )
        }
      </FormModal>
    </div>
  );
};

export default Home;
