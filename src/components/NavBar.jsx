import React, { useState, useEffect } from 'react';

const NavBar = ({ activeItem, onSelect, username }) => {
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
    { id: 'apps', label: 'Applications', icon: '📱', submenu: [
      { id: 'desktop', label: 'Bureau', icon: '🏠' },
      { id: 'settings', label: 'Paramètres', icon: '⚙️' },
      { id: 'calculator', label: 'Calculatrice', icon: '🔢' },
      { id: 'notepad', label: 'Bloc-notes', icon: '📝' },
      { id: 'browser', label: 'Navigateur', icon: '🌐' },
      { id: 'mail', label: 'Courrier', icon: '✉️' },
      { id: 'calendar', label: 'Calendrier', icon: '📅' },
      { id: 'files', label: 'Fichiers', icon: '📁' },
      { id: 'trash', label: 'Corbeille', icon: '🗑️' }
    ]}
  ];


  return (
    <nav className="navbar">
      <div className="navbar-left">
        {navItems.map(item => (
          <div 
            key={item.id} 
            className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => onSelect(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.label}</span>
            {item.submenu && (
              <div className="submenu">
                {item.submenu.map(subItem => (
                  <div 
                    key={subItem.id} 
                    className={`submenu-item ${activeItem === subItem.id ? 'active' : ''}`} 
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(subItem.id);
                      const appId = subItem.id;
                      window.dispatchEvent(new CustomEvent('openApp', { 
                        detail: { 
                          id: appId,
                          label: subItem.label,
                          icon: subItem.icon 
                        }
                      }));
                    }}
                  >
                    <span className="nav-icon">{subItem.icon}</span>
                    <span className="nav-text">{subItem.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="navbar-right">
        {username && (
          <div className="nav-user">
            <span className="nav-user-icon">👤</span>
            <span className="nav-user-name">{username}</span>
          </div>
        )}
        <div className="nav-clock">
          <div>{dateString}</div>
          <div>{timeString}</div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;