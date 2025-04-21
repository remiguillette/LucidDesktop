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

  const handleIconClick = (iconId) => {
    const icon = desktopIcons.find(i => i.id === iconId);
    if (icon && icon.app) {
      setOpenWindows(prev => [...prev, {
        id: `${iconId}-${Date.now()}`,
        title: icon.name,
        icon: icon.icon,
        component: icon.app
      }]);
    }
  };

  const closeWindow = (windowId) => {
    setOpenWindows(prev => prev.filter(window => window.id !== windowId));
  };

  return (
    <div className="desktop">
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