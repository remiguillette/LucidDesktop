
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Browser = () => {
  const { t } = useTranslation();
  const [url, setUrl] = useState('https://www.google.com');

  const handleNavigate = (e) => {
    e.preventDefault();
    // Using our NW.js polyfill's Shell.openExternal
    if (window.nw && window.nw.Shell) {
      window.nw.Shell.openExternal(url);
    } else {
      // Fallback for development environment
      window.open(url, '_blank');
    }
  };

  return (
    <div className="browser-container">
      <form onSubmit={handleNavigate} className="browser-form">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          className="browser-input"
        />
        <button type="submit" className="browser-button">
          {t('apps.browser.navigate')}
        </button>
      </form>
    </div>
  );
};

export default Browser;
