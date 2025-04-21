import React from 'react';

const Browser = () => {
  React.useEffect(() => {
    window.location.href = 'https://www.google.com';
  }, []);

  return null;
};

export default Browser;