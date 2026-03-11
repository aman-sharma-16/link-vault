# Link Vault 🔒

A secure, user-friendly web application to store, manage, and share your sensitive links and credentials. Link Vault provides encrypted storage for your personal and work-related URLs, keeping them safe and easily accessible.

## Features ✨

* **Secure Vaults:** Store your links and credentials safely with password protection.
* **Encrypted Storage:** All sensitive data is encrypted before storage.
* **User Authentication:** Signup and login system with JWT-based authentication.
* **Organized Management:** Categorize and organize links for easy retrieval.
* **Link Sharing:** Share links securely with specific users (optional future feature).
* **Responsive Design:** Works on both desktop and mobile devices.
* **Download & Export:** Download your vault data securely for backup.

## Tech Stack 🛠️

* **Frontend:** React, Tailwind CSS ,react-icons
* **Backend:** Node.js, Express.js,Zod,helmet,cors,multer
* **Database:** MongoDB
* **Authentication:** JWT (Bearer tokens)
* **Encryption:** bcrypt (passwords)

## Installation 💻

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/aman-sharma-16/link-vault.git
    cd link-vault/backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file:**
    Create a file named `.env` in the root of the backend folder and add:
    ```env
    PORT=3000
    JWT_SECRET=your_jwt_secret
    DATABASE_URL=your_db_url
    ```

4.  **Start the backend server:**
    ```bash
    npm run dev
    ```

### Frontend Setup

1.  **Navigate to frontend folder:**
    ```bash
    cd ../frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the frontend server:**
    ```bash
    npm start
    ```

4.  **Access the App:**
    Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage 📝

* **Signup:** Create a new account using your email and username.
* **Login:** Enter your credentials to access your vault.
* **Add Links:** Store links along with optional passwords or notes.
* **View Vault:** Access all saved links securely.
* **Download Vault:** Export your vault for backup purposes.

## API Endpoints 🔗

All endpoints that require authentication expect the JWT in the Authorization header:
`Authorization: Bearer <token>`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/signup` | Create a new user. |
| `POST` | `/login` | Authenticate user and return JWT. |
| `GET` | `/vault` | Get all links in the vault (authenticated). |
| `POST` | `/vault` | Add a new link. |
| `PATCH` | `/vault/:id` | delete a link (authenticated). |

## Folder Structure 📂

```plaintext
link-vault/
├─ backend/
│  ├─ src/
│  ├─ uploads/
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ utils/
│  │  └─ App.jsx
├─ .env
└─ README.md
```




