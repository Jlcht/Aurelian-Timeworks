# Python Cloud Functions — User Profile API

Firebase Cloud Functions (Python 3.11) for managing user profiles via Firestore.

**Production URL:** `https://us-central1-backend-app-jl.cloudfunctions.net/manage_user_profile`

---

## Functions

### `manage_user_profile` — HTTP Endpoint

RESTful endpoint for reading and updating user profiles.

**GET** — Fetch a user profile

```bash
curl "https://us-central1-backend-app-jl.cloudfunctions.net/manage_user_profile?userId=abc123"
```

**POST** — Create or update a user profile

```bash
curl -X POST https://us-central1-backend-app-jl.cloudfunctions.net/manage_user_profile \
  -H "Content-Type: application/json" \
  -d '{"userId": "abc123", "profileData": {"userProfile": {"displayName": "John", "bio": "...", "location": "Paris"}}}'
```

### `get_user_stats` — Callable Function

Used by the React Dashboard to retrieve user account statistics.

---

## Firestore Structure

```
users/
  └── {userId}/
      └── userProfile/
          ├── displayName: string
          ├── profileImage: string (URL)
          ├── userEmail: string
          ├── bio: string
          ├── location: string
          └── updatedAt: timestamp
```

---

## Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Start Firebase emulators from project root
firebase emulators:start
```

Local endpoint: `http://127.0.0.1:5001/backend-app-jl/us-central1/manage_user_profile`

---

## Deployment

```bash
# Deploy all Python functions
firebase deploy --only functions:python_functions
```
