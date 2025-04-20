const installer = require('electron-installer-debian');
const path = require('path');
const fs = require('fs');

// Configuration for the debian package
const options = {
  src: path.join(__dirname, 'dist'),
  dest: path.join(__dirname, 'release-builds'),
  arch: 'amd64',
  categories: ['Utility'],
  description: 'BeaverOS - Système d\'exploitation de bureau',
  name: 'beaveros',
  productName: 'BeaverOS',
  genericName: 'Desktop Environment',
  homepage: 'https://beaveros.example.com',
  icon: path.join(__dirname, 'src/assets/logo.png'),
  maintainer: 'BeaverOS Team <team@beaveros.example.com>',
  section: 'utils',
  priority: 'optional'
};

console.log('Building Debian package...');

// Create output directory if it doesn't exist
if (!fs.existsSync(options.dest)) {
  fs.mkdirSync(options.dest, { recursive: true });
}

// Build the .deb package
installer(options)
  .then(() => {
    console.log(`Successfully created Debian package at ${options.dest}`);
  })
  .catch(err => {
    console.error('Error building Debian package:', err);
  });
