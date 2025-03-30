# 🌿 Mon Oasis

Bienvenue sur **Mon Oasis**, un site e-commerce moderne dédié à la vente de plantes d’intérieur.  
Ce projet est réalisé dans le cadre de la formation **Développeur Web & Web Mobile** à la Wild Code School.

---

## 🖥️ Fonctionnalités principales

- 🪴 Catalogue de plantes avec filtres par catégories
- 🛒 Système de panier (ajout, suppression, total dynamique)
- 💚 Ajout aux favoris (icône cœur cliquable)
- 🔍 Barre de recherche
- 🔐 Authentification utilisateur sécurisée (bcrypt + JWT)
- 📄 Page produit individuelle avec description détaillée
- 🧾 Formulaire de contact
- 🧑‍💼 Espace utilisateur : connexion, inscription
- 🛠️ Espace administrateur pour la gestion des produits (ajout, modification, suppression)

---

## 🧑‍💻 Stack technique

### Front-end

- React
- CSS Modules / Figma (maquettes)
- Context API / State management
- React Router
- Figma (pour les maquettes)

### Back-end

- Node.js & Express  
- MySQL (base de données relationnelle)  
- JWT pour l’authentification sécurisée  
- Bcrypt pour le hashage des mots de passe  
- Dotenv pour gérer les variables d’environnement  
- CORS pour autoriser les requêtes cross-origin  
- **Middlewares Express** :
  - `express.json()` pour parser les données JSON  
  - Middleware JWT pour sécuriser les routes protégées  
  - Middleware d’authentification utilisateur  
  - Middleware de gestion des erreurs
  - Middleware de vérification des rôles pour l’accès à l’espace admin ✅

---

## 🔐 Authentification

Mon Oasis utilise une méthode sécurisée pour la gestion des utilisateurs :

- `bcrypt` : les mots de passe sont hashés avant d’être stockés
- `jsonwebtoken` : un token est généré à la connexion pour sécuriser l’accès aux routes
- `dotenv` : les variables sensibles sont cachées (comme la clé secrète JWT)

🔐 **Flux :**
1. L'utilisateur s'inscrit → son mot de passe est hashé
2. Il se connecte → un JWT lui est attribué
3. Le token est ensuite utilisé pour accéder aux routes protégées

---

## 🔧 Installation et lancement du projet

1. **Cloner le repository**
```bash
git clone https://github.com/MateuszPlebanek/mon-oasis.git
cd mon-oasis

Configuration de la base de données :
npm run db:migrate

2.Installation du client
cd client
npm install
npm run dev

3.Installation du serveur
cd ../server
npm install
npm run dev

⚠️ Crée un fichier .env dans server/ avec :
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=ton_mdp
DB_NAME=mon_oasis_db
JWT_SECRET=un_secret_tres_long

📄 Licence

📌 Mentions
Ce projet est réalisé dans un cadre pédagogique dans le cadre de la formation Développeur Web & Web Mobile à la Wild Code School.
Il n’est pas destiné à un usage commercial.

