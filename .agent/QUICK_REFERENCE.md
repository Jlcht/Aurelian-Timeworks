# 🚀 Quick Reference Card

## 📍 Ports & URLs

| Service                | Port | URL                             |
| ---------------------- | ---- | ------------------------------- |
| React Frontend         | 3000 | http://localhost:3000           |
| Express Backend        | 5000 | http://localhost:5000           |
| Firebase Auth Emulator | 9099 | http://localhost:9099           |
| Firestore Emulator     | 8080 | http://localhost:4000/firestore |
| Storage Emulator       | 9199 | http://localhost:9199           |
| Functions Emulator     | 5001 | http://localhost:5001           |

---

## 🎯 Your Tasks (Level 1)

**File:** `server/src/controllers/products.controller.js`

| Function           | What it does     | Firestore method                                 |
| ------------------ | ---------------- | ------------------------------------------------ |
| `getAllProducts()` | Get all products | `db.collection('products').get()`                |
| `getProductById()` | Get one product  | `db.collection('products').doc(id).get()`        |
| `createProduct()`  | Create product   | `db.collection('products').add(data)`            |
| `updateProduct()`  | Update product   | `db.collection('products').doc(id).update(data)` |
| `deleteProduct()`  | Delete product   | `db.collection('products').doc(id).delete()`     |

---

## ⚡ Quick Commands

```bash
# Install server dependencies
cd server && npm install

# Start server (with auto-reload)
cd server && npm run dev

# Start React frontend
npm start

# Start Firebase emulators
npm run emulators

# From root - start server
npm run server
```

---

## 📝 Code Snippets

### Get All Documents

```javascript
const snapshot = await db.collection("products").get();
const products = snapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));
```

### Get Single Document

```javascript
const doc = await db.collection("products").doc(id).get();
if (!doc.exists) {
  return res.status(404).json({ error: "Not found" });
}
const product = { id: doc.id, ...doc.data() };
```

### Create Document

```javascript
const docRef = await db.collection("products").add({
  ...req.body,
  createdAt: new Date(),
});
const id = docRef.id;
```

### Update Document

```javascript
await db
  .collection("products")
  .doc(id)
  .update({
    ...req.body,
    updatedAt: new Date(),
  });
```

### Delete Document

```javascript
await db.collection("products").doc(id).delete();
```

---

## 🧪 Testing Endpoints

### Health Check

```bash
curl http://localhost:5000/
```

### Get All Products

```bash
curl http://localhost:5000/api/products
```

### Create Product (with token)

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","description":"Test product","price":29.99,"stock":100}'
```

---

## 📚 Documentation Files

| File                            | Purpose                             |
| ------------------------------- | ----------------------------------- |
| `server/GETTING_STARTED.md`     | **START HERE** - Step-by-step guide |
| `server/README.md`              | API documentation                   |
| `server/POSTMAN_GUIDE.md`       | Testing guide                       |
| `.agent/ARCHITECTURE.md`        | System architecture                 |
| `.agent/E-SHOP_ROADMAP.md`      | Full roadmap (4 levels)             |
| `.agent/RESTRUCTURE_SUMMARY.md` | What was done                       |

---

## 🔐 Authentication

### Get Token (React)

```javascript
const user = auth.currentUser;
const token = await user.getIdToken();
```

### Use Token (API Request)

```javascript
fetch("http://localhost:5000/api/products", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

---

## ✅ Checklist

### Setup

- [ ] Install server dependencies
- [ ] Start Firebase emulators
- [ ] Start Express server
- [ ] Test health check endpoint

### Implementation

- [ ] Implement `getAllProducts()`
- [ ] Implement `getProductById()`
- [ ] Implement `createProduct()`
- [ ] Implement `updateProduct()`
- [ ] Implement `deleteProduct()`

### Testing

- [ ] Test GET all products
- [ ] Test GET single product
- [ ] Test POST create product
- [ ] Test PUT update product
- [ ] Test DELETE product
- [ ] Test validation errors
- [ ] Test authentication errors

---

## 🐛 Common Errors

| Error                       | Cause                  | Fix                                     |
| --------------------------- | ---------------------- | --------------------------------------- |
| Port 4000 in use            | Server already running | Stop other server or use different port |
| Cannot connect to Firestore | Emulators not running  | Run `npm run emulators`                 |
| 401 Unauthorized            | Missing/invalid token  | Add Bearer token to headers             |
| 403 Forbidden               | Not admin              | Use admin token or remove requireAdmin  |
| 404 Not Found               | Wrong product ID       | Check ID exists in Firestore            |
| 501 Not Implemented         | Function not coded yet | Implement the function!                 |

---

## 💡 Pro Tips

1. **Start with `getAllProducts()`** - Easiest to implement
2. **Test after each function** - Don't implement all at once
3. **Use console.log()** - Debug by logging variables
4. **Check Firestore UI** - See your data in emulator
5. **Read error messages** - They tell you what's wrong
6. **Follow the hints** - Each TODO has helpful comments

---

## 🎯 Success = All 5 Functions Working!

When you can:

- ✅ Get all products
- ✅ Get single product
- ✅ Create new product
- ✅ Update existing product
- ✅ Delete product

**You've completed Level 1! 🎉**

---

## 📞 Need Help?

1. Read `server/GETTING_STARTED.md`
2. Check code hints in controller file
3. Review `server/POSTMAN_GUIDE.md`
4. Look at `ARCHITECTURE.md` for big picture

---

**Print this and keep it handy! 📌**
