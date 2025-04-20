// This is the main entry point for NW.js
const path = require('path');

// Define main window properties
nw.Window.open('index.html', {
  width: 1024,
  height: 768,
  min_width: 800,
  min_height: 600,
  position: 'center',
  frame: true,
  title: 'BeaverOS',
  icon: path.join(process.cwd(), 'src/assets/logo.png'),
  show: false
}, function(win) {
  // Add window event listeners
  win.on('loaded', function() {
    win.show();
    win.focus();
  });

  // Handle window close event
  win.on('close', function() {
    this.hide();
    this.close(true);
  });
});
