import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NavBar from './NavBar';
import Desktop from './Desktop';
import Settings from './Settings';
import Login from './Login';

const App = () => {
  const { t } = useTranslation();
  const [currentView, setCurrentView] = useState('desktop');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    // Simuler un chargement initial
    const timer = setTimeout(() => {
      const savedUsername = localStorage.getItem('beaveros-username');
      if (savedUsername) {
        setUsername(savedUsername);
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Gérer la connexion utilisateur
  const handleLogin = (username) => {
    localStorage.setItem('beaveros-username', username);
    setUsername(username);
    setIsLoggedIn(true);
  };

  // Gérer la déconnexion utilisateur
  const handleLogout = () => {
    localStorage.removeItem('beaveros-username');
    setUsername('');
    setIsLoggedIn(false);
    setCurrentView('desktop');
  };

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
        return <Settings onLogout={handleLogout} username={username} />;
      default:
        return <Desktop />;
    }
  };

  // Afficher un écran de chargement
  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-container">
          <img src="./assets/logo.svg" alt="BeaverOS Logo" className="loading-logo" />
          <div className="loading-spinner"></div>
          <div className="loading-text">BeaverOS</div>
        </div>
      </div>
    );
  }

  // Afficher l'écran de connexion si l'utilisateur n'est pas connecté
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // Afficher l'interface principale si l'utilisateur est connecté
  return (
    <div className="app-container">
      {renderView()}
      <NavBar 
        items={navItems} 
        activeItem={currentView} 
        onSelect={setCurrentView} 
        username={username}
      />
    </div>
  );
};

export default App;
