# E-Shop Backend Server

Express.js REST API for the e-shop application with Firebase integration.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Start the Server

```bash
npm run dev
```

The server will start on `http://localhost:5000`

## 📁 Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── firebase.js          # Firebase Admin SDK configuration
│   ├── middleware/
│   │   ├── auth.js              # Authentication middleware
│   │   └── errorHandler.js      # Error handling middleware
│   ├── routes/
│   │   ├── auth.routes.js       # Auth endpoints
│   │   └── products.routes.js   # Product CRUD endpoints
│   ├── controllers/
│   │   ├── auth.controller.js   # Auth business logic
│   │   └── products.controller.js # Product business logic (TODO)
│   └── index.js                 # Express app entry point
├── .env                         # Environment variables
└── package.json
```

## 🔌 API Endpoints

### Health Check

- `GET /` - Server health check

### Authentication

- `GET /api/auth/me` - Get current user (requires auth token)
- `POST /api/auth/register` - Register user (handled by Firebase client)
- `POST /api/auth/login` - Login user (handled by Firebase client)

### Products (TODO - For you to implement!)

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

## 🔐 Authentication

The API uses Firebase Authentication with Bearer tokens.

### How to authenticate:

1. Login via Firebase Auth on the client
2. Get the ID token: `await user.getIdToken()`
3. Include in request headers:

```
Authorization: Bearer <your-token-here>
```

### Example with fetch:

```javascript
const token = await user.getIdToken();

const response = await fetch("http://localhost:5000/api/auth/me", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

## 📝 Your Tasks (Level 1)

You need to implement the following in `src/controllers/products.controller.js`:

### 1. `getAllProducts()`

- Fetch all products from Firestore
- Return array of products

**Hint:**

```javascript
const snapshot = await db.collection("products").get();
const products = snapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));
```

### 2. `getProductById()`

- Get product ID from `req.params.id`
- Fetch from Firestore
- Return product or 404

**Hint:**

```javascript
const doc = await db.collection("products").doc(id).get();
if (!doc.exists) {
  return res.status(404).json({ error: "Product not found" });
}
```

### 3. `createProduct()`

- Get data from `req.body`
- Validate (already done by middleware)
- Create in Firestore
- Return created product

**Hint:**

```javascript
const docRef = await db.collection("products").add({
  ...req.body,
  createdAt: new Date(),
});
```

### 4. `updateProduct()`

- Get ID from `req.params.id`
- Get updates from `req.body`
- Update in Firestore
- Return updated product

**Hint:**

```javascript
await db
  .collection("products")
  .doc(id)
  .update({
    ...req.body,
    updatedAt: new Date(),
  });
```

### 5. `deleteProduct()`

- Get ID from `req.params.id`
- Delete from Firestore
- Return success message

**Hint:**

```javascript
await db.collection("products").doc(id).delete();
```

## 🧪 Testing with Postman

### 1. Test Health Check

```
GET http://localhost:4000/
```

### 2. Test Get All Products

```
GET http://localhost:4000/api/products
```

### 3. Test Create Product (requires admin token)

```
POST http://localhost:4000/api/products
Headers:
  Authorization: Bearer <your-admin-token>
  Content-Type: application/json
Body:
{
  "name": "Test Product",
  "description": "This is a test product",
  "price": 29.99,
  "stock": 100,
  "category": "electronics",
  "images": ["https://example.com/image.jpg"]
}
```

## 🔧 Environment Variables

The `.env` file contains:

- `PORT` - Server port (default: 4000)
- `NODE_ENV` - Environment (development/production)
- `FIREBASE_PROJECT_ID` - Your Firebase project ID
- `USE_EMULATORS` - Use Firebase emulators (true/false)

## 📚 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Firestore CRUD Operations](https://firebase.google.com/docs/firestore/manage-data/add-data)
- [Express Validator](https://express-validator.github.io/docs/)

## 🎯 Next Steps

1. ✅ Server structure created
2. ✅ Authentication working
3. ⏳ Implement product CRUD (your task!)
4. ⏳ Test with Postman
5. ⏳ Connect React frontend to API

Good luck! 🚀
