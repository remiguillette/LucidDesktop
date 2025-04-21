import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
const { exec } = window.require('child_process');

const Browser = () => {
  const { t } = useTranslation();
  const [url, setUrl] = useState('https://www.google.com');
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState('');

  const handleNavigate = (e) => {
    e.preventDefault();

    // Validate URL
    try {
      new URL(url);
    } catch {
      setError('Invalid URL format');
      setDebugInfo('');
      return;
    }

    // Open URL in default browser using xdg-open
    exec(`xdg-open "${url}"`, (err, stdout, stderr) => {
      if (err) {
        console.error('Failed to open browser:', err);
        setError('Failed to open browser');
        setDebugInfo(`Error: ${err.message}`);
      }
      if (stderr) {
        console.error('stderr:', stderr);
        setDebugInfo(`stderr: ${stderr}`);
      }
      if (stdout) {
        console.log('stdout:', stdout);
        setDebugInfo(`stdout: ${stdout}`);
      }
    });
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
            setDebugInfo('');
          }}
          placeholder="Enter URL"
          className="browser-input"
        />
        <button type="submit" className="browser-button">
          {t('apps.browser.navigate')}
        </button>
      </form>
      {error && <div className="browser-error">{error}</div>}
      {debugInfo && <div className="browser-debug">{debugInfo}</div>}
    </div>
  );
};

export default Browser;
