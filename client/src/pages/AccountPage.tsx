import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import ChangePasswordModal from "../components/ChangePasswordModal";
import "../styles/AccountPage.css";
import logo from "../assets/logo.png";

type Order = {
  id: number;
  total: number;
  created_at: string;
  name: string;
  image: string;
  quantity: number;
};

function AccountPage() {
  const { user, fetchUser, logout } = useContext(UserContext);
  const [showProfile, setShowProfile] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState (false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [formData, setFormData] = useState({
    civility: "",
    firstname: "",
    lastname: "",
    address: "",
    address2: "",
    city: "",
    zipcode: "",
    country: "",
    phone: "",
    birthdate: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    countryCode: "",
  });

  const profileRef = useRef<HTMLDivElement>(null);
  const ordersRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) fetchUser();
  }, [user, fetchUser]);

  // 2. Pré-remplissage du formulaire avec les données utilisateur
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        ...user,
      }));
    }
  }, [user]);
  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node) &&
        ordersRef.current &&
        !ordersRef.current.contains(e.target as Node)
      ) {
        setShowProfile(false);
        setShowOrders(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleOrdersClick = async () => {
    setShowOrders((prev) => !prev);
    if (!showOrders) {
      try {
        const res = await fetch("http://localhost:5002/api/orders", {
          credentials: "include",
        });
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Erreur lors du chargement des commandes :", err);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    try {
      const res = await fetch("http://localhost:5002/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Erreur de sauvegarde du profil");
      alert("Profil mis à jour !");
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <p className="loading">Chargement...</p>;

  return (
    <div className="account-page">
      <div className="account-logo">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Mon Oasis" />
          <span>Mon Oasis</span>
        </Link>
      </div>

      <h2>Mon compte</h2>

      <div className="account-cards">
        {/* Mon profil */}
        <div className="account-card" ref={profileRef}>
          <div className="card-header">
            <h3>Mon profil</h3>
            <p>Email : {user.email}</p>
            <p>Nom : {formData.lastname || "—"}</p>
          </div>

          <button type="button" onClick={() => setShowProfile((prev) => !prev)}>
            {showProfile ? "Masquer le formulaire" : "Modifier mon profil"}
          </button>

          {showProfile && (
            <div className="card-body">
              {/* Civilité */}
              <label htmlFor="civility">Civilité*</label>
              <select
                id="civility"
                name="civility"
                value={formData.civility}
                onChange={handleInputChange}
                className="input-like"
              >
                <option value="">Sélectionner</option>
                <option value="M.">M.</option>
                <option value="Mme">Mme</option>
                <option value="Autre">Autre</option>
              </select>
              {/* Prénom */}
              <label htmlFor="firstname">Prénom*</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
              />
              {/* Nom */}
              <label htmlFor="lastname">Nom*</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
              />
              {/* Adresse */}
              <label htmlFor="address">Nom de l’adresse de livraison</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
              {/* Complément d'adresse */}
              <label htmlFor="address2">Complément d’adresse</label>
              <input
                type="text"
                id="address2"
                name="address2"
                value={formData.address2}
                onChange={handleInputChange}
              />
              {/* Code postal */}
              <label htmlFor="zipcode">Code postal*</label>
              <input
                type="text"
                id="zipcode"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleInputChange}
              />
              {/* Ville */}
              <label htmlFor="city">Ville*</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
              {/* Pays */}
              <label htmlFor="country">Pays/Région*</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
              />
              {/* Téléphone */}
              <label htmlFor="phone">Téléphone*</label>
              <div className="phone-fields">
                <input
                  type="text"
                  id="countryCode"
                  name="countryCode"
                  placeholder="+33"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                  className="input-like"
                />
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input-like"
                />
              </div>
              {/* Date de naissance */}
              <label htmlFor="birthdate">Date de naissance</label>
              <div className="birthdate-fields">
                <select
                  name="birthDay"
                  value={formData.birthDay}
                  onChange={handleInputChange}
                  className="input-like"
                >
                  <option value="">Jour</option>
                  {[...Array(31)].map((_, i) => (
                    <option key={`day-${i + 1}`} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>

                <select
                  name="birthMonth"
                  value={formData.birthMonth}
                  onChange={handleInputChange}
                  className="input-like"
                >
                  <option value="">Mois</option>
                  {[
                    "Janvier",
                    "Février",
                    "Mars",
                    "Avril",
                    "Mai",
                    "Juin",
                    "Juillet",
                    "Août",
                    "Septembre",
                    "Octobre",
                    "Novembre",
                    "Décembre",
                  ].map((mois) => (
                    <option key={mois} value={mois}>
                      {mois}
                    </option>
                  ))}
                </select>

                <select
                  name="birthYear"
                  value={formData.birthYear}
                  onChange={handleInputChange}
                  className="input-like"
                >
                  <option value="">Année</option>
                  {Array.from({ length: 100 }, (_, i) => 2025 - i).map(
                    (year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ),
                  )}
                </select>
              </div>
              <button type="button" onClick={handleSaveProfile}>
                Enregistrer les modifications
              </button>

              {/*Séparation*/}
              <hr style={{ marginTop: "2rem", borderColor: "#c6f6d5" }} />
            {/* Mot de passe */}
            <div className="password-change-section">
              <p>Mot de passe</p>
              <button
                type="button"
                className="change-password-btn"
                onClick={() => setShowPasswordModal(true)}
                >
                Changer le mot de passe
                </button>
            </div>
            </div>
          )}
        </div>

        {/* Mes achats */}
        <div className="account-card" ref={ordersRef}>
          <div className="card-header">
            <h3>Mes achats</h3>
          </div>

          <button type="button" onClick={handleOrdersClick}>
            {showOrders ? "Masquer mes achats" : "Voir mes achats"}
          </button>

          {showOrders && (
            <div className="card-body">
              {orders.map((order) => (
                <div key={order.id} className="order-item">
                  <img
                    src={`http://localhost:5002/images/${order.image}`}
                    alt={order.name}
                  />
                  <div>
                    <strong>{order.name}</strong> x {order.quantity}
                    <p>Total : {order.total} €</p>
                    <small>
                      Acheté le :{" "}
                      {new Date(order.created_at).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button type="button" className="logout-btn" onClick={handleLogout}>
        Se déconnecter
      </button>
      {showPasswordModal && (
       <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
      )}
       </div>
  );
}

export default AccountPage;
