# AuthSystem

A full-stack authentication system with signup, login, profile management, and JWT refresh token mechanism.

Built with React frontend, Node.js + Express backend, and MongoDB Atlas.

## Features

- User signup and login with form validation
- JWT access tokens (15-min expiry) + refresh tokens (7-day expiry with rotation)
- Password hashing with bcrypt (cost factor 12)
- Protected routes on frontend and backend
- Profile dashboard with view, edit, and change password tabs
- Auto token refresh via Axios interceptors
- Request validation with Zod
- Security headers with Helmet
- CORS configuration
- Graceful server shutdown

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, React Router v6, Axios |
| Backend | Node.js, Express, Mongoose, JWT, bcrypt, Zod |
| Database | MongoDB Atlas (MongoDB via Mongoose ORM) |
| Security | Helmet, CORS, bcrypt, JWT |

## Prerequisites

Before you begin, ensure you have installed:

- [Node.js](https://nodejs.org/) — v18 or higher (v22 LTS recommended)
- [npm](https://www.npmjs.com/) — comes with Node.js
- A [MongoDB Atlas](https://cloud.mongodb.com/) account (free tier is sufficient)
- [Git](https://git-scm.com/) — to clone the repository

---

## Setup Instructions

### Step 1: Clone the repository

```bash
git clone <repository-url>
cd auth-system
```

### Step 2: Install dependencies

```bash
npm run install:all
```

This installs dependencies for both backend and frontend.

### Step 3: Set up MongoDB Atlas

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com/) and log in
2. Create a **new project** (or use an existing one)
3. Click **"Build a Cluster"** → choose **M0 Free Tier** → select a region → **"Create Cluster"** (takes 1-3 minutes)
4. Once the cluster is ready, click **"Connect"**
5. Click **"Add IP Address"** → **"Allow Access from Anywhere"** (`0.0.0.0/0`) → **"Confirm"**
6. Create a **Database User** (username + password) — save these credentials
7. Click **"Choose a connection method"** → **"Drivers"**
8. Copy the connection string — it looks like:
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 4: Configure environment variables

```bash
cp backend/.env.example backend/.env
```

Open `backend/.env` and update the following values:

```
PORT=5001
MONGO_URI=mongodb+srv://<your-username>:<your-password>@<your-cluster>.mongodb.net/auth_db?retryWrites=true&w=majority
JWT_SECRET=<any-random-string>
JWT_REFRESH_SECRET=<any-other-random-string>
```

- Replace `<your-username>`, `<your-password>`, and `<your-cluster>` with your MongoDB Atlas details
- `JWT_SECRET` and `JWT_REFRESH_SECRET` can be any long random strings (e.g. `openssl rand -hex 32`)
- The database name `auth_db` will be created automatically by MongoDB

**Note:** If your password contains special characters like `@`, `#`, or `?`, they need to be URL-encoded (e.g., `@` → `%40`, `#` → `%23`).

### Step 5: Start the backend

Open a terminal and run:

```bash
npm run dev:backend
```

You should see:
```
MongoDB connected: <your-cluster>.mongodb.net
Server running on port 5001 (development)
```

Keep this terminal running.

### Step 6: Start the frontend

Open another terminal and run:

```bash
npm run dev:frontend
```

You should see:
```
VITE v5.x.x  ready in <time>
➜  Local:   http://localhost:5173/
```

### Step 7: Open the app

Go to **http://localhost:5173** in your browser.

- Click **"Sign Up"** to create an account
- After signup, you'll be redirected to the **Dashboard**
- Use the **Edit** and **Password** tabs to manage your profile
- Use **"Logout"** to end your session

---

## Project Structure

```
auth-system/
├── backend/
│   ├── src/
│   │   ├── config/          # Database & environment configuration
│   │   │   ├── db.js
│   │   │   └── env.js
│   │   ├── controllers/     # Request handlers
│   │   │   └── auth.controller.js
│   │   ├── middleware/       # Express middleware
│   │   │   ├── auth.middleware.js      # JWT verification
│   │   │   ├── errorHandler.middleware.js
│   │   │   └── validate.middleware.js  # Zod validation
│   │   ├── models/          # Mongoose schemas
│   │   │   └── user.model.js
│   │   ├── routes/          # Route definitions
│   │   │   ├── auth.routes.js
│   │   │   └── index.js
│   │   ├── services/        # Business logic
│   │   │   ├── auth.service.js
│   │   │   └── token.service.js
│   │   ├── utils/           # Helper utilities
│   │   │   ├── ApiError.js
│   │   │   └── catchAsync.js
│   │   ├── validators/      # Zod validation schemas
│   │   │   └── auth.validator.js
│   │   └── app.js           # Express app setup
│   ├── server.js            # Entry point with graceful shutdown
│   ├── .env                 # Environment variables (not committed)
│   ├── .env.example         # Environment variable template
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/             # Axios instance with interceptors
│   │   │   └── axios.js
│   │   ├── components/      # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/         # React context
│   │   │   └── AuthContext.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── styles/          # Global CSS
│   │   │   └── global.css
│   │   ├── App.jsx          # Root component with routing
│   │   └── main.jsx         # App entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── package.json             # Root scripts (dev:backend, dev:frontend)
├── .gitignore
└── README.md
```

---

## API Reference

All API endpoints are prefixed with `/api`.

### Authentication

| Method | Endpoint | Auth Required | Description |
|--------|----------|:------------:|-------------|
| POST | `/api/auth/signup` | No | Create a new account |
| POST | `/api/auth/login` | No | Log in to existing account |
| POST | `/api/auth/refresh` | No | Get new tokens using refresh token |
| POST | `/api/auth/logout` | Yes | Log out (invalidates refresh token) |

### Profile

| Method | Endpoint | Auth Required | Description |
|--------|----------|:------------:|-------------|
| GET | `/api/auth/profile` | Yes | Get current user profile |
| PATCH | `/api/auth/profile` | Yes | Update name and/or email |
| PUT | `/api/auth/password` | Yes | Change password |

### Request Examples

**Signup:**
```bash
curl -X POST http://localhost:5001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "664f...",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2026-06-15T..."
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Login:**
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Get Profile (protected):**
```bash
curl -X GET http://localhost:5001/api/auth/profile \
  -H "Authorization: Bearer <accessToken>"
```

**Update Profile (protected):**
```bash
curl -X PATCH http://localhost:5001/api/auth/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <accessToken>" \
  -d '{"name":"John Updated"}'
```

**Change Password (protected):**
```bash
curl -X PUT http://localhost:5001/api/auth/password \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <accessToken>" \
  -d '{"currentPassword":"password123","newPassword":"newpassword456"}'
```

**Refresh Token:**
```bash
curl -X POST http://localhost:5001/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"<refreshToken>"}'
```

### Error Response Format

```json
{
  "success": false,
  "message": "Error description here"
}
```

---

## Security Practices

| Practice | Implementation |
|----------|---------------|
| Password hashing | bcrypt with cost factor 12 |
| JWT access tokens | 15-minute expiry |
| JWT refresh tokens | 7-day expiry, rotated on each use |
| Token reuse detection | Old refresh token becomes invalid after use |
| HTTP security headers | Helmet middleware |
| CORS | Restricted to frontend origin only |
| Request validation | Zod schemas validate all inputs |
| Secrets management | All secrets in `.env` (not committed) |
| Error handling | Consistent error format, no stack leaks in production |
| Graceful shutdown | Cleanly closes HTTP server and DB connection |

---

## Troubleshooting

### Port 5000 already in use
macOS may use port 5000 for AirPlay Receiver. Change `PORT` in `backend/.env` to `5001` (already configured) and update the proxy target in `frontend/vite.config.js`.

### MongoDB connection fails
1. Check that your cluster is running (green checkmark in Atlas)
2. Verify `0.0.0.0/0` is in your project's **Network Access** list
3. Confirm your username and password in `MONGO_URI` are correct
4. If your password has special characters, URL-encode them

### Node.js v26 compatibility
If you're on Node.js v26 and the backend hangs on startup, this is due to a native addon incompatibility. Either:
- Use Node.js v22 LTS (recommended)
- Or the project already includes a workaround in `server.js`

---

## References

- [React Documentation](https://react.dev/)
- [Express Documentation](https://expressjs.com/)
- [JWT Documentation](https://jwt.io/)
- [bcrypt Documentation](https://www.npmjs.com/package/bcrypt)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Atlas](https://cloud.mongodb.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Zod Documentation](https://zod.dev/)
