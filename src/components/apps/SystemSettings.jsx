
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const SystemSettings = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('account');

  const sections = [
    { id: 'account', icon: '👤' },
    { id: 'appearance', icon: '🎨' },
    { id: 'network', icon: '📡' },
    { id: 'users', icon: '👥' },
    { id: 'apps', icon: '📱' }
  ];

  return (
    <div className="system-settings">
      <div className="settings-sidebar">
        {sections.map(section => (
          <div
            key={section.id}
            className={`settings-nav-item ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => setActiveSection(section.id)}
          >
            <span className="settings-nav-icon">{section.icon}</span>
            <span className="settings-nav-text">
              {t(`systemSettings.sections.${section.id}`)}
            </span>
          </div>
        ))}
      </div>
      <div className="settings-content">
        <h2>{t(`systemSettings.sections.${activeSection}`)}</h2>
        <div className="settings-section-content">
          {/* Content will be added based on active section */}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
