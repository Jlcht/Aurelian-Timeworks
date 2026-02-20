# Postman Testing Guide

Quick reference for testing your e-shop API endpoints.

## 🔧 Setup

### 1. Base URL

```
http://localhost:5000
```

### 2. Get Authentication Token

**From React Frontend:**

```javascript
// After user logs in
const user = auth.currentUser;
const token = await user.getIdToken();
console.log("Token:", token);
```

**Copy this token** - you'll need it for authenticated requests.

---

## 📋 Endpoint Tests

### 1. Health Check

**No authentication required**

```
Method: GET
URL: http://localhost:5000/
Headers: None
Body: None
```

**Expected Response:**

```json
{
  "success": true,
  "message": "E-Shop Backend API is running! 🚀",
  "version": "1.0.0",
  "endpoints": {
    "auth": "/api/auth",
    "products": "/api/products"
  }
}
```

---

### 2. Get Current User

**Requires authentication**

```
Method: GET
URL: http://localhost:5000/api/auth/me
Headers:
  Authorization: Bearer YOUR_TOKEN_HERE
Body: None
```

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "uid": "user_id",
    "email": "user@example.com",
    "role": "customer",
    "profile": {
      "profileImage": "...",
      "userEmail": "user@example.com"
    }
  }
}
```

---

### 3. Get All Products

**No authentication required**

```
Method: GET
URL: http://localhost:5000/api/products
Headers: None
Body: None
```

**Expected Response (after you implement it):**

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "product_1",
      "name": "Product 1",
      "description": "Description",
      "price": 29.99,
      "stock": 100,
      "category": "electronics",
      "images": ["url1"],
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### 4. Get Single Product

**No authentication required**

```
Method: GET
URL: http://localhost:5000/api/products/PRODUCT_ID_HERE
Headers: None
Body: None
```

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "id": "product_1",
    "name": "Product 1",
    "description": "Description",
    "price": 29.99,
    "stock": 100
  }
}
```

---

### 5. Create Product

**Requires admin authentication**

```
Method: POST
URL: http://localhost:5000/api/products
Headers:
  Authorization: Bearer YOUR_ADMIN_TOKEN_HERE
  Content-Type: application/json
Body (raw JSON):
{
  "name": "Gaming Laptop",
  "description": "High-performance gaming laptop with RTX 4080",
  "price": 1999.99,
  "stock": 50,
  "category": "electronics",
  "images": [
    "https://example.com/laptop1.jpg",
    "https://example.com/laptop2.jpg"
  ]
}
```

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "id": "new_product_id",
    "name": "Gaming Laptop",
    "description": "High-performance gaming laptop with RTX 4080",
    "price": 1999.99,
    "stock": 50,
    "category": "electronics",
    "images": ["..."],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Validation Errors:**

```json
{
  "success": false,
  "errors": [
    {
      "msg": "Product name is required",
      "param": "name",
      "location": "body"
    }
  ]
}
```

---

### 6. Update Product

**Requires admin authentication**

```
Method: PUT
URL: http://localhost:5000/api/products/PRODUCT_ID_HERE
Headers:
  Authorization: Bearer YOUR_ADMIN_TOKEN_HERE
  Content-Type: application/json
Body (raw JSON):
{
  "name": "Gaming Laptop Pro",
  "description": "Updated description",
  "price": 2199.99,
  "stock": 45,
  "category": "electronics",
  "images": ["https://example.com/new-image.jpg"]
}
```

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "id": "product_id",
    "name": "Gaming Laptop Pro",
    "price": 2199.99,
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 7. Delete Product

**Requires admin authentication**

```
Method: DELETE
URL: http://localhost:4000/api/products/PRODUCT_ID_HERE
Headers:
  Authorization: Bearer YOUR_ADMIN_TOKEN_HERE
Body: None
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## 🔐 Admin Access

### Option 1: Temporary (for testing)

Remove `requireAdmin` middleware from routes:

In `server/src/routes/products.routes.js`:

```javascript
// Before (admin only)
router.post("/", authenticate, requireAdmin, productValidation, createProduct);

// After (any authenticated user)
router.post("/", authenticate, productValidation, createProduct);
```

### Option 2: Set User as Admin

Manually set role in Firestore:

1. Go to Firestore Emulator UI: `http://localhost:4000/firestore`
2. Find your user in `users` collection
3. Add field: `role: "admin"`

---

## 🧪 Testing Workflow

### Step 1: Test Health Check

- Verify server is running
- Should return 200 OK

### Step 2: Test Authentication

- Login via React frontend
- Get ID token
- Test `/api/auth/me` endpoint

### Step 3: Test Get All Products

- Should return empty array initially
- Or return existing products

### Step 4: Test Create Product

- Create a test product
- Verify it's created in Firestore
- Check response has product ID

### Step 5: Test Get Single Product

- Use ID from created product
- Verify product data is correct

### Step 6: Test Update Product

- Update the created product
- Verify changes are saved

### Step 7: Test Delete Product

- Delete the test product
- Verify it's removed from Firestore

---

## 📝 Sample Products for Testing

### Electronics

```json
{
  "name": "Wireless Headphones",
  "description": "Premium noise-cancelling wireless headphones with 30-hour battery life",
  "price": 299.99,
  "stock": 150,
  "category": "electronics",
  "images": ["https://example.com/headphones.jpg"]
}
```

### Clothing

```json
{
  "name": "Cotton T-Shirt",
  "description": "Comfortable 100% cotton t-shirt available in multiple colors",
  "price": 24.99,
  "stock": 500,
  "category": "clothing",
  "images": ["https://example.com/tshirt.jpg"]
}
```

### Books

```json
{
  "name": "JavaScript: The Good Parts",
  "description": "Essential guide to JavaScript programming best practices",
  "price": 34.99,
  "stock": 75,
  "category": "books",
  "images": ["https://example.com/book.jpg"]
}
```

---

## ❌ Common Errors

### 401 Unauthorized

```json
{
  "success": false,
  "error": "No token provided"
}
```

**Fix:** Add Authorization header with Bearer token

### 403 Forbidden

```json
{
  "success": false,
  "error": "Admin access required"
}
```

**Fix:** Use admin token or remove requireAdmin middleware

### 404 Not Found

```json
{
  "success": false,
  "error": "Product not found"
}
```

**Fix:** Check product ID is correct

### 400 Bad Request

```json
{
  "success": false,
  "errors": [...]
}
```

**Fix:** Check request body matches validation rules

### 501 Not Implemented

```json
{
  "success": false,
  "error": "Not implemented yet"
}
```

**Fix:** This means you haven't implemented the function yet!

---

## 💡 Pro Tips

1. **Save Requests** - Save all requests in a Postman collection
2. **Use Variables** - Set `{{baseUrl}}` and `{{token}}` as variables
3. **Test Scripts** - Add tests to verify responses
4. **Environment** - Create separate environments for dev/prod
5. **Pre-request Scripts** - Auto-refresh tokens if needed

---

## 🎯 Testing Checklist

- [ ] Server health check works
- [ ] Can get current user with token
- [ ] Can get all products (empty or with data)
- [ ] Can create a product (with admin token)
- [ ] Can get single product by ID
- [ ] Can update a product
- [ ] Can delete a product
- [ ] Validation errors work correctly
- [ ] Authentication errors work correctly
- [ ] 404 errors for non-existent products

---

**Happy Testing! 🧪**
