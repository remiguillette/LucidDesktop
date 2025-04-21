
import React from 'react';

const TestBrowser = () => {
  React.useEffect(() => {
    // Open Google in a new tab
    const win = window.open('https://www.google.com', '_blank');
    if (win) {
      win.focus();
    }
  }, []);

  return (
    <div className="browser-container">
      <h2>Test Browser opened in new tab</h2>
    </div>
  );
};

export default TestBrowser;
