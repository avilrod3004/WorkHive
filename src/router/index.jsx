/**
 * @module Router
 * @category Navigation
 */

import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import LayoutPublic from "../layouts/LayoutPublic";
import LayoutPrivate from "../layouts/LayoutPrivate";
import LayoutAuth from "../layouts/LayoutAuth";
import NotFound from "../pages/NotFound";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading";

// Lazy loading

const ContactUs = lazy(() => import("../pages/ContactUs"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));
const User = lazy(() => import("../pages/UserProfile"));
const ProyectInfo = lazy(() => import("../pages/ProyectInfo"));
const TaskInfo = lazy(() => import("../pages/TaskInfo"));

/**
 * @router
 * Manejo del enrutamiento de las páginas de la aplicación.
 *
 * Este objeto define las rutas y sus componentes asociados,
 * incluyendo rutas públicas y privadas, así como la gestión de errores.
 *
 * @returns {Object} El objeto de enrutamiento creado por createBrowserRouter, con la ruta a cada página de la aplicación.
 */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPublic />,
    errorElement: <NotFound />,
    //  aquí se muestran los hijos de la ruta indicada, lo que ira en outlet de layout, siendo inicio la raíz
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/contactUs",
        element: (
          <Suspense fallback={<Loading />}>
            <ContactUs />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/auth",
    element: <LayoutAuth />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/auth/login",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/auth/register",
        element: (
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/usuario",
    element: <LayoutPrivate />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <User />
          </Suspense>
        ),
      },
      {
        path: "/usuario/tablero/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ProyectInfo />
          </Suspense>
        ),
      },
      {
        path: "/usuario/tablero/:idTablero/tarea/:idTarea",
        element: (
          <Suspense fallback={<Loading />}>
            <TaskInfo />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
