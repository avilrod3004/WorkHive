import React from 'react';

const TaskInfo = () => {
    return (
        <>
            <header>
                <img src="" alt="Logo WorkHive"/>

                <nav>
                    <ul>
                        <li><a href=""><img src="" alt="Editar tarea"/></a></li>
                        <li><a href=""><img src="" alt="Eliminar tarea"/></a></li>
                    </ul>
                </nav>

                <aside>
                    <p><span>ESTADO: </span>En proceso</p>
                    <p><span>PRIORIDAD: </span>Alta</p>
                </aside>
            </header>

            <section>
                <div>
                    <h1>DESCRIPCIÓN DE TAREA</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium, aliquam aperiam aut cum cumque debitis dicta, dolor ea eos eveniet maxime natus odio placeat repellat repudiandae sunt unde voluptate! Aspernatur quam quasi quidem quod, recusandae sequi tempora ullam ut. Accusantium autem cupiditate, dolor doloremque, enim, et excepturi expedita harum iste maxime nesciunt nobis odio perferendis placeat possimus reprehenderit voluptas!</p>
                </div>

                <div>
                    <p><span>Fecha límite: </span>05/01/2025</p>
                </div>

                <div>
                    <p><span>ASIGNADO A: </span>David Pérez Romero</p>
                </div>
            </section>

            <section>
                <h1>COMENTARIOS</h1>

                <ul>
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
        </>
    );
};

export default TaskInfo;