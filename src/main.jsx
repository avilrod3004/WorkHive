import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/index'

import './sass/main.scss';

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
