import React from 'react';
import bee from "../assets/bee.png"
import MenuTask from "../components/TaskMenuEdit"

const TaskInfo = () => {
    return (
        <div className='contenedor__info'>
            <header className='info__header'>
                <img className='header__image' src={bee} alt="Logo de WorkHive"/>
                <h1 className='header__titulo'>Nombre tarea</h1>
                <MenuTask />
                <select className='header__estado' name="estado" id="estado">
                    <option value="todo">To Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="toreview">To review</option>
                    <option value="done">Done</option>
                </select>
                <select className='header__prioridad' name="prioridad" id="prioridad">
                    <option value="alta">Alta</option>
                    <option value="media">Media</option>
                    <option value="baja">Baja</option>
                </select>
            </header>

            <section className='info__proyecto'>
                <div className='proyecto__descripcion'>
                    <h1 className='descripcion__titulo'>DESCRIPCIÓN DE TAREA</h1>
                    <p className='descripcion__parrafo'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium, aliquam aperiam aut cum cumque debitis dicta, dolor ea eos eveniet maxime natus odio placeat repellat repudiandae sunt unde voluptate! Aspernatur quam quasi quidem quod, recusandae sequi tempora ullam ut. Accusantium autem cupiditate, dolor doloremque, enim, et excepturi expedita harum iste maxime nesciunt nobis odio perferendis placeat possimus reprehenderit voluptas!</p>
                </div>

                <div className='proyecto__fechas'>
                    <p className='fechas__parrafo'><span>Fecha límite: </span>05/01/2025</p>
                </div>

                <div className='proyecto__administrador'>
                    <h1 className='administrador__titulo'>Asignado a:</h1>
                    <p className='administrador__nombre'>David Pérez Romero</p>
                </div>
            </section>

            <section className='contenedor__comentarios'>
                <h1 className='comentarios__titulo'>COMENTARIOS</h1>

                <ul className='comentarios__lista'>
                    <li>
                        <article>
                            <h1>AITANA</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi autem commodi debitis, dolorem earum et eum impedit in minus mollitia nostrum, obcaecati pariatur quasi qui, quisquam quo ullam veritatis voluptatum!</p>
                            <p>06/01/2025</p>
                        </article>

                        <article>
                            <h1>ÁNGEL</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa ducimus ea hic illo in iusto, maxime nemo quibusdam ratione sequi. Nobis totam, veritatis. Accusantium aliquid beatae nam provident sit voluptatibus?</p>
                            <p>24/12/2025</p>
                        </article>

                        <article>
                            <h1></h1>
                            <p></p>
                            <p></p>
                        </article>

                        <article>
                            <h1></h1>
                            <p></p>
                            <p></p>
                        </article>

                        <article>
                            <h1></h1>
                            <p></p>
                            <p></p>
                        </article>

                        <article>
                            <p>AGREGAR COMENTARIO</p>
                            <a href=""><img src="" alt="Agregar comentario"/></a>
                        </article>
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default TaskInfo;