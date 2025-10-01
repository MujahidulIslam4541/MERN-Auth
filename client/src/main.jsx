import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/route.jsx'
import { AppContextProvider } from './context/AppContext.jsx'
import  { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <RouterProvider router={router} />
    <Toaster/>
  </AppContextProvider>
)
