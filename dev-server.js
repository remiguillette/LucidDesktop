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

// Injection du polyfill NW.js pour le développement web
const NW_POLYFILL = `
<script>
// Polyfill pour environnement NW.js dans un navigateur web
window.nw = {
  Window: {
    get: function() { 
      return {
        // Stub functions pour la compatibilité
        showDevTools: function() { console.log('showDevTools appelé'); },
        focus: function() { console.log('focus appelé'); },
        on: function(event, callback) { console.log('on ' + event + ' appelé'); }
      };
    },
    open: function(url, options, callback) {
      console.log('nw.Window.open appelé', url, options);
      if (callback) setTimeout(callback, 0, { 
        on: function(event, handler) { 
          console.log('Événement enregistré:', event);
          if (event === 'loaded') setTimeout(handler, 500);
        },
        show: function() { console.log('show appelé'); },
        focus: function() { console.log('focus appelé'); },
        hide: function() { console.log('hide appelé'); },
        close: function() { console.log('close appelé'); }
      });
    }
  },
  App: {
    quit: function() { console.log('nw.App.quit appelé'); },
    setTray: function() { console.log('nw.App.setTray appelé'); }
  },
  Shell: {
    openExternal: function(url) { 
      console.log('Ouverture URL externe:', url);
      window.open(url, '_blank');
    }
  }
};

// Polyfill pour les modules Node dans le navigateur
if (typeof process === 'undefined') {
  window.process = {
    env: {},
    cwd: function() { return '/'; }
  };
}

// Path module simple polyfill
if (typeof module === 'undefined') {
  window.module = { exports: {} };
}

if (typeof require === 'undefined') {
  window.require = function(module) {
    console.log('require appelé pour:', module);
    if (module === 'path') {
      return {
        join: function() {
          return Array.from(arguments).join('/').replace(/\\/+/g, '/');
        },
        resolve: function() {
          return Array.from(arguments).join('/').replace(/\\/+/g, '/');
        }
      };
    }
    if (module === 'fs') {
      return {
        readFileSync: function() { return ''; },
        writeFileSync: function() {},
        existsSync: function() { return true; }
      };
    }
    return {};
  };
}

console.log('BeaverOS - Mode Développement - Polyfill NW.js chargé');
</script>
`;

// Serveur HTTP pour le développement
const server = http.createServer((req, res) => {
  console.log(`Requête: ${req.method} ${req.url}`);

  // Gérer les URL spéciales
  if (req.url === '/') {
    req.url = '/index.html';
  }

  // Déterminer le chemin du fichier dans le système de fichiers
  let filePath = './dist' + req.url;
  
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

    // Traitement spécial pour le fichier HTML
    const extname = path.extname(filePath);
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';
    
    if (extname === '.html') {
      // Injecter le polyfill NW.js juste après la balise <head>
      let htmlContent = content.toString('utf-8');
      htmlContent = htmlContent.replace('<head>', '<head>' + NW_POLYFILL);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(htmlContent, 'utf-8');
      return;
    }
    
    // Envoyer le fichier normalement
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content, 'utf-8');
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur de développement démarré sur http://0.0.0.0:${PORT}`);
  console.log(`Appuyez sur Ctrl+C pour arrêter le serveur`);
});