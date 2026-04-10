import { useState } from 'react';
import { API_URL } from '../../services/api';

type Props = {
  onFlip: () => void;
};

function SignupForm({ onFlip }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Les mots de passe ne correspondent pas.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

    if (!emailRegex.test(email)) {
      setErrorMsg("L'adresse email n’est pas valide.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrorMsg(
        'Le mot de passe doit contenir 8 caractères minimum, une majuscule, une minuscule, un chiffre et un caractère spécial.'
      );
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg('🎉 Compte créé avec succès. Vous pouvez maintenant vous connecter.');

      } else {
        setErrorMsg(data.message || "Erreur lors de l'inscription.");
      }
    } catch (error) {
      console.error('Erreur signup :', error);
      setErrorMsg('Une erreur est survenue.');
    }
  };

  return (
    <form onSubmit={handleSignup} className="auth-form">
      <h2>Inscription</h2>

      <label htmlFor="signup-email">Email</label>
      <input
        id="signup-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="signup-password">Mot de passe</label>
      <input
        id="signup-password"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <label htmlFor="signup-confirm">Confirmer le mot de passe</label>
      <input
        id="signup-confirm"
        type="password"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {errorMsg && <p className="error-msg">{errorMsg}</p>}
      {successMsg && <p className="success-msg">{successMsg}</p>}

      <button type="submit" className="auth-btn">
        S’inscrire
      </button>

      <p className="auth-switch">
        Déjà un compte ?{' '}
        <button onClick={onFlip} className="auth-link" type="button">
          Se connecter
        </button>
      </p>
    </form>
  );
}

export default SignupForm;
