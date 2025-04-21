import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './i18n';
import './styles/global.css';

// Initialize the React application avec la nouvelle API React 18+
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
