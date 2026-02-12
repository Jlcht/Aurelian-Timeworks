// Script to add demo products directly to Firestore
const { db } = require('./src/config/firebase');

const demoProducts = [
  {
    name: "Gaming Laptop",
    description: "High-performance laptop for gaming and work",
    price: 1299.99,
    stock: 15,
    category: "electronics",
    images: ["https://images.unsplash.com/photo-1603302576837-37561b2e2302"],
    createdAt: new Date(),
  },
  {
    name: "Wireless Headphones",
    description: "Premium noise-cancelling headphones",
    price: 249.99,
    stock: 50,
    category: "electronics",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e"],
    createdAt: new Date(),
  },
  {
    name: "Smartphone Pro",
    description: "Latest flagship smartphone with 5G",
    price: 899.99,
    stock: 30,
    category: "electronics",
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"],
    createdAt: new Date(),
  },
  {
    name: "Smart Coffee Maker",
    description: "Programmable coffee maker with app control",
    price: 129.99,
    stock: 25,
    category: "home",
    images: ["https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6"],
    createdAt: new Date(),
  },
  {
    name: "Travel Backpack",
    description: "Durable backpack with laptop compartment",
    price: 79.99,
    stock: 40,
    category: "accessories",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62"],
    createdAt: new Date(),
  },
  {
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with blue switches",
    price: 159.99,
    stock: 35,
    category: "electronics",
    images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3"],
    createdAt: new Date(),
  },
  {
    name: "4K Monitor",
    description: "27-inch 4K UHD monitor with HDR",
    price: 449.99,
    stock: 20,
    category: "electronics",
    images: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf"],
    createdAt: new Date(),
  },
  {
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with precision tracking",
    price: 49.99,
    stock: 60,
    category: "electronics",
    images: ["https://images.unsplash.com/photo-1527814050087-3793815479db"],
    createdAt: new Date(),
  },
];

async function addDemoProducts() {
  try {
    console.log('🚀 Starting to add demo products...\n');
    
    for (const product of demoProducts) {
      const docRef = await db.collection('products').add(product);
      console.log(`✅ Added: ${product.name} (ID: ${docRef.id})`);
    }
    
    console.log('\n🎉 Successfully added all demo products!');
    console.log(`📦 Total products added: ${demoProducts.length}`);
    
    // Verify by fetching all products
    const snapshot = await db.collection('products').get();
    console.log(`\n📊 Total products in database: ${snapshot.size}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding products:', error);
    process.exit(1);
  }
}

addDemoProducts();
