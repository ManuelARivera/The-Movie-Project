import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './router.jsx'
import { AppContextProvider } from './context/AppContext.jsx';
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
