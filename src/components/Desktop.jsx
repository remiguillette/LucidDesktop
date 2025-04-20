import React from 'react';
import { useTranslation } from 'react-i18next';

const Desktop = () => {
  const { t } = useTranslation();

  // Desktop icons configuration
  const desktopIcons = [
    { id: 'terminal', name: t('desktop.terminal'), icon: '🖥️' },
    { id: 'settings', name: t('desktop.settings'), icon: '⚙️' },
    { id: 'browser', name: t('desktop.browser'), icon: '🌐' },
    { id: 'files', name: t('desktop.files'), icon: '📁' },
    { id: 'music', name: t('desktop.music'), icon: '🎵' },
    { id: 'calendar', name: t('desktop.calendar'), icon: '📅' },
    { id: 'mail', name: t('desktop.mail'), icon: '✉️' },
    { id: 'calculator', name: t('desktop.calculator'), icon: '🧮' }
  ];

  const handleIconClick = (iconId) => {
    console.log(`Opening ${iconId}`);
    // Here you would implement the logic to open applications
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
    </div>
  );
};

export default Desktop;
