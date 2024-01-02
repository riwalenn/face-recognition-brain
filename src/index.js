import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App_';
import reportWebVitals from './reportWebVitals';
import 'tachyons';

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
reportWebVitals();
