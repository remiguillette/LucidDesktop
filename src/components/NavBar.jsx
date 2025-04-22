
import React, { useState, useEffect } from 'react';

const NavBar = ({ activeItem, onSelect }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeWindows, setActiveWindows] = useState([]);
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0, windowId: null });

  useEffect(() => {
    const handleWindowOpen = (event) => {
      const { id, label, icon } = event.detail;
      setActiveWindows(prev => [...prev, { id: `${id}-${Date.now()}`, label, icon, minimized: false }]);
    };

    const handleWindowClose = (event) => {
      const { windowId } = event.detail;
      setActiveWindows(prev => prev.filter(w => w.id !== windowId));
    };

    const handleWindowMinimize = (event) => {
      const { windowId } = event.detail;
      setActiveWindows(prev => prev.map(w => 
        w.id === windowId ? { ...w, minimized: true } : w
      ));
    };

    window.addEventListener('openApp', handleWindowOpen);
    window.addEventListener('closeWindow', handleWindowClose);
    window.addEventListener('minimizeWindow', handleWindowMinimize);

    return () => {
      window.removeEventListener('openApp', handleWindowOpen);
      window.removeEventListener('closeWindow', handleWindowClose);
      window.removeEventListener('minimizeWindow', handleWindowMinimize);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString('fr-CA', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'America/Toronto'
  });

  const dateString = currentTime.toLocaleDateString('fr-CA', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  const navItems = [
    { id: 'minimize', label: 'Bureau', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg> },
    { 
      id: 'grid', 
      label: 'Grid', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>,
      submenu: (
        <div className="submenu">
          <div className="submenu-item">
            <span className="nav-icon">📋</span>
            <span>Nouvelle grille</span>
          </div>
          <div className="submenu-item">
            <span className="nav-icon">🔍</span>
            <span>Rechercher</span>
          </div>
          <div className="submenu-item">
            <span className="nav-icon">⚙️</span>
            <span>Paramètres</span>
          </div>
        </div>
      )
    },
    { id: 'settings', label: 'Paramètres', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg> }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {navItems.map(item => (
          <div 
            key={item.id} 
            className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => {
              if (!item.submenu) {
                onSelect(item.id);
                if (item.id === 'minimize') {
                  window.dispatchEvent(new CustomEvent('minimizeAll'));
                } else {
                  window.dispatchEvent(new CustomEvent('openApp', { 
                    detail: { 
                      id: item.id,
                      label: item.label,
                      icon: item.icon 
                    }
                  }));
                }
              }
            }}
          >
            {item.submenu}
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="navbar-windows">
        {activeWindows.map(window => (
          <div
            key={window.id}
            className={`window-item ${window.minimized ? 'minimized' : 'active'}`}
            onClick={() => {
              if (window.minimized) {
                window.dispatchEvent(new CustomEvent('restoreWindow', { 
                  detail: { windowId: window.id }
                }));
                setActiveWindows(prev => prev.map(w => 
                  w.id === window.id ? { ...w, minimized: false } : w
                ));
              } else {
                window.dispatchEvent(new CustomEvent('minimizeWindow', { 
                  detail: { windowId: window.id }
                }));
              }
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              setContextMenu({
                show: true,
                x: e.clientX,
                y: e.clientY,
                windowId: window.id
              });
            }}
          >
            <span className="window-icon">{window.icon}</span>
            <span className="window-label">{window.label}</span>
          </div>
        ))}
      </div>

      {contextMenu.show && (
        <div 
          className="window-context-menu"
          style={{ 
            position: 'fixed',
            top: `${contextMenu.y}px`,
            left: `${contextMenu.x}px`
          }}
        >
          <div 
            className="context-menu-item"
            onClick={() => {
              const window = activeWindows.find(w => w.id === contextMenu.windowId);
              if (window?.minimized) {
                window.dispatchEvent(new CustomEvent('restoreWindow', { 
                  detail: { windowId: contextMenu.windowId }
                }));
                setActiveWindows(prev => prev.map(w => 
                  w.id === contextMenu.windowId ? { ...w, minimized: false } : w
                ));
              } else {
                window.dispatchEvent(new CustomEvent('minimizeWindow', { 
                  detail: { windowId: contextMenu.windowId }
                }));
              }
              setContextMenu({ show: false, x: 0, y: 0, windowId: null });
            }}
          >
            {activeWindows.find(w => w.id === contextMenu.windowId)?.minimized ? 'Restore' : 'Minimize'}
          </div>
          <div 
            className="context-menu-item"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('closeWindow', { 
                detail: { windowId: contextMenu.windowId }
              }));
              setContextMenu({ show: false, x: 0, y: 0, windowId: null });
            }}
          >
            Close
          </div>
        </div>
      )}

      <div className="navbar-right">
        <div className="nav-clock">
          <div>{dateString}</div>
          <div>{timeString}</div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
