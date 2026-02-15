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
sequenceDiagram
    autonumber
    actor User
    participant FE as Frontend (React + Vite)
    participant BE as Backend (Node + Express)
    participant Cloud as Object Store (Firebase/S3)
    participant DB as Database (MongoDB/SQL)

    Note over User, FE: Step 1: User Input
    User->>FE: Enters Text OR Selects File
    User->>FE: (Optional) Sets Expiry Time
    User->>FE: Clicks "Generate Link"

    Note over FE, BE: Step 2: API Request
    FE->>BE: POST /api/upload (Data + Expiry)

    rect rgb(240, 248, 255)
        Note right of BE: Step 3: Processing
        alt is File Upload
            BE->>Cloud: Upload File Stream 
            Cloud-->>BE: Return Download URL
            BE->>DB: INSERT {id, type: 'file', fileUrl, expiry}
        else is Text Upload
            BE->>DB: INSERT {id, type: 'text', content, expiry}
        end
    end

    DB-->>BE: Return Success & Record ID
    
    Note over BE, FE: Step 4: Link Generation
    BE->>BE: Generate Short URL (e.g., linkvault.com/x9z1) [cite: 23]
    BE-->>FE: Return Short URL

    FE-->>User: Display Shareable Link
