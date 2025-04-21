
import React from 'react';

const Browser = () => {
  const url = 'http://localhost:5000/';

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <iframe
        src={url}
        style={{
          flexGrow: 1,
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        title="Browser Frame"
      />
    </div>
  );
};

export default Browser;
