# BeaverOS

BeaverOS est une application de bureau développée avec Node.js, NW.js et React, présentant une interface en français et un thème sombre.

## Description

BeaverOS est conçu comme un environnement de bureau virtuel avec une barre de navigation en bas de l'écran, des icônes d'applications sur le bureau, et des fonctionnalités de base simulant un système d'exploitation.

## Fonctionnalités

- Interface utilisateur en français
- Thème sombre (fond noir profond avec texte #f89422)
- Icônes de bureau pour les applications courantes
- Barre de navigation au bas de l'écran
- Section Paramètres pour personnaliser l'expérience
- Support multilingue (français par défaut, anglais disponible)
- Applications installées :
  - Calculatrice : une calculatrice fonctionnelle
  - Bloc-notes : un éditeur de texte simple
  - Morpion (Tic-Tac-Toe) : un petit jeu pour se divertir
- Fenêtres d'application déplaçables et redimensionnables

## Structure du projet

```
├── src
│   ├── assets          # Images et ressources
│   ├── components      # Composants React
│   │   ├── apps        # Applications indépendantes
│   │   │   ├── Calculator.jsx    # Calculatrice
│   │   │   ├── Notepad.jsx       # Bloc-notes
│   │   │   └── TicTacToe.jsx     # Jeu de Morpion
│   │   ├── App.jsx               # Composant principal
│   │   ├── ApplicationWindow.jsx # Gestionnaire de fenêtres
│   │   ├── Desktop.jsx           # Bureau avec icônes
│   │   ├── NavBar.jsx            # Barre de navigation
│   │   └── Settings.jsx          # Paramètres
│   ├── locales         # Fichiers de traduction
│   ├── styles          # Feuilles de style CSS
│   ├── app.js          # Point d'entrée de l'application React
│   ├── i18n.js         # Configuration de l'internationalisation
│   ├── index.html      # Fichier HTML principal
│   └── index.js        # Point d'entrée initial
├── build-deb.js        # Script pour créer le package .deb
├── package.json
├── package.json.override  # Configuration NW.js pour la distribution
└── webpack.config.js   # Configuration de webpack
```

## Développement

Dans cet environnement Replit, nous nous concentrons uniquement sur le développement du code. L'exécution de NW.js et la création du fichier .deb seront effectuées manuellement en dehors de cet environnement.

### Configuration de NW.js (à exécuter manuellement hors Replit)

Pour exécuter l'application localement avec NW.js :

1. Clonez ce dépôt
2. Installez les dépendances : `npm install`
3. Installez NW.js globalement : `npm install -g nw`
4. Construisez l'application : `npx webpack`
5. Copiez les fichiers nécessaires dans le dossier dist :
   ```
   mkdir -p dist
   cp package.json.override dist/package.json
   cp -r src/assets dist/
   ```
6. Lancez l'application : `cd dist && nw .`

### Dépendances système requises pour NW.js

NW.js nécessite plusieurs bibliothèques système pour fonctionner correctement :
- libxkbcommon
- libgbm
- libdrm
- mesa
- dbus
- libxcb
- cups

Sur Debian/Ubuntu, vous pouvez les installer avec :
```
sudo apt-get install libxkbcommon0 libgbm1 libdrm2 libegl1-mesa libdbus-1-3 libxcb1 libcups2
```

### Création du package Debian (.deb)

Pour créer un fichier .deb :
1. Installez electron-installer-debian : `npm install electron-installer-debian`
2. Exécutez le script de construction : `node build-deb.js`

## Internationalisation

L'application est configurée avec i18next pour la traduction. Les fichiers de traduction se trouvent dans `src/locales/`.

- Français : fichier par défaut
- Anglais : défini comme langue de secours

## Thème

Le thème utilise un fond noir profond (#121212) avec du texte et des accents en orange (#f89422).