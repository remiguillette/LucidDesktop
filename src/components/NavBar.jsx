import React from 'react';

const NavBar = ({ items, activeItem, onSelect }) => {
  return (
    <nav className="navbar">
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
    </nav>
  );
};

export default NavBar;
