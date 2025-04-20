const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;

// Types MIME pour les différents types de fichiers
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

// Serveur HTTP simple
const server = http.createServer((req, res) => {
  console.log(`Requête: ${req.method} ${req.url}`);

  // Gérer les URL spéciales
  if (req.url === '/') {
    req.url = '/index.html';
  }

  // Déterminer le chemin du fichier dans le système de fichiers
  let filePath = req.url.startsWith('/dist/') 
    ? '.' + req.url 
    : './dist' + req.url;

  // Essayer de lire le fichier
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // Si le fichier n'existe pas, essayer le fichier dans le dossier 'src'
      if (err.code === 'ENOENT') {
        const srcPath = './src' + req.url;
        fs.readFile(srcPath, (err2, srcContent) => {
          if (err2) {
            // Fichier introuvable même dans src
            console.error(`Fichier non trouvé: ${filePath} ou ${srcPath}`);
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Fichier Non Trouvé</h1>');
            return;
          }
          
          // Fichier trouvé dans src
          const extname = path.extname(srcPath);
          const contentType = MIME_TYPES[extname] || 'application/octet-stream';
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(srcContent, 'utf-8');
        });
        return;
      }
      
      // Autre erreur de lecture de fichier
      console.error(`Erreur lecture fichier: ${err.code}`);
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>500 Erreur Serveur</h1><p>' + err.code + '</p>');
      return;
    }

    // Envoyer le fichier
    const extname = path.extname(filePath);
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content, 'utf-8');
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur démarré sur http://0.0.0.0:${PORT}`);
  console.log(`Appuyez sur Ctrl+C pour arrêter le serveur`);
});