import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ApplicationWindow from './ApplicationWindow';
import Calculator from './apps/Calculator';
import Notepad from './apps/Notepad';
import Browser from './apps/Browser';
import Mail from './apps/Mail';
import FileExplorer from './apps/FileExplorer';
import Calendar from './apps/Calendar';
import Trash from './apps/Trash';
import SystemSettings from './apps/SystemSettings';

const Desktop = () => {
  const { t } = useTranslation();
  const [openWindows, setOpenWindows] = useState([]);
  const [minimizedWindows, setMinimizedWindows] = useState([]);

  const restoreWindow = (windowId) => {
  const windowToRestore = minimizedWindows.find(window => window.id === windowId);
  if (windowToRestore) {
    setOpenWindows([...openWindows, windowToRestore]);
    setMinimizedWindows(minimizedWindows.filter(window => window.id !== windowId));
  }
};
  const [showIcons, setShowIcons] = useState(true);
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleClick = () => {
    setContextMenu({ show: false, x: 0, y: 0 });
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    const handleOpenApp = (event) => {
      const { id, label, icon } = event.detail;
      openApplication(id);
    };

    const handleMinimizeAll = () => {
      setOpenWindows([]);
    };

    window.addEventListener('openApp', handleOpenApp);
    window.addEventListener('minimizeAll', handleMinimizeAll);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('openApp', handleOpenApp);
      window.removeEventListener('minimizeAll', handleMinimizeAll);
    };
  }, []);

  const desktopIcons = [
    { id: 'settings', name: t('desktop.settings'), icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>, app: SystemSettings },
    { id: 'trash', name: t('desktop.trash'), icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>, app: Trash },
    { id: 'terminal', name: t('desktop.terminal'), icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg> },
    { id: 'browser', name: t('desktop.browser'), icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" x2="12" y1="8" y2="8"/><line x1="3.95" x2="8.54" y1="6.06" y2="14"/><line x1="10.88" x2="15.46" y1="21.94" y2="14"/></svg>, app: Browser },
    { id: 'mail', name: t('desktop.mail'), icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>, app: Mail },
    { id: 'files', name: t('desktop.files'), icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></svg>, app: FileExplorer },
    { id: 'calendar', name: t('desktop.calendar'), icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>, app: Calendar },
    { id: 'calculator', name: t('desktop.calculator'), icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>, app: Calculator },
    { id: 'notepad', name: t('desktop.notepad'), icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18H3"/><path d="M17 6H3"/><path d="M21 12H3"/></svg>, app: Notepad }
  ];

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
        icon: appExists.icon,
        component: appExists.app
      }
    ]);
  };

  const closeWindow = (windowId) => {
    setOpenWindows(openWindows.filter(window => window.id !== windowId));
    setMinimizedWindows(minimizedWindows.filter(window => window.id !== windowId));
  };

  const minimizeWindow = (windowId) => {
    const windowToMinimize = openWindows.find(window => window.id === windowId);
    if (windowToMinimize) {
      setOpenWindows(openWindows.filter(window => window.id !== windowId));
      window.dispatchEvent(new CustomEvent('minimizeWindow', { 
        detail: { window: windowToMinimize }
      }));
    }
  };

  const handleIconClick = (iconId) => {
    const appMap = {
      'minimize': () => setOpenWindows([]),
      'files': 'files', 
      'settings': 'settings',
      'calculator': 'calculator',
      'notepad': 'notepad', 
      'browser': 'browser',
      'mail': 'mail',
      'calendar': 'calendar',
      'trash': 'trash'
    };

    if (typeof appMap[iconId] === 'function') {
      appMap[iconId]();
    } else {
      const appId = appMap[iconId] || iconId;
      openApplication(appId);
    }
  };

  useEffect(() => {
    const handleOpenApp = (event) => {
      const { id } = event.detail;
      if (id === 'settings') {
        openApplication('settings');
      }
    };

    document.addEventListener('openApp', handleOpenApp);
    return () => {
      document.removeEventListener('openApp', handleOpenApp);
    };
  }, []);

  return (
    <div className="desktop" onContextMenu={handleContextMenu}>
      {contextMenu.show && (
        <div 
          className="context-menu"
          style={{ 
            position: 'fixed',
            top: `${contextMenu.y}px`,
            left: `${contextMenu.x}px`
          }}
        >
          <div 
            className="context-menu-item"
            onClick={() => setShowIcons(!showIcons)}
          >
            {showIcons ? t('desktop.hideIcons') : t('desktop.showIcons')}
          </div>
        </div>
      )}

      {showIcons && desktopIcons.map((icon) => (
        <div
          key={icon.id}
          className="desktop-icon"
          onClick={() => handleIconClick(icon.id)}
        >
          <div className="desktop-icon-img">{icon.icon}</div>
          <div className="desktop-icon-text">{icon.name}</div>
        </div>
      ))}

      {openWindows.map((window) => (
        <ApplicationWindow 
          key={window.id}
          title={window.title}
          icon={window.icon}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
        >
          {window.component && <window.component key={window.id} />}
        </ApplicationWindow>
      ))}
    </div>
  );
};

export default Desktop;