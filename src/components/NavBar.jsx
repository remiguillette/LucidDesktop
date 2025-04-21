import React, { useState, useEffect } from 'react';

const NavBar = ({ items, activeItem, onSelect, username }) => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );
  
  // Mettre à jour l'heure chaque minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
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
          {currentTime}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
