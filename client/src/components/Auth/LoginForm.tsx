import { useState, useContext } from 'react';
import UserContext from '../../contexts/UserContext';

type Props = {
  onFlip: () => void;
};

function LoginForm({ onFlip }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const { fetchUser } = useContext(UserContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const response = await fetch('http://localhost:5002/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await fetchUser(); // ✅ Mise à jour du contexte utilisateur
        setSuccessMsg('Connexion réussie !');
        // ✅ Pas de redirection ici, gérée dans AuthPage si user est défini
      } else {
        setErrorMsg(data.message || 'Échec de la connexion.');
      }
    } catch (error) {
      console.error('Erreur de connexion :', error);
      setErrorMsg('Une erreur est survenue.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="auth-form">
      <h2>Connexion</h2>

      <label htmlFor="login-email">Email</label>
      <input
        id="login-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="login-password">Mot de passe</label>
      <input
        id="login-password"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {errorMsg && <p className="error-msg">{errorMsg}</p>}
      {successMsg && <p className="success-msg">{successMsg}</p>}

      <button type="submit" className="auth-btn">Se connecter</button>

      <p className="auth-switch">
        Pas encore de compte ?{' '}
        <button onClick={onFlip} className="auth-link" type="button">
          S’inscrire
        </button>
      </p>
    </form>
  );
}

export default LoginForm;
