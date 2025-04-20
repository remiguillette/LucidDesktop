// Service de gestion des utilisateurs pour BeaverOS
// Utilise le localStorage pour persister les données entre les sessions

// Utilisateur par défaut (admin/admin)
const DEFAULT_USERS = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
    displayName: 'Administrateur',
    role: 'admin',
    created: new Date().toISOString(),
    lastLogin: null
  }
];

// Initialiser le stockage des utilisateurs
const initializeUserStorage = () => {
  if (!localStorage.getItem('beaveros-users')) {
    localStorage.setItem('beaveros-users', JSON.stringify(DEFAULT_USERS));
  }
};

// Obtenir tous les utilisateurs
const getAllUsers = () => {
  initializeUserStorage();
  return JSON.parse(localStorage.getItem('beaveros-users') || '[]');
};

// Trouver un utilisateur par nom d'utilisateur
const findUserByUsername = (username) => {
  const users = getAllUsers();
  return users.find(user => user.username.toLowerCase() === username.toLowerCase());
};

// Authentifier un utilisateur
const authenticateUser = (username, password) => {
  const user = findUserByUsername(username);
  
  if (!user) {
    return { success: false, message: 'user_not_found' };
  }
  
  if (user.password !== password) {
    return { success: false, message: 'invalid_password' };
  }
  
  // Mettre à jour la dernière connexion
  updateLastLogin(user.id);
  
  return { 
    success: true, 
    user: {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      role: user.role
    }
  };
};

// Mettre à jour la dernière connexion
const updateLastLogin = (userId) => {
  const users = getAllUsers();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex !== -1) {
    users[userIndex].lastLogin = new Date().toISOString();
    localStorage.setItem('beaveros-users', JSON.stringify(users));
  }
};

// Créer un nouvel utilisateur
const createUser = (userData) => {
  const users = getAllUsers();
  
  // Vérifier si l'utilisateur existe déjà
  if (findUserByUsername(userData.username)) {
    return { success: false, message: 'username_exists' };
  }
  
  // Créer le nouvel utilisateur
  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    username: userData.username,
    password: userData.password,
    displayName: userData.displayName || userData.username,
    role: userData.role || 'user',
    created: new Date().toISOString(),
    lastLogin: null
  };
  
  users.push(newUser);
  localStorage.setItem('beaveros-users', JSON.stringify(users));
  
  return { 
    success: true, 
    user: {
      id: newUser.id,
      username: newUser.username,
      displayName: newUser.displayName,
      role: newUser.role
    }
  };
};

// Récupérer les infos de session pour l'utilisateur connecté
const getLoggedInUser = () => {
  const userSession = localStorage.getItem('beaveros-session');
  if (!userSession) return null;
  
  try {
    return JSON.parse(userSession);
  } catch (e) {
    return null;
  }
};

// Sauvegarde les info de l'utilisateur connecté
const saveLoggedInUser = (userData) => {
  localStorage.setItem('beaveros-session', JSON.stringify(userData));
};

// Effacer les données de session
const clearUserSession = () => {
  localStorage.removeItem('beaveros-session');
};

export default {
  authenticateUser,
  findUserByUsername,
  createUser,
  getAllUsers,
  getLoggedInUser,
  saveLoggedInUser,
  clearUserSession
};