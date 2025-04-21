
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const SystemSettings = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('account');

  const sections = [
    { id: 'account', icon: '👤', label: t('settings.sections.account') },
    { id: 'appearance', icon: '🎨', label: t('settings.sections.appearance') },
    { id: 'network', icon: '🌐', label: t('settings.sections.network') },
    { id: 'users', icon: '👥', label: t('settings.sections.users') },
    { id: 'apps', icon: '📱', label: t('settings.sections.apps') }
  ];

  return (
    <div className="system-settings">
      <div className="settings-sidebar">
        {sections.map(section => (
          <div
            key={section.id}
            className={`settings-sidebar-item ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => setActiveSection(section.id)}
          >
            <span className="settings-sidebar-icon">{section.icon}</span>
            <span className="settings-sidebar-label">{section.label}</span>
          </div>
        ))}
      </div>
      <div className="settings-content">
        <h2>{sections.find(s => s.id === activeSection)?.label}</h2>
        <div className="settings-panel">
          {/* Content will be added based on active section */}
          {activeSection === 'account' && (
            <div className="settings-section">
              <h3>{t('settings.account.title')}</h3>
              {/* Account settings content */}
            </div>
          )}
          {/* Add other sections similarly */}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
