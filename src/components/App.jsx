
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NavBar from './NavBar';
import Desktop from './Desktop';
import Settings from './Settings';
import Login from './Login';
import userService from '../services/userService';

const App = () => {
  const { t } = useTranslation();
  const [currentView, setCurrentView] = useState('desktop');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const user = userService.getLoggedInUser();
      if (user) {
        setCurrentUser(user);
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (user) => {
    userService.saveLoggedInUser(user);
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    userService.clearUserSession();
    setCurrentUser(null);
    setIsLoggedIn(false);
    setCurrentView('desktop');
  };

  const navItems = [
    { id: 'desktop', label: t('navbar.desktop') },
    { id: 'files', label: t('navbar.files') },
    { id: 'apps', label: t('navbar.apps') },
    { id: 'settings', label: t('navbar.settings') }
  ];

  const renderView = () => {
    switch (currentView) {
      case 'desktop':
        return <Desktop />;
      case 'files':
        return <div className="main-content">{t('views.files.title')}</div>;
      case 'apps':
        return <div className="main-content">{t('views.apps.title')}</div>;
      case 'settings':
        return <Settings onLogout={handleLogout} username={currentUser?.displayName || currentUser?.username} />;
      default:
        return <Desktop />;
    }
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-container">
          <img src="./assets/beaver.png" alt="BeaverOS Logo" className="loading-logo" />
          <div className="loading-spinner"></div>
          <div className="loading-text">BeaverOS</div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      {renderView()}
      <NavBar 
        items={navItems} 
        activeItem={currentView} 
        onSelect={setCurrentView} 
        username={currentUser?.displayName || currentUser?.username}
      />
    </div>
  );
};

export default App;
