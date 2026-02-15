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
    git clone [https://github.com/your-username/link-vault.git](https://github.com/your-username/link-vault.git)
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
* **Logout:** Safely end your session.

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

## Sequential Flow

graph TD
    %% Nodes
    User([User])
    FE[Frontend<br/>(React + Vite)]
    BE[Backend<br/>(Node.js + Express)]
    DB[(Database<br/>MongoDB/SQL)]
    Store[Object Store<br/>(e.g., Firebase Storage)]

    %% Flow
    User -->|1. Input Text or Select File| FE
    FE -->|2. POST Request (Data + Expiry)| BE

    %% Backend Logic
    BE -->|3. Check Content Type| Decision{Is it File<br/>or Text?}

    %% Path A: File Upload
    Decision -->|File| Store
    Store -->|4. Upload File| Store
    Store -.->|5. Return Public URL| BE
    BE -->|6. Store File URL + Metadata| DB

    %% Path B: Text Upload
    Decision -->|Text| DB
    BE -->|4. Store Raw Text + Metadata| DB

    %% Completion
    DB -.->|7. Confirm Save| BE
    BE -->|8. Return Unique ID / Link| FE
    FE -->|9. Display Shareable URL| User

    %% Styling
    style FE fill:#e1f5fe,stroke:#01579b
    style BE fill:#fff3e0,stroke:#e65100
    style DB fill:#e8f5e9,stroke:#1b5e20
    style Store fill:#f3e5f5,stroke:#4a148c
