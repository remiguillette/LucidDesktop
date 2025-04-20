import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './i18n';
import './styles/global.css';

// Initialize the React application
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
