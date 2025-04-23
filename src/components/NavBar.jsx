import React, { useState, useEffect } from 'react';

const NavBar = ({ activeItem, onSelect, minimizedWindows, onRestoreWindow }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

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
    { id: 'settings', label: 'Paramètres', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V4a2 2 0 0 0 2-2z"/><circle cx="12" cy="12" r="3"/></svg> }
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
                  // Dispatch event to minimize all windows
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

      <div className="navbar-center" style={{ display: 'flex', flex: 1 }}>
        <div className="taskbar-windows">
          {(minimizedWindows || []).map(window => window && (
            <div 
              key={window.id}
              className="taskbar-window"
              onClick={() => onRestoreWindow?.(window.id)}
              style={{ flexShrink: 0 }}
            >
              {window.icon}
              <span>{window.title}</span>
            </div>
          ))}
        </div>
      </div>
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