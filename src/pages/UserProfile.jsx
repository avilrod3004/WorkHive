import React from "react";
import bee from "../assets/bee.png";
import Board from "../components/Board";

const UserProfile = () => {
  const mockPanels = [
    { name: "Panel 1" },
    { name: "Panel 2" },
    { name: "Panel 3" },
  ];
  return (
    <div className="contenedor__usuario">
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
          <img
            className="images__user"
            src="https://cdn-icons-png.flaticon.com/512/6326/6326055.png"
            alt=""
          />
          <div className="user__bee">
            {/* Logo WorkHive */}
            <img className="images__logo" src={bee} alt="Logo de WorkHive" />
          </div>
        </div>

        {/* Nombre completo del usuario */}
        <h1 className="usuario__nombre">PAqiuto</h1>
      </section>

      <section className="contenedor__proyectos">
        <Board
          name="PROYECTOS ACTUALES"
          type="inprogress"
          panels={mockPanels}
        />
        <Board name="PROYECTOS FINALIZADOS" type="done" panels={mockPanels} />
      </section>
    </div>
  );
};

export default UserProfile;
