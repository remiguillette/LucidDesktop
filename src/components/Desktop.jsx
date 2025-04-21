import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ApplicationWindow from './ApplicationWindow';
import Calculator from './apps/Calculator';
import Notepad from './apps/Notepad';
import Browser from './apps/Browser';


const Desktop = () => {
  const { t } = useTranslation();
  const [openWindows, setOpenWindows] = useState([]);

  // Desktop icons configuration
  const desktopIcons = [
    { id: 'terminal', name: t('desktop.terminal'), icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg> },
    { id: 'settings', name: t('desktop.settings'), icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 17v4"/><path d="m14.305 7.53.923-.382"/><path d="m15.228 4.852-.923-.383"/><path d="m16.852 3.228-.383-.924"/><path d="m16.852 8.772-.383.923"/><path d="m19.148 3.228.383-.924"/><path d="m19.53 9.696-.382-.924"/><path d="m20.772 4.852.924-.383"/><path d="m20.772 7.148.924.383"/><path d="M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><path d="M8 21h8"/><circle cx="18" cy="6" r="3"/></svg> },
    { id: 'browser', name: t('desktop.browser'), icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" x2="12" y1="8" y2="8"/><line x1="3.95" x2="8.54" y1="6.06" y2="14"/><line x1="10.88" x2="15.46" y1="21.94" y2="14"/></svg>, app: Browser },
    { id: 'files', name: t('desktop.files'), icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg> },
    { id: 'calendar', name: t('desktop.calendar'), icon: '📅' },
    { id: 'mail', name: t('desktop.mail'), icon: '✉️' },
    { id: 'calculator', name: t('desktop.calculator'), icon: '🧮', app: Calculator },
    { id: 'notepad', name: t('desktop.notepad'), icon: '📝', app: Notepad }
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
          title={window.title}
          icon={window.icon}
          onClose={() => closeWindow(window.id)}
        >
          {window.component && <window.component />}
        </ApplicationWindow>
      ))}
    </div>
  );
};

export default Desktop;