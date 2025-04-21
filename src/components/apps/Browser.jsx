import React from 'react';

const Browser = () => {
  const url = 'https://www.google.com';

  return (
    <div className="browser-container">
      <iframe
        src={url}
        style={{
          width: '100%',
          height: 'calc(100vh - 50px)', // Ajustement de la hauteur
          border: 'none',
          marginTop: '0px' // Suppression de la marge du haut
        }}
        title="Google Frame"
      />
    </div>
  );
};

export default Browser;