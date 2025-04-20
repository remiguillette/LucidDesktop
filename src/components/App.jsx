import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import NavBar from './NavBar';
import Desktop from './Desktop';
import Settings from './Settings';

const App = () => {
  const { t } = useTranslation();
  const [currentView, setCurrentView] = useState('desktop');

  // Navigation items for the bottom navbar
  const navItems = [
    { id: 'desktop', label: t('navbar.desktop'), icon: '🏠' },
    { id: 'files', label: t('navbar.files'), icon: '📁' },
    { id: 'apps', label: t('navbar.apps'), icon: '📱' },
    { id: 'settings', label: t('navbar.settings'), icon: '⚙️' }
  ];

  // Render the current view based on navigation selection
  const renderView = () => {
    switch (currentView) {
      case 'desktop':
        return <Desktop />;
      case 'files':
        return <div className="main-content">{t('views.files.title')}</div>;
      case 'apps':
        return <div className="main-content">{t('views.apps.title')}</div>;
      case 'settings':
        return <Settings />;
      default:
        return <Desktop />;
    }
  };

  return (
    <div className="app-container">
      {renderView()}
      <NavBar items={navItems} activeItem={currentView} onSelect={setCurrentView} />
    </div>
  );
};

export default App;
