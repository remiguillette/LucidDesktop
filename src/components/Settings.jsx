import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Settings = ({ onLogout, username }) => {
  const { t, i18n } = useTranslation();
  const [darkTheme, setDarkTheme] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoStart, setAutoStart] = useState(false);

  // Toggle theme function (in a real app, this would change the theme)
  const handleThemeToggle = () => {
    setDarkTheme(!darkTheme);
    // Implement theme change logic here
  };

  // Change language function
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="main-content">
      <div className="settings-container">
        <div className="settings-section">
          <h2 className="settings-title">{t('settings.user')}</h2>
          <div className="settings-user-info">
            <div className="settings-user-avatar">👤</div>
            <div className="settings-user-details">
              <div className="settings-username">{username}</div>
              <div className="settings-user-role">Administrateur</div>
            </div>
          </div>
          <div className="settings-option">
            <button className="settings-logout-button" onClick={onLogout}>
              {t('settings.logout')}
            </button>
          </div>
        </div>
        
        <div className="settings-section">
          <h2 className="settings-title">{t('settings.appearance')}</h2>
          
          <div className="settings-option">
            <span className="settings-label">{t('settings.darkTheme')}</span>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={darkTheme}
                onChange={handleThemeToggle}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          
          <div className="settings-option">
            <span className="settings-label">{t('settings.language')}</span>
            <select 
              value={i18n.language} 
              onChange={(e) => changeLanguage(e.target.value)}
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
        
        <div className="settings-section">
          <h2 className="settings-title">{t('settings.notifications')}</h2>
          <div className="settings-option">
            <span className="settings-label">{t('settings.enableNotifications')}</span>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
        
        <div className="settings-section">
          <h2 className="settings-title">{t('settings.system')}</h2>
          <div className="settings-option">
            <span className="settings-label">{t('settings.autoStart')}</span>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={autoStart}
                onChange={() => setAutoStart(!autoStart)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          
          <div className="settings-option">
            <span className="settings-label">{t('settings.about')}</span>
            <button>{t('settings.viewInfo')}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
