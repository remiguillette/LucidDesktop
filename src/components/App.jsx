import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NavBar from './NavBar';
import Desktop from './Desktop';
import SettingsView from './Settings';
import Login from './Login';
import userService from '../services/userService';
import { Home, FolderOpen, Apps, Settings as SettingsIcon } from 'lucide-react';

const App = () => {
  const { t } = useTranslation();
  const [currentView, setCurrentView] = useState('desktop');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    // Simuler un chargement initial
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

  // Gérer la connexion utilisateur
  const handleLogin = (user) => {
    userService.saveLoggedInUser(user);
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  // Gérer la déconnexion utilisateur
  const handleLogout = () => {
    userService.clearUserSession();
    setCurrentUser(null);
    setIsLoggedIn(false);
    setCurrentView('desktop');
  };

  // Navigation items for the bottom navbar
  const navItems = [
    { id: 'desktop', label: t('navbar.desktop'), icon: <Home size={24} color="#f89422" /> },
    { id: 'files', label: t('navbar.files'), icon: <FolderOpen size={24} color="#f89422" /> },
    { id: 'apps', label: t('navbar.apps'), icon: <Apps size={24} color="#f89422" /> },
    { id: 'settings', label: t('navbar.settings'), icon: <SettingsIcon size={24} color="#f89422" /> }
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
        return <SettingsView onLogout={handleLogout} username={currentUser?.displayName || currentUser?.username} />;
      default:
        return <Desktop />;
    }
  };

  // Afficher un écran de chargement
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
        username={currentUser?.displayName || currentUser?.username}
      />
    </div>
  );
};

export default App;
