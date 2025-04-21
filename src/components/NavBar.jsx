import React, { useState, useEffect } from 'react';

const NavBar = ({ items, activeItem, onSelect, username }) => {
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
  
  return (
    <nav className="navbar">
      <div className="navbar-left">
        {items.map(item => (
          <div
            key={item.id}
            className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => onSelect(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.label}</span>
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
