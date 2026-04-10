# 🌿 Mon Oasis

Welcome to **Mon Oasis**, a modern e-commerce website dedicated to indoor plants.  
This project was created as part of the **Développeur Web & Web Mobile** training program at Wild Code School.

---

## 🖥️ Main Features

- 🪴 Dynamic plant catalog with category filtering, sorting, and search
- 🛒 Dynamic shopping cart with automatic total updates. 
- 💚 Favorites system with clickable heart icons, stored in the database
- 🔍 Search bar
- 🔐 Secure authentication with JWT tokens and httpOnly cookies
- 📄 "My Account" page with purchase history and favorites list
- 🧾 Contact form
- 🧑‍💼 User area for sign up and login
- 🛠️ Admin area for product management (create, update, delete)

---

## 🧑‍💻 Tech Stack

### Front-end

- React + TypeScript
- CSS 
- Context API / State management
- React Router
- Figma for UI mockups

### Back-end

- Node.js & Express  
- MySQL 
- JWT for secure authentication  
- argon2 for password hashing
- dotenv for environment variable management  
- CORS for cross-origin requests
- httpOnly cookies for secure token storage

**Middlewares Express** :

  - `express.json()` for parsing JSON data 
  - JWT middleware to protect private routes 
  - Authentication middleware 
  - Error handling middleware
  - Role-checking middleware for admin access

---

## 🔐 Authentication

Mon Oasis uses a secure authentication flow :

- Passwords are hashed with `argon2`
- A JWT token is generated on login
- The token is stored in an `httpOnly` cookie, inaccessible from JavaScript
- An Express middleware (`authenticateToken`) protects sensitive routes

🔐 **Authentication Flow :**
1. The user signs up and the password is hashed
2. The user logs in and receives a JWT in an httpOnly cookie
3. The token is used to access protected routes
4. The cookie is automatically sent with protected API requests

---

## 🔧 Installation and Run the Project

1. **Clone the repository**
```bash
git clone https://github.com/MateuszPlebanek/mon-oasis.git
cd mon-oasis

Run the migration script from the server side :
npm run db:migrate

2.Start the client
cd client
npm install
npm run dev

3.Start the server
cd ../server
npm install
npm run dev

⚠️ Create a .env file inside the server/ folder with the following variables :
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=ton_mdp
DB_NAME=mon_oasis_db
JWT_SECRET=un_secret_tres_long
NODE_ENV=development

📄 Licence

📌 Mentions
This project was created for educational purposes as part of the Web and Mobile Web Developer training program at Wild Code School.
It is not intended for commercial use.

