import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/index'
import { ThemeProvider } from './context/ThemeContext';

import './scss/main.scss';

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
      <RouterProvider router={router} />
  </ThemeProvider>
)
