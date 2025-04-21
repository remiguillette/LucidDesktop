import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ApplicationWindow from './ApplicationWindow';
import Calculator from './apps/Calculator';
import Notepad from './apps/Notepad';
import TicTacToe from './apps/TicTacToe';

const Desktop = () => {
  const { t } = useTranslation();
  const [openWindows, setOpenWindows] = useState([]);

  // Desktop icons configuration
  const desktopIcons = [
    { id: 'terminal', name: t('desktop.terminal'), icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg> },
    { id: 'settings', name: t('desktop.settings'), icon: '⚙️' },
    { id: 'browser', name: t('desktop.browser'), icon: '🌐' },
    { id: 'files', name: t('desktop.files'), icon: '📁' },
    { id: 'music', name: t('desktop.music'), icon: '🎵' },
    { id: 'calendar', name: t('desktop.calendar'), icon: '📅' },
    { id: 'mail', name: t('desktop.mail'), icon: '✉️' },
    { id: 'calculator', name: t('desktop.calculator'), icon: '🧮', app: Calculator },
    { id: 'notepad', name: t('desktop.notepad'), icon: '📝', app: Notepad },
    { id: 'tictactoe', name: t('desktop.tictactoe'), icon: '🎮', app: TicTacToe }
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
      {openWindows.map((window, index) => (
        <ApplicationWindow 
          key={window.id} 
          {...window} 
          onClose={() => closeWindow(window.id)}
        />
      ))}
    </div>
  );
};

export default Desktop;