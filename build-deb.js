const installer = require('electron-installer-debian');
const path = require('path');
const fs = require('fs');

// Options de configuration pour le package .deb
const options = {
  src: path.resolve(__dirname, 'dist/'),
  dest: path.resolve(__dirname, 'packages/'),
  arch: 'amd64',
  productName: 'BeaverOS',
  name: 'beaveros',
  version: '1.0.0',
  bin: 'BeaverOS',
  categories: ['Utility', 'Development'],
  homepage: 'https://github.com/votre-utilisateur/beaveros',
  icon: path.resolve(__dirname, 'src/assets/logo.png'),
  maintainer: 'BeaverOS Maintainer <maintainer@example.com>',
  section: 'utils',
  priority: 'optional',
  lintianOverrides: [
    'changelog-file-missing-in-native-package',
    'executable-not-elf-or-script',
    'extra-license-file'
  ],
  description: 'BeaverOS - Système d\'exploitation de bureau développé avec NW.js et React',
  depends: [
    'libxkbcommon0', 
    'libgbm1', 
    'libdrm2', 
    'libegl1-mesa', 
    'libdbus-1-3', 
    'libxcb1', 
    'libcups2'
  ]
};

// Vérifier si le dossier de destination existe, sinon le créer
if (!fs.existsSync(options.dest)) {
  fs.mkdirSync(options.dest, { recursive: true });
}

console.log('Création du package Debian (.deb)...');

// Créer le package .deb
installer(options)
  .then(() => {
    console.log(`Package Debian créé avec succès dans ${options.dest}`);
  })
  .catch(err => {
    console.error('Erreur lors de la création du package Debian :', err);
  });