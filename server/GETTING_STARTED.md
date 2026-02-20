# Getting Started - Level 1 Backend

Welcome! Your project has been restructured for backend development. Here's what you need to do:

## ✅ What's Already Done

1. **Express.js Server** - Fully configured and ready
2. **Firebase Integration** - Connected to your emulators
3. **Authentication** - Working with your existing Firebase Auth
4. **Product Routes** - Structure created with validation
5. **Middleware** - Auth, error handling, CORS configured

## 🎯 Your Mission (Level 1)

Implement the 5 product CRUD operations in:
`server/src/controllers/products.controller.js`

### The 5 Functions to Implement:

1. **`getAllProducts()`** - Fetch all products from Firestore
2. **`getProductById()`** - Get a single product by ID
3. **`createProduct()`** - Create a new product
4. **`updateProduct()`** - Update an existing product
5. **`deleteProduct()`** - Delete a product

## 🚀 Step-by-Step Guide

### Step 1: Install Dependencies

```bash
cd server
npm install
```

### Step 2: Start the Server

```bash
npm run dev
```

You should see:

```
🚀 Server running on port 4000
🚀 Environment: development
```

### Step 3: Test the Server

Open your browser or Postman and visit:

```
http://localhost:5000/
```

You should see a JSON response confirming the server is running.

### Step 4: Implement Your First Function

Open `server/src/controllers/products.controller.js`

Start with `getAllProducts()`:

```javascript
const getAllProducts = async (req, res, next) => {
  try {
    // 1. Get all products from Firestore
    const snapshot = await db.collection("products").get();

    // 2. Convert to array
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // 3. Return response
    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};
```

### Step 5: Test Your Implementation

Use Postman or curl:

```bash
curl http://localhost:5000/api/products
```

### Step 6: Repeat for Other Functions

Follow the same pattern for:

- `getProductById()` - Use `db.collection('products').doc(id).get()`
- `createProduct()` - Use `db.collection('products').add(data)`
- `updateProduct()` - Use `db.collection('products').doc(id).update(data)`
- `deleteProduct()` - Use `db.collection('products').doc(id).delete()`

## 📖 Firestore Cheat Sheet

### Get all documents

```javascript
const snapshot = await db.collection("products").get();
const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
```

### Get single document

```javascript
const doc = await db.collection("products").doc(id).get();
if (!doc.exists) {
  // Handle not found
}
const data = doc.data();
```

### Create document

```javascript
const docRef = await db.collection("products").add({
  name: "Product",
  price: 29.99,
  createdAt: new Date(),
});
const id = docRef.id;
```

### Update document

```javascript
await db.collection("products").doc(id).update({
  price: 39.99,
  updatedAt: new Date(),
});
```

### Delete document

```javascript
await db.collection("products").doc(id).delete();
```

## 🧪 Testing Checklist

- [ ] Server starts without errors
- [ ] GET `/` returns health check
- [ ] GET `/api/products` returns empty array (or products if you added some)
- [ ] POST `/api/products` creates a product (requires admin token)
- [ ] GET `/api/products/:id` returns single product
- [ ] PUT `/api/products/:id` updates product
- [ ] DELETE `/api/products/:id` deletes product

## 🔐 Admin Access

To test admin-only endpoints (create/update/delete), you need:

1. Create a user via Firebase Auth
2. Get the user's ID token
3. Set the user as admin in Firestore (manually for now)
4. Use the token in Authorization header

**Quick tip:** For testing, you can temporarily remove the `requireAdmin` middleware from the routes.

## 🐛 Common Issues

### "Collection not found"

- Make sure Firebase emulators are running
- Check that Firestore emulator is on port 8080

### "Authentication failed"

- Make sure you're sending the Bearer token
- Token format: `Authorization: Bearer <token>`

### "Validation errors"

- Check that your request body matches the validation rules
- Required fields: name, description, price, stock

## 📚 Resources

- **Server README**: `server/README.md`
- **Roadmap**: `.agent/E-SHOP_ROADMAP.md`
- **Restructure Plan**: `.agent/RESTRUCTURE_PLAN.md`

## 🎓 Learning Tips

1. **Start Simple** - Implement `getAllProducts()` first
2. **Test Often** - Test each function before moving to the next
3. **Read Errors** - Error messages tell you what's wrong
4. **Use Console.log** - Debug by logging variables
5. **Check Firestore** - Use Firebase Emulator UI to see your data

## 🎉 Success Criteria

You've completed Level 1 when:

- ✅ All 5 CRUD operations work
- ✅ Products are stored in Firestore
- ✅ Validation works correctly
- ✅ Error handling works
- ✅ You can test all endpoints with Postman

## 🚀 What's Next?

After completing Level 1, you can:

1. Add more product fields (images, ratings, etc.)
2. Implement pagination
3. Add search and filtering
4. Move to Level 2 (Shopping Cart & Orders)

---

**You got this! Start coding and have fun learning! 🎓**

Need help? Check the hints in the controller file or the server README.
