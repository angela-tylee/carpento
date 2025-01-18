import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/scss/all.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import {
  // BrowserRouter,
  HashRouter
} from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { StickyHeaderProvider } from './context/StickyHeaderContext';
import { MessageProvider } from './context/MessageContext';

axios.defaults.baseURL = process.env.REACT_APP_API_URL; // 預設 axios base URL，之後就不用重複寫


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <MessageProvider>
        <StickyHeaderProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </StickyHeaderProvider>
      </MessageProvider>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
