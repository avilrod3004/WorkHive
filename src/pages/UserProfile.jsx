import React, { useEffect } from "react";
import bee from "../assets/bee.png";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate(-1);
    }
  }, [token, navigate]);

  return (
    <>
      <nav className="menu__usuario">
        <ul className="usuario__lista">
          <li className="lista__opcion">
            <a href="">CREAR NUEVO PROYECTO</a>
          </li>
          <li className="lista__opcion">
            <a href="">CONFIGURACIÓN USUARIO</a>
          </li>
        </ul>
      </nav>

      <section className="info__usuario">
        <div className="usuario__images">
          {/* Foto de perfil del usuario */}
          <img className="images__user" src="" alt="" />

          {/* Logo WorkHive */}
          <img className="images__logo" src={bee} alt="Logo de WorkHive" />
        </div>

        {/* Nombre completo del usuario */}
        <h1 className="usuario__nombre"></h1>
      </section>

      <section className="contenedor__proyectos">
        <div>
          <h1>PROYECTOS ACTUALES</h1>
          <ul>
            <li>Nombre proyecto</li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>

        <div>
          <h1>PROYECTOS FINALIZADOS</h1>
          <ul>
            <li>Nombre proyecto</li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
