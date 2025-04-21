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
    { id: 'calculator', name: t('desktop.calculator'), app: Calculator },
    { id: 'notepad', name: t('desktop.notepad'), app: Notepad },
    { id: 'tictactoe', name: t('desktop.tictactoe'), app: TicTacToe }
  ];

  // Open an application window
  const openApplication = (app) => {
    const appExists = desktopIcons.find(icon => icon.id === app);

    if (!appExists) {
      console.error(`Application ${app} not found`);
      return;
    }

    const windowId = `${app}-${Date.now()}`;

    setOpenWindows([
      ...openWindows,
      {
        id: windowId,
        appId: app,
        title: appExists.name,
        component: appExists.app
      }
    ]);
  };

  // Close an application window
  const closeWindow = (windowId) => {
    setOpenWindows(openWindows.filter(window => window.id !== windowId));
  };

  // Handle desktop icon click
  const handleIconClick = (iconId) => {
    console.log(`Opening ${iconId}`);
    openApplication(iconId);
  };

  return (
    <div className="desktop">
      {/* Desktop icons */}
      {desktopIcons.map((icon) => (
        <div 
          key={icon.id} 
          className="desktop-icon"
          onClick={() => handleIconClick(icon.id)}
        >
          <div className="desktop-icon-text">{icon.name}</div>
        </div>
      ))}

      {/* Open application windows */}
      {openWindows.map((window) => {
        const AppComponent = window.component;

        return AppComponent ? (
          <ApplicationWindow
            key={window.id}
            title={window.title}
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