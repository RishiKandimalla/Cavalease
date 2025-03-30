import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import AppRouter from './AppRouter';
import './index.css'
import { UserProvider } from './UserContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <UserProvider>
    <AppRouter />
    </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)