# Project Restructuring Plan - Level 1 Backend

## 🎯 Goal

Restructure the project to separate frontend (React) and backend (Express API) while keeping existing User authentication working.

## 📁 Current Structure

```
backend-app/
├── src/                    # React frontend
├── functions/              # Firebase Cloud Functions
│   └── index.js           # User creation trigger (KEEP THIS)
├── public/                 # React public files
└── package.json           # React dependencies
```

## 📁 New Structure (Level 1)

```
backend-app/
├── client/                 # React frontend (moved from src/)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/                 # NEW - Express.js Backend API
│   ├── src/
│   │   ├── config/
│   │   │   └── firebase.js          # Firebase Admin SDK config
│   │   ├── middleware/
│   │   │   ├── auth.js              # Authentication middleware
│   │   │   └── errorHandler.js      # Error handling middleware
│   │   ├── routes/
│   │   │   ├── auth.routes.js       # Auth endpoints (KEEP existing)
│   │   │   └── products.routes.js   # Product CRUD (NEW - for you to build)
│   │   ├── controllers/
│   │   │   ├── auth.controller.js   # Auth logic
│   │   │   └── products.controller.js # Product logic (NEW - for you to build)
│   │   ├── models/
│   │   │   └── product.model.js     # Product validation (NEW - for you to build)
│   │   ├── utils/
│   │   │   └── validators.js        # Input validation helpers
│   │   └── index.js                 # Express app entry point
│   ├── .env                         # Environment variables
│   └── package.json                 # Backend dependencies
│
├── functions/              # Firebase Cloud Functions (KEEP AS IS)
│   └── index.js           # User creation trigger
│
├── firebase.json          # Firebase config
├── firestore.rules        # Firestore security rules
└── package.json           # Root package.json (workspace management)
```

## 🔧 What Gets Created

### 1. **Server Setup** (I'll create the structure)

- Express.js server on port 4000
- Firebase Admin SDK integration
- CORS configuration for React frontend
- Basic error handling
- Authentication middleware (using your existing Firebase Auth)

### 2. **Auth Routes** (I'll set up, already working)

- `POST /api/auth/register` - Register user (uses Firebase Auth)
- `POST /api/auth/login` - Login user (uses Firebase Auth)
- `GET /api/auth/me` - Get current user info

### 3. **Product Routes** (Structure only - YOU implement)

- `GET /api/products` - List all products (TODO)
- `GET /api/products/:id` - Get single product (TODO)
- `POST /api/products` - Create product (TODO - admin only)
- `PUT /api/products/:id` - Update product (TODO - admin only)
- `DELETE /api/products/:id` - Delete product (TODO - admin only)

## 📦 Dependencies to Install

### Server (Express Backend)

```json
{
  "express": "^4.18.2",
  "firebase-admin": "^12.6.0",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "express-validator": "^7.0.1",
  "nodemon": "^3.0.2"
}
```

## 🚀 Scripts

### Root package.json

```json
{
  "scripts": {
    "client": "cd client && npm start",
    "server": "cd server && npm run dev",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "emulators": "firebase emulators:start"
  }
}
```

### Server package.json

```json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  }
}
```

## 🔐 What I'll Keep Working

1. **Firebase Authentication** - Your existing auth setup
2. **User Creation Trigger** - The Cloud Function that creates user profiles
3. **Firebase Emulators** - Local development environment
4. **React Frontend** - Moved to `client/` folder

## 📝 What You'll Implement (Level 1)

1. **Product Controller** - Business logic for CRUD operations
2. **Product Routes** - Connect endpoints to controllers
3. **Product Model** - Validation schemas
4. **Firestore Integration** - Read/write products to Firestore

## 🎓 Learning Path

After restructuring, you'll implement:

### Step 1: Create Product Model

- Define product schema
- Add validation rules

### Step 2: Implement Product Controller

- `getAllProducts()` - Fetch from Firestore
- `getProductById()` - Fetch single product
- `createProduct()` - Add new product
- `updateProduct()` - Update existing product
- `deleteProduct()` - Delete product

### Step 3: Connect Routes

- Wire up controllers to routes
- Add authentication middleware
- Test with Postman

### Step 4: Test Everything

- Test each endpoint
- Verify authentication works
- Check error handling

## 🔄 Migration Steps

1. ✅ Create `server/` directory structure
2. ✅ Set up Express.js with Firebase Admin
3. ✅ Create authentication middleware
4. ✅ Set up auth routes (working with existing Firebase Auth)
5. ✅ Create product routes structure (empty - for you to fill)
6. ✅ Move React app to `client/` folder
7. ✅ Update scripts and configs
8. ✅ Test that everything still works

## ⚠️ Important Notes

- **Firebase Emulators**: Will continue to work, server connects to them
- **Port 3000**: React frontend
- **Port 4000**: Express backend API
- **Port 9099**: Firebase Auth Emulator
- **Port 8080**: Firestore Emulator
- **Port 9199**: Storage Emulator

## 🎯 Your Next Steps After Restructuring

1. Read the TODO comments in the code
2. Implement product controller methods
3. Test each endpoint with Postman
4. Connect React frontend to new API endpoints
5. Celebrate! 🎉

---

Ready to restructure? This will:

- ✅ Keep your User auth working
- ✅ Create proper backend structure
- ✅ Set up Express.js API
- ✅ Leave product implementation for you to learn
