import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; // 👁️ pro icons
import "../styles/ChangePasswordModal.css";

interface Props {
  onClose: () => void;
}

export default function ChangePasswordModal({ onClose }: Props) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5002/api/user/change-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ oldPassword, newPassword }),
        },
      );

      if (!res.ok) throw new Error("Échec de la mise à jour du mot de passe");
      alert("Mot de passe modifié avec succès !");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Erreur serveur.");
    }
  };

  return (
    <div
  className="change-password-overlay"
  onClick={onClose}
  onKeyDown={(e) => {
    if (e.key === "Escape") {
      onClose();
    }
    }}>
    <section
      className="change-password-modal"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.key === "Escape" && e.stopPropagation()}
    >
        <button type="button" className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Changer votre mot de passe</h2>

        {/* Champ ancien mot de passe */}
        <label htmlFor="old-password">Ancien mot de passe*</label>
        <div className="input-wrapper">
          <input
            id="old-password"
            type={showOld ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <button
            type="button"
            className="eye-toggle"
            onClick={() => setShowOld(!showOld)}
            aria-label={
              showOld ? "Cacher le mot de passe" : "Afficher le mot de passe"
            }
          >
            {showOld ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {/* Champ nouveau mot de passe */}
        <label htmlFor="new-password">Nouveau mot de passe*</label>
        <div className="input-wrapper">
          <input
            id="new-password"
            type={showNew ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            type="button"
            className="eye-toggle"
            onClick={() => setShowNew(!showNew)}
            aria-label={showNew ? "Cacher le mot de passe" : "Afficher le mot de passe"}
          >
            {showNew ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {/* Champ confirmation */}
        <label htmlFor="confirm-password">Confirmer votre mot de passe*</label>
        <div className="input-wrapper">
          <input
            id="confirm-password"
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            className="eye-toggle"
            onClick={() => setShowConfirm(!showConfirm)}
            aria-label={showConfirm ? "Cacher le mot de passe" : "Afficher le mot de passe"}
          >
            {showConfirm ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <button type="button" className="change-password-submit-btn" onClick={handleSubmit}>
          Envoyer
        </button>
      </section>
    </div>
  );
}
