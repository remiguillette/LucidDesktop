
import React from 'react';
import { useTranslation } from 'react-i18next';
import Desktop from './Desktop.jsx';
import NavBar from './NavBar.jsx';

const App = () => {
  const { t } = useTranslation();
  
  return (
    <div className="app-container">
      <Desktop />
      <NavBar />
    </div>
  );
};

export default App;
