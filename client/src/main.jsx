import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/route.jsx'
import { AppContextProvider } from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <RouterProvider router={router} />
  </AppContextProvider>
)
