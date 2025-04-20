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
        "calculator": "Calculator"
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
