import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
const { exec } = window.require('child_process');

const Browser = () => {
  const { t } = useTranslation();
  const [url, setUrl] = useState('https://www.google.com');
  const [error, setError] = useState('');

  const handleNavigate = (e) => {
    e.preventDefault();

    try {
      new URL(url);
      exec(`xdg-open "${url}"`, (err) => {
        if (err) {
          console.error('Failed to open browser:', err);
          setError('Failed to open browser');
        }
      });
    } catch {
      setError('Invalid URL format');
    }
  };

  return (
    <div className="browser-container">
      <form onSubmit={handleNavigate} className="browser-form">
        <input
          type="url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setError('');
          }}
          placeholder="Enter URL"
          className="browser-input"
        />
        <button type="submit" className="browser-button">
          {t('apps.browser.navigate')}
        </button>
      </form>
      {error && <div className="browser-error">{error}</div>}
    </div>
  );
};

export default Browser;