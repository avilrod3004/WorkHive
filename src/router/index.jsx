import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import LayoutPublic from "../layouts/LayoutPublic";
import LayoutPrivate from "../layouts/LayoutPrivate";
import NotFound from "../pages/NotFound";
import { lazy, Suspense } from "react";

// Lazy loading

const ContactUs = lazy(() => import("../pages/ContactUs"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));
const User = lazy(() => import("../pages/UserProfile"));

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
        element: (
          <Suspense fallback={<div>Loading Login...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<div>Loading Register...</div>}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "/contactUs",
        element: (
          <Suspense fallback={<div>Loading Contact Us...</div>}>
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
    path: "/usuario",
    element: <LayoutPrivate />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading User Profile...</div>}>
            <User />
          </Suspense>
        ),
      },
    ],
  },
]);
