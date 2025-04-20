import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const App = () => {
  const { t } = useTranslation();
  
  return (
    <div className="test-container">
      <h1>BeaverOS Test</h1>
      <p>{t('login.username')}</p>
      <img src="./assets/beaver.png" alt="BeaverOS Logo" width="100" />
    </div>
  );
};

export default App;
