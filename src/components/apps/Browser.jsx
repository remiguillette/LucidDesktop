
import React from 'react';

const Browser = () => {
  React.useEffect(() => {
    // Open Google in a new tab
    window.open('https://www.google.com', '_blank');
  }, []);

  return (
    <div className="browser-container">
      <h2>Browser opened in new tab</h2>
    </div>
  );
};

export default Browser;
