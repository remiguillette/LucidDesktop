
import React from 'react';
import { useTranslation } from 'react-i18next';
import Desktop from './Desktop';
import NavBar from './NavBar';

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
