import React from 'react';
import bee from "../assets/bee.png"
import Menu from "../components/EditMenuProject"

const ProyectInfo = () => {
    return (
        <div className='contenedor__info'>
            <header className='info__header'>
                <img className='header__image' src={bee} alt="Logo de WorkHive"/>
                <h1 className='header__titulo'>Nombre proyecto</h1>

                <ul className='header__lista'>
                    <li className='lista__titulo'>Listado miembros del equipo</li>
                    <li></li>
                    <li></li>
                </ul>
            </header>

            <section className='info__proyecto'>
                <div className='proyecto__descripcion'>
                    <h1 className='descripcion__titulo'>Descripción de proyecto</h1>
                    <p className='descripcion__parrafo'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam autem commodi consequatur delectus est excepturi itaque laudantium maxime, minima molestias nam nisi omnis perferendis, possimus soluta vel, vitae voluptate! Aliquid cum facilis laborum minima modi, non possimus vero. At cupiditate ipsam itaque quis reiciendis? Autem corporis, esse eveniet fugiat hic obcaecati quidem rem sequi temporibus unde.</p>
                </div>

                <div className='proyecto__fechas'>
                    <div className='fechas__descripcion'>
                        <p className='inicio__parrafo'><span>Fecha de inicio: </span>30/12/2024</p>
                    </div>

                    <div className='fechas__descripcion'>
                        <p className='inicio__parrafo'><span>Fecha de fin: </span>05/01/2025</p>
                    </div>
                </div>

                <div className='proyecto__administrador'>
                    <h1 className='administrador__titulo'>Administrador</h1>
                    <p className='administrador__nombre'>Paquito Rodríguez Benalmadena</p>
                </div>
            </section>

            <section className='contenedor__tareas'>
                <div className='tareas__todo'>
                    <h1 className='todo__titulo'>TO DO</h1>

                    <ul className='todo__lista'>
                        <li>Nombre tarea 1</li>
                        <li>Nombre tarea 2</li>
                        <li>Nombre tarea 3</li>
                        <li>Nombre tarea 4</li>
                    </ul>
                </div>

                <div className='tareas__inprogress'>
                    <h1 className='inprogress__titulo'>IN PROGRESS</h1>

                    <ul className='inprogress__lista'>
                        <li>Nombre tarea 1</li>
                        <li>Nombre tarea 2</li>
                    </ul>
                </div>

                <div className='tareas__toreview'>
                    <h1 className='toreview__titulo'>TO REVIEW</h1>

                    <ul className='toreview__lista'>
                        <li>Nombre tarea 1</li>
                        <li>Nombre tarea 2</li>
                        <li>Nombre tarea 3</li>
                    </ul>
                </div>

                <div className='tareas__done'>
                    <h1 className='done__titulo'>DONE</h1>

                    <ul className='done__lista'>
                        <li>Nombre tarea 1</li>
                        <li>Nombre tarea 2</li>
                    </ul>
                </div>
            </section>

            {/* <nav className='contenedor__menu'>
                <ul className='menu__lista'>
                    <li className='lista__opcion'><a href=""><img src="" alt="Agregar tarea"/></a></li>
                    <li className='lista__opcion'><a href=""><img src="" alt="Añadir colaborador"/></a></li>
                    <li className='lista__opcion'><a href=""><img src="" alt="Editar proyecto"/></a></li>
                    <li className='lista__opcion'><a href=""><img src="" alt="Borrar proyecto"/></a></li>
                </ul>
            </nav> */}
            <Menu />
        </div>
    );
};

export default ProyectInfo;