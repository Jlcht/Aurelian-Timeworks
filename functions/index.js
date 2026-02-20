// Import 2nd Gen Firebase Functions
const { onRequest } = require("firebase-functions/v2/https");

// Import Firebase Admin SDK
const admin = require("firebase-admin");

// Initialize Firebase Admin
admin.initializeApp();

// Import 1st Gen for auth triggers (2nd Gen auth triggers have limitations)
const functions = require("firebase-functions");

// Auth trigger using 1st Gen syntax (more reliable for auth events)
exports.onUserCreate = functions.auth.user().onCreate(async (user) => {
    try {
        console.log(`New user created: UID=${user.uid}, Email=${user.email}`);

        const profileImages = [
            "https://firebasestorage.googleapis.com/v0/b/backend-app-jl.firebasestorage.app/o/defaultprofilepic%2FMonkey_space_southpark_cartoon.png?alt=media&token=ab9024fb-7ee4-4032-96c4-7e098286cc7c",
            "https://firebasestorage.googleapis.com/v0/b/backend-app-jl.firebasestorage.app/o/defaultprofilepic%2FMonkey_space_onepiece.png?alt=media&token=7d89b200-6997-420e-a25e-95e1f19fddc4"
        ];
        const randomProfileImage = profileImages[Math.floor(Math.random() * profileImages.length)];

        await admin.firestore().collection("users").doc(user.uid).set({
            userProfile: {
                profileImage: randomProfileImage,
                userEmail: user.email,
            },
        }, { merge: true });

    } catch (error) {
        console.error("Error handling new user creation:", error);
    }
});


// ────────────────────────────────────────────────────────────────
// manage_products — Full CRUD for the products collection
//   GET    /manage_products          → list all (public)
//   POST   /manage_products          → create   (admin only)
//   PUT    /manage_products?id=xxx   → update   (admin only)
//   DELETE /manage_products?id=xxx   → delete   (admin only)
// ────────────────────────────────────────────────────────────────
exports.manage_products = onRequest(async (req, res) => {
    // CORS headers — allow requests from any origin (tighten in production if needed)
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Preflight
    if (req.method === "OPTIONS") {
        return res.status(204).send("");
    }

    const db = admin.firestore();

    // Helper: verify the caller is an authenticated admin
    const verifyAdmin = async () => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw Object.assign(new Error("Unauthorized"), { code: 401 });
        }
        const token = authHeader.split("Bearer ")[1];
        const decoded = await admin.auth().verifyIdToken(token);
        const userDoc = await db.collection("users").doc(decoded.uid).get();
        if (!userDoc.exists || userDoc.data().role !== "admin") {
            throw Object.assign(new Error("Forbidden: Admin only"), { code: 403 });
        }
        return decoded;
    };

    try {
        // ── GET ── List all products (public)
        if (req.method === "GET") {
            const snapshot = await db.collection("products").orderBy("createdAt", "desc").get();
            const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return res.json({ success: true, data: products });
        }

        // ── POST ── Create a new product (admin only)
        if (req.method === "POST") {
            await verifyAdmin();
            const { name, description, price, stock, category, images } = req.body;
            if (!name || price == null || stock == null) {
                return res.status(400).json({ success: false, error: "name, price and stock are required" });
            }
            const docRef = await db.collection("products").add({
                name,
                description: description || "",
                price: parseFloat(price),
                stock: parseInt(stock),
                category: category || "",
                images: images || [],
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            });
            const newDoc = await docRef.get();
            return res.status(201).json({ success: true, data: { id: docRef.id, ...newDoc.data() } });
        }

        // ── PUT ── Update existing product (admin only)
        if (req.method === "PUT") {
            await verifyAdmin();
            const id = req.query.id;
            if (!id) return res.status(400).json({ success: false, error: "Query param 'id' is required" });
            const { name, description, price, stock, category, images } = req.body;
            const updateData = {
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            };
            if (name !== undefined) updateData.name = name;
            if (description !== undefined) updateData.description = description;
            if (price !== undefined) updateData.price = parseFloat(price);
            if (stock !== undefined) updateData.stock = parseInt(stock);
            if (category !== undefined) updateData.category = category;
            if (images !== undefined) updateData.images = images;

            await db.collection("products").doc(id).update(updateData);
            const updated = await db.collection("products").doc(id).get();
            return res.json({ success: true, data: { id, ...updated.data() } });
        }

        // ── DELETE ── Remove a product (admin only)
        if (req.method === "DELETE") {
            await verifyAdmin();
            const id = req.query.id;
            if (!id) return res.status(400).json({ success: false, error: "Query param 'id' is required" });
            await db.collection("products").doc(id).delete();
            return res.json({ success: true, message: "Product deleted successfully" });
        }

        return res.status(405).json({ error: "Method not allowed" });

    } catch (error) {
        if (error.code === 401 || error.code === 403) {
            return res.status(error.code).json({ success: false, error: error.message });
        }
        console.error("manage_products error:", error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
});
