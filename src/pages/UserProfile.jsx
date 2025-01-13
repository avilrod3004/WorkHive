import React from 'react';

const UserProfile = () => {
    return (
        <>
            <nav>
                <ul>
                    <li><a href="">CREAR NUEVO PROYECTO</a></li>
                    <li><a href="">CONFIGURACIÓN USUARIO</a></li>
                </ul>
            </nav>

            <section>
                <header>
                    {/* Foto de perfil del usuario */}
                    <img src="" alt=""/>

                    {/* Logo WorkHive */}
                    <img src="" alt=""/>

                    {/* Nombre completo del usuario */}
                    <h1></h1>
                </header>

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