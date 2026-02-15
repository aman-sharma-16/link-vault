Link Vault 🔒

A secure, user-friendly web application to store, manage, and share your sensitive links and credentials. Link Vault provides encrypted storage for your personal and work-related URLs, keeping them safe and easily accessible.

Features ✨

Secure Vaults: Store your links and credentials safely with password protection.

Encrypted Storage: All sensitive data is encrypted before storage.

User Authentication: Signup and login system with JWT-based authentication.

Organized Management: Categorize and organize links for easy retrieval.

Link Sharing: Share links securely with specific users (optional future feature).

Responsive Design: Works on both desktop and mobile devices.

Download & Export: Download your vault data securely for backup.

Tech Stack 🛠️

Frontend: React, Tailwind CSS, Zustand/Redux (state management)

Backend: Node.js, Express.js, FastAPI (optional), Socket.IO (for live updates)

Database: SQLite / MongoDB (based on your choice)

Authentication: JWT (Bearer tokens)

Encryption: bcrypt (passwords), AES/other symmetric encryption (vault data)

Installation 💻
Backend

Clone the repository:

git clone https://github.com/your-username/link-vault.git
cd link-vault/backend


Install dependencies:

npm install


Create a .env file:

PORT=5000
JWT_SECRET=your_jwt_secret
DATABASE_URL=your_db_url


Start the backend server:

npm run dev

Frontend

Navigate to frontend folder:

cd ../frontend


Install dependencies:

npm install


Start the frontend server:

npm start


Open http://localhost:3000 in your browser.

Usage 📝

Signup: Create a new account using your email and username.

Login: Enter your credentials to access your vault.

Add Links: Store links along with optional passwords or notes.

View Vault: Access all saved links securely.

Download Vault: Export your vault for backup purposes.

Logout: Safely end your session.

API Endpoints 🔗

POST /signup – Create a new user.

POST /login – Authenticate user and return JWT.

GET /vault – Get all links in the vault (authenticated).

POST /vault – Add a new link.

PUT /vault/:id – Update a link.

DELETE /vault/:id – Delete a link.

All endpoints that require authentication expect the JWT in the Authorization header:

Authorization: Bearer <token>

Folder Structure 📂
link-vault/
├─ backend/
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  ├─ utils/
│  └─ server.js
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ store/
│  │  └─ App.jsx
├─ .env
└─ README.md

Security ⚡

Passwords hashed using bcrypt.

JWT authentication with token expiration.

Vault data encrypted before storage.

No sensitive data exposed in frontend or network requests.
