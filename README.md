# E-Shop Backend Learning Project

A full-stack e-commerce application built to learn backend development with Express.js and Firebase.

## 🎯 Project Goal

Learn backend development by building a complete e-shop API from scratch, progressing through 4 difficulty levels.

## 📁 Project Structure

```
backend-app/
├── server/                 # Express.js Backend API (NEW!)
│   ├── src/
│   │   ├── config/        # Firebase Admin configuration
│   │   ├── middleware/    # Auth & error handling
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # Business logic
│   │   └── index.js       # Server entry point
│   ├── .env               # Server environment variables
│   ├── package.json
│   ├── README.md          # Server documentation
│   └── GETTING_STARTED.md # Step-by-step guide
│
├── src/                   # React Frontend (existing)
│   ├── components/
│   ├── pages/
│   ├── Auth/
│   └── firebase.js        # Firebase client SDK
│
├── functions/             # Firebase Cloud Functions
│   └── index.js          # User creation trigger
│
├── .agent/               # Project documentation
│   ├── E-SHOP_ROADMAP.md      # Full learning roadmap
│   ├── RESTRUCTURE_PLAN.md    # Restructuring details
│   └── workflows/
│
├── firebase.json         # Firebase configuration
├── firestore.rules       # Firestore security rules
└── package.json          # Root package.json
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v20 or higher)
- npm
- Firebase CLI (`npm install -g firebase-tools`)

### 1. Install Dependencies

**Root dependencies (React frontend):**

```bash
npm install
```

**Server dependencies:**

```bash
cd server
npm install
cd ..
```

### 2. Start Firebase Emulators

```bash
npm run emulators
```

This starts:

- Auth Emulator: `localhost:9099`
- Firestore Emulator: `localhost:8080`
- Storage Emulator: `localhost:9199`
- Functions Emulator: `localhost:5001`

### 3. Start the Backend Server

In a new terminal:

```bash
npm run server
```

Server runs on: `http://localhost:4000`

### 4. Start the React Frontend

In another terminal:

```bash
npm start
```

Frontend runs on: `http://localhost:3000`

## 📚 Documentation

- **[E-Shop Roadmap](.agent/E-SHOP_ROADMAP.md)** - Complete learning path with 4 difficulty levels
- **[Restructure Plan](.agent/RESTRUCTURE_PLAN.md)** - Details about the project restructuring
- **[Server README](server/README.md)** - Backend API documentation
- **[Getting Started](server/GETTING_STARTED.md)** - Step-by-step implementation guide

## 🎓 Learning Path

### **Level 1: Foundation** (Current)

**Goal:** Build basic product CRUD API

**Your Tasks:**

1. Implement `getAllProducts()` in `server/src/controllers/products.controller.js`
2. Implement `getProductById()`
3. Implement `createProduct()`
4. Implement `updateProduct()`
5. Implement `deleteProduct()`

**What's Already Done:**

- ✅ Express.js server setup
- ✅ Firebase Admin SDK integration
- ✅ Authentication middleware
- ✅ Product routes with validation
- ✅ Error handling
- ✅ CORS configuration

**Next Steps:**

- Read `server/GETTING_STARTED.md`
- Implement the 5 CRUD functions
- Test with Postman
- Move to Level 2!

### Future Levels:

- **Level 2:** Shopping cart & orders
- **Level 3:** Payments, reviews, discounts
- **Level 4:** Microservices, real-time features, deployment

## 🔌 API Endpoints

### Health Check

```
GET http://localhost:4000/
```

### Authentication

```
GET  /api/auth/me          # Get current user (requires token)
POST /api/auth/register    # Register (handled by Firebase client)
POST /api/auth/login       # Login (handled by Firebase client)
```

### Products (TODO - Implement these!)

```
GET    /api/products       # Get all products
GET    /api/products/:id   # Get single product
POST   /api/products       # Create product (admin only)
PUT    /api/products/:id   # Update product (admin only)
DELETE /api/products/:id   # Delete product (admin only)
```

## 🔐 Authentication

The API uses Firebase Authentication with Bearer tokens.

**How to get a token:**

1. Login via Firebase Auth on the frontend
2. Get token: `await user.getIdToken()`
3. Include in requests: `Authorization: Bearer <token>`

## 🧪 Testing

### With Postman:

1. Import the API endpoints
2. Get a Firebase ID token from your frontend
3. Add to Authorization header
4. Test each endpoint

### Example Request:

```bash
curl -X GET http://localhost:4000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🛠️ Tech Stack

### Backend:

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **Validation:** Express-validator

### Frontend:

- **Framework:** React
- **Routing:** React Router
- **Styling:** CSS
- **Icons:** Font Awesome
- **Firebase:** Firebase Client SDK

### DevOps:

- **Emulators:** Firebase Emulators
- **Dev Server:** Nodemon
- **Version Control:** Git

## 📝 Available Scripts

### Root Directory:

- `npm start` - Start React frontend
- `npm run server` - Start Express backend
- `npm run client` - Start React frontend (alias)
- `npm run emulators` - Start Firebase emulators

### Server Directory:

- `npm run dev` - Start server with nodemon (auto-reload)
- `npm start` - Start server (production mode)

## 🔧 Environment Variables

### Server (.env)

```env
PORT=4000
NODE_ENV=development
FIREBASE_PROJECT_ID=backend-app-jl
USE_EMULATORS=true
```

### Root (.env)

Contains Firebase client configuration (already set up)

## 📖 Learning Resources

- [Express.js Docs](https://expressjs.com/)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Firestore Guide](https://firebase.google.com/docs/firestore)
- [REST API Best Practices](https://restfulapi.net/)

## 🐛 Troubleshooting

### Server won't start

- Check if port 4000 is available
- Make sure dependencies are installed: `cd server && npm install`
- Check Firebase emulators are running

### "Cannot connect to Firestore"

- Ensure Firebase emulators are running
- Check emulator ports in server/.env
- Verify FIRESTORE_EMULATOR_HOST is set correctly

### Authentication errors

- Make sure you're sending the Bearer token
- Token format: `Authorization: Bearer <token>`
- Check token is not expired (get a fresh one)

## 🎯 Success Criteria (Level 1)

You've completed Level 1 when:

- ✅ All 5 product CRUD operations work
- ✅ Products are stored in Firestore
- ✅ Validation works correctly
- ✅ Error handling works
- ✅ You can test all endpoints with Postman

## 🚀 What's Next?

After completing Level 1:

1. Review your code
2. Add more features (pagination, search)
3. Connect React frontend to your API
4. Move to Level 2 (Shopping Cart & Orders)

## 📞 Need Help?

- Check `server/GETTING_STARTED.md` for step-by-step guide
- Read the hints in `products.controller.js`
- Review the Firestore cheat sheet in GETTING_STARTED.md
- Check the E-Shop Roadmap for the big picture

---

**Happy Learning! 🎓 Start with `server/GETTING_STARTED.md`**
