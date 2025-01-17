import React from 'react';

const ProyectInfo = () => {
    return (
        <>
            <header>
                <img src="" alt="Logo de WorkHive"/>
                <h1>Nombre proyecto</h1>

                <ul>
                    <li>Listado miembros del equipo</li>
                    <li></li>
                    <li></li>
                </ul>
            </header>

            <section>
                <div>
                    <h1>Descripción de proyecto</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam autem commodi consequatur delectus est excepturi itaque laudantium maxime, minima molestias nam nisi omnis perferendis, possimus soluta vel, vitae voluptate! Aliquid cum facilis laborum minima modi, non possimus vero. At cupiditate ipsam itaque quis reiciendis? Autem corporis, esse eveniet fugiat hic obcaecati quidem rem sequi temporibus unde.</p>
                </div>

                <div>
                    <div>
                        <p><span>Fecha de inicio: </span>30/12/2024</p>
                    </div>

                    <div>
                        <p><span>Fecha de fin: </span>05/01/2025</p>
                    </div>
                </div>

                <div>
                    <h1>Administrador</h1>
                    <p>Paquito Rodríguez Benalmadena</p>
                </div>
            </section>

            <section>
                <div>
                    <h1>TO DO</h1>

                    <ul>
                        <li>Nombre tarea 1</li>
                        <li>Nombre tarea 2</li>
                        <li>Nombre tarea 3</li>
                        <li>Nombre tarea 4</li>
                    </ul>
                </div>

                <div>
                    <h1>IN PROGRESS</h1>

                    <ul>
                        <li>Nombre tarea 1</li>
                        <li>Nombre tarea 2</li>
                    </ul>
                </div>

                <div>
                    <h1>TO REVIEW</h1>

                    <ul>
                        <li>Nombre tarea 1</li>
                        <li>Nombre tarea 2</li>
                        <li>Nombre tarea 3</li>
                    </ul>
                </div>

                <div>
                    <h1>DONE</h1>

                    <ul>
                        <li>Nombre tarea 1</li>
                        <li>Nombre tarea 2</li>
                    </ul>
                </div>
            </section>

            <nav>
                <ul>
                    <li><a href=""><img src="" alt="Agregar tarea"/></a></li>
                    <li><a href=""><img src="" alt="Añadir colaborador"/></a></li>
                    <li><a href=""><img src="" alt="Editar proyecto"/></a></li>
                    <li><a href=""><img src="" alt="Borrar proyecto"/></a></li>
                </ul>
            </nav>
        </>
    );
};

export default ProyectInfo;