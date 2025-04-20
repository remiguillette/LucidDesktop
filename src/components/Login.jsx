import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Login = ({ onLogin }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Simuler le processus de connexion
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username) {
      setError(t('login.errors.noUsername'));
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simuler un délai d'authentification
    setTimeout(() => {
      setIsLoading(false);
      
      // Pour cette démonstration, n'importe quel nom d'utilisateur est accepté
      // mais le mot de passe est optionnel
      onLogin(username);
    }, 1500);
  };

  return (
    <div className="login-screen">
      <div className="login-container">
        <div className="login-logo">
          <img src="./assets/logo.svg" alt="BeaverOS Logo" />
          <h1>BeaverOS</h1>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
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
        </form>
        
        <div className="login-version">
          BeaverOS v1.0.0
        </div>
      </div>
    </div>
  );
};

export default Login;