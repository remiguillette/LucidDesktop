import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ApplicationWindow from './ApplicationWindow';
import Calculator from './apps/Calculator';
import Notepad from './apps/Notepad';
import TicTacToe from './apps/TicTacToe';
import { 
  Terminal, 
  Settings, 
  Globe, 
  FolderOpen, 
  Music, 
  Calendar, 
  Mail, 
  Calculator as CalculatorIcon, 
  FileEdit, 
  Gamepad2 
} from 'lucide-react';

const Desktop = () => {
  const { t } = useTranslation();
  const [openWindows, setOpenWindows] = useState([]);

  // Desktop icons configuration
  const desktopIcons = [
    { id: 'terminal', name: t('desktop.terminal'), icon: <Terminal size={24} color="#f89422" /> },
    { id: 'settings', name: t('desktop.settings'), icon: <Settings size={24} color="#f89422" /> },
    { id: 'browser', name: t('desktop.browser'), icon: <Globe size={24} color="#f89422" /> },
    { id: 'files', name: t('desktop.files'), icon: <FolderOpen size={24} color="#f89422" /> },
    { id: 'music', name: t('desktop.music'), icon: <Music size={24} color="#f89422" /> },
    { id: 'calendar', name: t('desktop.calendar'), icon: <Calendar size={24} color="#f89422" /> },
    { id: 'mail', name: t('desktop.mail'), icon: <Mail size={24} color="#f89422" /> },
    { id: 'calculator', name: t('desktop.calculator'), icon: <CalculatorIcon size={24} color="#f89422" />, app: Calculator },
    { id: 'notepad', name: t('desktop.notepad'), icon: <FileEdit size={24} color="#f89422" />, app: Notepad },
    { id: 'tictactoe', name: t('desktop.tictactoe'), icon: <Gamepad2 size={24} color="#f89422" />, app: TicTacToe }
  ];

  // Ouvrir une fenêtre d'application
  const openApplication = (app) => {
    const appExists = desktopIcons.find(icon => icon.id === app);
    
    if (!appExists) {
      console.error(`Application ${app} not found`);
      return;
    }
    
    // Générer un ID unique pour cette instance de fenêtre
    const windowId = `${app}-${Date.now()}`;
    
    // Ajouter la fenêtre à l'état
    setOpenWindows([
      ...openWindows,
      {
        id: windowId,
        appId: app,
        title: appExists.name,
        icon: appExists.icon,
        component: appExists.app
      }
    ]);
  };

  // Fermer une fenêtre d'application
  const closeWindow = (windowId) => {
    setOpenWindows(openWindows.filter(window => window.id !== windowId));
  };

  // Gestion du clic sur une icône du bureau
  const handleIconClick = (iconId) => {
    console.log(`Opening ${iconId}`);
    openApplication(iconId);
  };

  return (
    <div className="desktop">
      {/* Icônes du bureau */}
      {desktopIcons.map((icon) => (
        <div 
          key={icon.id} 
          className="desktop-icon"
          onClick={() => handleIconClick(icon.id)}
        >
          <div className="desktop-icon-img">{icon.icon}</div>
          <div className="desktop-icon-text">{icon.name}</div>
        </div>
      ))}
      
      {/* Fenêtres d'applications ouvertes */}
      {openWindows.map((window) => {
        const AppComponent = window.component;
        
        return AppComponent ? (
          <ApplicationWindow
            key={window.id}
            title={window.title}
            icon={window.icon}
            onClose={() => closeWindow(window.id)}
            initialPosition={{ x: 100 + (openWindows.indexOf(window) * 30), y: 50 + (openWindows.indexOf(window) * 30) }}
            initialSize={{ width: 600, height: 400 }}
          >
            <AppComponent />
          </ApplicationWindow>
        ) : null;
      })}
    </div>
  );
};

export default Desktop;
