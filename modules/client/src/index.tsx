/* =============================================
                    Imports
============================================= */
// Packages
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from 'reportWebVitals';
// Types
// Components
import App from 'App';
// Environment
// Styles
import 'index.css';
// States
/* =============================================
                    Utils
============================================= */
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
/* =============================================
                    Main
============================================= */
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
reportWebVitals();
