import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';
import SignupForm from '../components/Auth/SignupForm';
import { UserContext } from '../contexts/UserContext';
import logo from '../assets/logo.png';
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
      <div className="auth-logo">
        <Link
          to="/"
          className="d-flex align-items-center gap-2 text-decoration-none"
        >
          <img src={logo} alt="Mon Oasis" width="40" height="40" />
          <span className="h4 text-success m-0">Mon Oasis</span>
        </Link>
      </div>
      
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
