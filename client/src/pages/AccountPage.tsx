import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import "../styles/AccountPage.css";

function AccountPage() {
  const { user, logout, fetchUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Si l'utilisateur n'est pas encore défini, on essaie de le récupérer
    if (!user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return <p className="loading">Chargement ou non connecté...</p>;
  }

  return (
    <div className="account-container">
      <h2>Mon Compte</h2>
      <p>
        <strong>Email :</strong> {user.email}
      </p>
      <p>
        <strong>ID utilisateur :</strong> {user.id}
      </p>

      <button type="button" onClick={handleLogout} className="logout-btn">
        Se déconnecter
      </button>
    </div>
  );
}

export default AccountPage;
