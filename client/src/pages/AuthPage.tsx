import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';
import SignupForm from '../components/Auth/SignupForm';
import UserContext from '../contexts/UserContext';
import '../styles/AuthPage.css';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleFlip = () => {
    setIsLogin((prev) => !prev);
  };

  useEffect(() => {
    if (user && isLogin) {
      navigate('/mon-compte');
    }
  }, [user, isLogin, navigate]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className={`auth-card-inner ${!isLogin ? 'flipped' : ''}`}>
          <div className="auth-face front">
            <LoginForm onFlip={handleFlip} />
          </div>
          <div className="auth-face back">
            <SignupForm onFlip={handleFlip} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
