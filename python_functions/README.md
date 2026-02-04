# Python Cloud Functions - User Profile Management API

This directory contains Python Cloud Functions for the Backend App, providing RESTful API endpoints for user profile management integrated with Firebase Firestore.

---

## 📦 Functions Overview

### 1. `manage_user_profile` (HTTP Request Function)

RESTful HTTP endpoint for creating, reading, and updating user profiles.

**Endpoint (Local)**: `http://127.0.0.1:5001/backend-app-jl/us-central1/manage_user_profile`  
**Endpoint (Production)**: `https://us-central1-backend-app-jl.cloudfunctions.net/manage_user_profile`

#### **GET - Retrieve User Profile**

Fetches a user's profile from Firestore.

**Request:**

```bash
curl "http://127.0.0.1:5001/backend-app-jl/us-central1/manage_user_profile?userId=abc123"
```

**Response (200 OK):**

```json
{
  "success": true,
  "userId": "abc123",
  "profile": {
    "userProfile": {
      "profileImage": "https://example.com/image.jpg",
      "userEmail": "user@example.com",
      "displayName": "John Doe",
      "bio": "Software developer from Paris",
      "location": "Paris, France"
    },
    "updatedAt": "2026-02-04T18:30:00+00:00"
  }
}
```

**Error Responses:**

- `400` - Missing userId parameter
- `404` - User not found
- `500` - Internal server error

#### **POST - Update User Profile**

Creates or updates a user's profile in Firestore.

**Request:**

```bash
curl -X POST http://127.0.0.1:5001/backend-app-jl/us-central1/manage_user_profile \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "abc123",
    "profileData": {
      "userProfile": {
        "profileImage": "https://example.com/avatar.jpg",
        "userEmail": "user@example.com",
        "displayName": "John Doe",
        "bio": "Software developer",
        "location": "Paris, France"
      }
    }
  }'
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "userId": "abc123"
}
```

**Error Responses:**

- `400` - Missing userId or request body
- `500` - Internal server error

---

### 2. `get_user_stats` (Callable Function)

Secure callable function for retrieving user statistics. Designed for authenticated frontend calls.

**Usage in React:**

```javascript
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions();
const getUserStats = httpsCallable(functions, "get_user_stats");

const result = await getUserStats({ userId: "abc123" });
console.log(result.data);
```

**Response:**

```json
{
  "success": true,
  "stats": {
    "userId": "abc123",
    "displayName": "John Doe",
    "accountCreated": "2026-02-01T10:00:00",
    "lastUpdated": "2026-02-04T18:30:00",
    "profileComplete": true
  }
}
```

---

## � Technical Details

### **CORS Configuration**

Manual CORS headers are set for cross-origin requests:

```python
headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}
```

**⚠️ Production Note**: Change `'*'` to your specific domain for security.

### **Datetime Serialization**

Firestore timestamps are automatically converted to ISO format strings:

```python
if 'updatedAt' in profile_data and profile_data['updatedAt']:
    profile_data['updatedAt'] = profile_data['updatedAt'].isoformat()
```

### **Error Handling**

All endpoints return JSON responses with proper HTTP status codes:

- `200` - Success
- `204` - No Content (OPTIONS)
- `400` - Bad Request
- `404` - Not Found
- `405` - Method Not Allowed
- `500` - Internal Server Error

---

## 🚀 Local Development

### **Prerequisites**

- Python 3.11+
- Firebase CLI
- Firebase Emulators running

### **Setup**

1. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

2. **Start Firebase Emulators** (from project root)

   ```bash
   firebase emulators:start
   ```

3. **Verify functions are loaded**
   Check the emulator output for:
   ```
   ✔  functions[python_functions-manage_user_profile]: http function initialized
   ✔  functions[python_functions-get_user_stats]: http function initialized
   ```

### **Testing**

Run the automated test suite:

```bash
python test_functions.py
```

**Expected Output:**

```
============================================================
🚀 Starting Python Cloud Functions Tests
============================================================

🧪 Testing POST Update User Profile...
   Status Code: 200
   Response: {"success": true, "message": "Profile updated successfully", ...}

🧪 Testing GET After Update...
   Status Code: 200
   Response: {"success": true, "userId": "test123", "profile": {...}}
   ✅ Profile data verified!

============================================================
📊 Test Summary
============================================================
Update Profile: ✅ PASSED
Get Profile: ✅ PASSED

Total: 2/2 tests passed
============================================================
```

---

## � Firestore Data Structure

### **Collection: `users`**

```
users/
  └── {userId}/
      └── userProfile/
          ├── profileImage: string (URL)
          ├── userEmail: string
          ├── displayName: string
          ├── bio: string
          ├── location: string
          └── updatedAt: timestamp (auto-generated)
```

### **Example Document:**

```json
{
  "userProfile": {
    "profileImage": "https://github.com/username.png",
    "userEmail": "user@example.com",
    "displayName": "John Doe",
    "bio": "Full-stack developer passionate about Firebase",
    "location": "Paris, France"
  },
  "updatedAt": "2026-02-04T18:30:00.123456+00:00"
}
```

---

## 🔗 Integration with React Dashboard

The Dashboard component (`src/Auth/Dashboard.js`) uses these functions:

### **Fetch Profile on Load**

```javascript
const response = await fetch(
  `${API_BASE_URL}/manage_user_profile?userId=${user.uid}`,
);
const data = await response.json();
```

### **Update Profile on Save**

```javascript
const response = await fetch(`${API_BASE_URL}/manage_user_profile`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    userId: user.uid,
    profileData: {
      userProfile: {
        profileImage: editedProfile.profileImage,
        displayName: editedProfile.displayName,
        bio: editedProfile.bio,
        location: editedProfile.location,
      },
    },
  }),
});
```

---

## 🚀 Deployment

### **Deploy to Firebase**

1. **Deploy all Python functions**

   ```bash
   firebase deploy --only functions:python_functions
   ```

2. **Deploy specific function**

   ```bash
   firebase deploy --only functions:python_functions:manage_user_profile
   ```

3. **View deployment logs**
   ```bash
   firebase functions:log --only python_functions
   ```

### **Production URLs**

After deployment, functions are available at:

```
https://us-central1-backend-app-jl.cloudfunctions.net/manage_user_profile
https://us-central1-backend-app-jl.cloudfunctions.net/get_user_stats
```

---

## � Security Best Practices

### **1. Restrict CORS Origins**

For production, update `main.py`:

```python
headers = {
    'Access-Control-Allow-Origin': 'https://your-app.web.app',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}
```

### **2. Add Authentication Verification**

Verify Firebase Auth tokens:

```python
from firebase_admin import auth

def verify_user(req):
    id_token = req.headers.get('Authorization', '').replace('Bearer ', '')
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token['uid']
    except:
        raise https_fn.HttpsError(
            code=https_fn.FunctionsErrorCode.UNAUTHENTICATED,
            message="Invalid authentication token"
        )
```

### **3. Input Validation**

Add validation for user inputs:

```python
def validate_profile_data(data):
    if 'displayName' in data and len(data['displayName']) > 100:
        raise ValueError("Display name too long")
    if 'bio' in data and len(data['bio']) > 500:
        raise ValueError("Bio too long")
    # Add more validation as needed
```

### **4. Rate Limiting**

Consider implementing rate limiting for production:

```python
from firebase_functions.options import set_global_options

set_global_options(
    max_instances=10,
    memory=256,
    timeout_sec=60
)
```

---

## 🐛 Troubleshooting

### **Functions not loading in emulator**

1. Stop emulators: `Ctrl+C`
2. Restart: `firebase emulators:start`
3. Check for Python errors in output
4. Verify `requirements.txt` is installed

### **500 Internal Server Error**

1. Check emulator logs for Python errors
2. Verify Firestore emulator is running
3. Test with `simple_test.py` for detailed errors
4. Check datetime serialization issues

### **CORS errors**

1. Verify CORS headers are set in all responses
2. Check browser console for specific error
3. Test with curl to isolate frontend issues

### **Module not found errors**

```bash
cd python_functions
pip install -r requirements.txt
```

### **Datetime serialization errors**

Ensure all datetime objects are converted to ISO strings before JSON serialization.

---

## � Files in This Directory

- **`main.py`** - Cloud Functions implementation
- **`test_functions.py`** - Automated test suite
- **`requirements.txt`** - Python dependencies
- **`README.md`** - This file

---

## 🎯 Future Enhancements

- [ ] Add authentication middleware
- [ ] Implement rate limiting
- [ ] Add input validation
- [ ] Create additional endpoints (delete profile, upload image)
- [ ] Add email notifications
- [ ] Implement caching
- [ ] Add monitoring and alerts

---

## 📚 Resources

- [Firebase Functions Python Docs](https://firebase.google.com/docs/functions/python)
- [Cloud Firestore Python SDK](https://firebase.google.com/docs/firestore/quickstart)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)

---

**Built with Python 3.11 and Firebase Functions**
