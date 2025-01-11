import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import LayoutPublic from "../layouts/LayoutPublic";
import LayoutPrivate from "../layouts/LayoutPrivate";
import Usuario from "../pages/Usuario.jsx";
import ContactUs from "../pages/ContactUs";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { lazy } from 'react'

// Lazy loading

const contactUs = lazy(() => import("../pages/ContactUs"));
const register = lazy(() => import("../pages/Register"));
const login = lazy(() => import("../pages/Login"));
const User = lazy(() => import("../pages/Usuario"));


/**
 * Manejo del enrutamiento de las páginas de la aplicación.
 * 
 * Este objeto define las rutas y sus componentes asociados, 
 * incluyendo rutas públicas y privadas, así como la gestión de errores.
 * 
 * @returns {Object} El objeto de enrutamiento creado por createBrowserRouter.
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
          path: "/login",
          element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
          path: "/usuario",
          element: <LayoutPrivate />,
          children: [
              {
                  index: true,
                  element: <Usuario />,
              },
          ],
        },
        {
          path: "/contactUs",
          element: <ContactUs />,
        },
        {
          path: "*", 
          element: <NotFound />, 
        },
      ],
    },
  ]);