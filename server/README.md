# Express.js Server — Admin API

Local Express.js server using Firebase Admin SDK. Used for admin tasks and product management.

**Runs on:** `http://localhost:4000`

---

## Quick Start

```bash
cd server
npm install
npm run dev
```

---

## Structure

```
server/src/
├── config/firebase.js          # Firebase Admin SDK init
├── middleware/auth.js           # Bearer token verification
├── middleware/errorHandler.js   # Global error handling
├── routes/auth.routes.js        # Auth endpoints
├── routes/products.routes.js    # Product CRUD endpoints
├── controllers/auth.controller.js
├── controllers/products.controller.js
└── index.js                     # Entry point
```

---

## API Endpoints

```
GET    /                    # Health check
GET    /api/auth/me         # Get current user (requires token)
GET    /api/products        # Get all products
GET    /api/products/:id    # Get single product
POST   /api/products        # Create product (admin only)
PUT    /api/products/:id    # Update product (admin only)
DELETE /api/products/:id    # Delete product (admin only)
```

---

## Authentication

Firebase Bearer token required for protected routes:

```bash
curl http://localhost:4000/api/auth/me \
  -H "Authorization: Bearer YOUR_FIREBASE_ID_TOKEN"
```

Get a token from the frontend: `await user.getIdToken()`

---

## Environment Variables

Create `server/.env`:

```env
PORT=4000
NODE_ENV=development
FIREBASE_PROJECT_ID=backend-app-jl
USE_EMULATORS=false
```
