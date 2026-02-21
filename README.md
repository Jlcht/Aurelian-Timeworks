# Aurelian Timeworks — E-Commerce Web App

A luxury vintage watch e-commerce platform built with React and Firebase.

**Live site:** [https://backend-app-jl.web.app](https://backend-app-jl.web.app)

---

## ✨ Features

- **Product Catalog** — Browsable collection of luxury vintage watches with filter/sidebar
- **Shopping Cart** — Add/remove items, quantity control, order summary
- **Wishlist** — Save favourite watches for later
- **Authentication** — Email/password & Google OAuth sign-in via Firebase Auth
- **User Dashboard** — Edit profile (name, bio, location, avatar)
- **Admin Dashboard** — Manage products and users
- **About & Contact pages** — Brand story, history, mission, contact form
- **Fully Responsive** — Mobile-first design with hamburger navigation

---

## Tech Stack

| Layer           | Technology                                           |
| --------------- | ---------------------------------------------------- |
| **Frontend**    | React, React Router                                  |
| **Styling**     | Vanilla CSS, CSS Variables                           |
| **Database**    | Firebase Firestore                                   |
| **Auth**        | Firebase Authentication (Email + Google OAuth)       |
| **Storage**     | Firebase Storage                                     |
| **Hosting**     | Firebase Hosting                                     |
| **Functions**   | Firebase Cloud Functions (Python — user profile API) |
| **Backend API** | Express.js (local dev / admin tasks)                 |

---

## 📁 Project Structure

```
backend-app/
├── src/
│   ├── pages/              # Homepage, Products, Cart, Wishlist, About, Contact, SignUp
│   ├── components/
│   │   ├── Header/         # Navigation + hamburger menu
│   │   ├── Footer/
│   │   ├── Hero/
│   │   ├── Sidebar/        # Product filters
│   │   └── ProductsContents/
│   ├── Auth/               # Dashboard, AdminDashboard
│   ├── assets/images/      # Product & brand images
│   ├── CartContext.js      # Global cart state
│   ├── WishlistContext.js  # Global wishlist state
│   ├── AuthContext.js      # Firebase auth state
│   └── firebase.js         # Firebase client config
│
├── python_functions/       # Firebase Cloud Functions (Python)
│   └── main.py             # User profile CRUD API
│
├── server/                 # Express.js API (local/admin use)
│   └── src/
│       ├── config/         # Firebase Admin SDK
│       ├── middleware/     # Auth & error handling
│       ├── routes/         # API routes
│       └── controllers/    # Business logic
│
├── functions/              # Firebase Cloud Functions (JS)
├── firebase.json
├── firestore.rules
└── .env                    # Firebase config (never commit)
```

---

## 🚀 Local Development

### Prerequisites

- Node.js v20+
- Firebase CLI (`npm install -g firebase-tools`)

### Install & Run

```bash
# Install frontend dependencies
npm install

# Start React dev server
npm start
# → http://localhost:3000
```

---

## 🚢 Deployment

```bash
# Build production bundle
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

---
