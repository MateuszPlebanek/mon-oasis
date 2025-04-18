import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { CartProvider } from './contexts/CartProvider'
import { FavoriteProvider } from './contexts/FavoriteProvider'
import { SearchProvider } from './contexts/SearchContext'
import { UserProvider } from './contexts/UserProvider'

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <UserProvider> 
          <CartProvider>
            <FavoriteProvider>
              <SearchProvider>
                <App />
              </SearchProvider>
            </FavoriteProvider>
          </CartProvider>
        </UserProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}