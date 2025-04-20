import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import frTranslation from './locales/fr.json';

// Define resources
const resources = {
  fr: {
    translation: frTranslation
  },
  en: {
    translation: {
      // Default fallback English translations
      "app": {
        "title": "BeaverOS",
        "description": "Desktop Operating System"
      },
      "login": {
        "username": "Username",
        "usernamePlaceholder": "Enter your username",
        "password": "Password",
        "passwordPlaceholder": "Enter your password",
        "passwordHint": "For this demo, any password will work",
        "login": "Log in",
        "loggingIn": "Logging in...",
        "errors": {
          "noUsername": "Please enter a username",
          "wrongPassword": "Incorrect password"
        }
      },
      "navbar": {
        "desktop": "Desktop",
        "files": "Files",
        "apps": "Apps",
        "settings": "Settings"
      },
      "desktop": {
        "terminal": "Terminal",
        "settings": "Settings",
        "browser": "Browser",
        "files": "Files",
        "music": "Music",
        "calendar": "Calendar",
        "mail": "Mail",
        "calculator": "Calculator",
        "notepad": "Notepad",
        "tictactoe": "Tic-Tac-Toe"
      },
      "views": {
        "files": {
          "title": "File Manager",
          "noFiles": "No files found",
          "createFolder": "New Folder",
          "upload": "Upload"
        },
        "apps": {
          "title": "App Center",
          "install": "Install",
          "uninstall": "Uninstall",
          "update": "Update"
        }
      },
      "settings": {
        "user": "User",
        "logout": "Log out",
        "appearance": "Appearance",
        "darkTheme": "Dark theme",
        "language": "Language",
        "notifications": "Notifications",
        "enableNotifications": "Enable notifications",
        "system": "System",
        "autoStart": "Start with system",
        "about": "About BeaverOS",
        "viewInfo": "View information",
        "version": "Version"
      },
      "apps": {
        "calculator": {
          "title": "Calculator"
        },
        "notepad": {
          "title": "Notepad",
          "untitled": "Untitled",
          "new": "New",
          "save": "Save",
          "rename": "Rename",
          "confirmNew": "Current document is not saved. Do you want to continue?",
          "promptRename": "Enter a new name for the document:",
          "placeholder": "Start typing here..."
        },
        "tictactoe": {
          "title": "Tic-Tac-Toe",
          "newGame": "New Game",
          "nextPlayer": "Next player: {{player}}",
          "winner": "Winner: {{player}}",
          "draw": "Draw!"
        }
      }
    }
  }
};

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already safes from XSS
    }
  });

export default i18n;
