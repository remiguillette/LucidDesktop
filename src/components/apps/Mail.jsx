
import React from 'react';

const Mail = () => {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <iframe
        src="https://mail.google.com"
        style={{
          flexGrow: 1,
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        title="Mail Frame"
      />
    </div>
  );
};

export default Mail;
