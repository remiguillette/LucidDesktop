
import React, { useState } from 'react';

const TestBrowser = () => {
  const [url, setUrl] = useState('https://www.google.com');

  return (
    <div className="browser-container">
      <div className="browser-form">
        <input 
          type="text" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="browser-input"
          placeholder="Enter URL"
        />
      </div>
      <iframe
        src={url}
        style={{
          width: '100%',
          height: 'calc(100vh - 140px)',
          border: 'none',
          marginTop: '10px'
        }}
        title="browser-frame"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation allow-modals allow-top-navigation"
      />
    </div>
  );
};

export default TestBrowser;
