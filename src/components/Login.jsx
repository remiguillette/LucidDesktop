import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import userService from '../services/userService';

const Login = ({ onLogin }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // Gérer le processus de connexion
  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!username) {
      setError(t('login.errors.noUsername'));
      return;
    }
    
    if (!password) {
      setError(t('login.errors.noPassword'));
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Authentifier l'utilisateur via le service
    setTimeout(() => {
      const result = userService.authenticateUser(username, password);
      setIsLoading(false);
      
      if (result.success) {
        onLogin(result.user);
      } else {
        // Afficher le message d'erreur approprié
        switch (result.message) {
          case 'user_not_found':
            setError(t('login.errors.userNotFound'));
            break;
          case 'invalid_password':
            setError(t('login.errors.wrongPassword'));
            break;
          default:
            setError(t('login.errors.invalidCredentials'));
        }
      }
    }, 1000);
  };

  // Gérer le processus d'inscription
  const handleRegister = (e) => {
    e.preventDefault();
    
    if (!username) {
      setError(t('login.errors.noUsername'));
      return;
    }
    
    if (!password) {
      setError(t('login.errors.noPassword'));
      return;
    }
    
    if (password !== confirmPassword) {
      setError(t('login.errors.passwordMismatch'));
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Créer un nouvel utilisateur via le service
    setTimeout(() => {
      const result = userService.createUser({
        username,
        password,
        displayName: displayName || username
      });
      
      setIsLoading(false);
      
      if (result.success) {
        onLogin(result.user);
      } else {
        // Afficher le message d'erreur approprié
        switch (result.message) {
          case 'username_exists':
            setError(t('login.errors.usernameExists'));
            break;
          default:
            setError(t('login.errors.invalidCredentials'));
        }
      }
    }, 1000);
  };

  // Basculer entre la connexion et l'inscription
  const toggleRegisterMode = () => {
    setIsRegistering(!isRegistering);
    setError('');
    setUsername('');
    setPassword('');
    setDisplayName('');
    setConfirmPassword('');
  };

  // Formulaire de connexion
  const loginForm = (
    <form className="login-form" onSubmit={handleLogin}>
      {error && <div className="login-error">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="username">{t('login.username')}</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={t('login.usernamePlaceholder')}
          disabled={isLoading}
          autoFocus
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="password">{t('login.password')}</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('login.passwordPlaceholder')}
          disabled={isLoading}
        />
        <small>{t('login.passwordHint')}</small>
      </div>
      
      <button 
        type="submit" 
        className="login-button"
        disabled={isLoading}
      >
        {isLoading ? t('login.loggingIn') : t('login.login')}
      </button>
      
      <div className="login-options">
        <button 
          type="button" 
          className="login-link-button"
          onClick={toggleRegisterMode}
          disabled={isLoading}
        >
          {t('login.createAccount')}
        </button>
      </div>
    </form>
  );

  // Formulaire d'inscription
  const registerForm = (
    <form className="login-form" onSubmit={handleRegister}>
      {error && <div className="login-error">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="username">{t('login.username')}</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={t('login.usernamePlaceholder')}
          disabled={isLoading}
          autoFocus
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="displayName">{t('login.displayName')}</label>
        <input
          type="text"
          id="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder={t('login.displayNamePlaceholder')}
          disabled={isLoading}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="password">{t('login.password')}</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('login.passwordPlaceholder')}
          disabled={isLoading}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="confirmPassword">{t('login.confirmPassword')}</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder={t('login.confirmPasswordPlaceholder')}
          disabled={isLoading}
        />
      </div>
      
      <button 
        type="submit" 
        className="login-button"
        disabled={isLoading}
      >
        {isLoading ? t('login.registering') : t('login.register')}
      </button>
      
      <div className="login-options">
        <button 
          type="button" 
          className="login-link-button"
          onClick={toggleRegisterMode}
          disabled={isLoading}
        >
          {t('login.backToLogin')}
        </button>
      </div>
    </form>
  );

  return (
    <div className="login-screen">
      <div className="login-container">
        <div className="login-logo">
          <img src="./assets/logo.svg" alt="BeaverOS Logo" />
          <h1>BeaverOS</h1>
        </div>
        
        {isRegistering ? registerForm : loginForm}
        
        <div className="login-version">
          BeaverOS v1.0.0
        </div>
      </div>
    </div>
  );
};

export default Login;