import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import './AdminDashboard.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    images: '' // Comma separated for now
  });

  // Firebase Function base URL (switches automatically between dev/prod)
  const FUNC_URL = process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:5001/backend-app-jl/us-central1/manage_products'
    : 'https://us-central1-backend-app-jl.cloudfunctions.net/manage_products';

  // Real-time product list from Firestore
  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      },
      (err) => {
        setError('Failed to fetch products');
        console.error(err);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Get Auth Header (with admin token)
  const getAuthHeader = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error('Not authenticated');
    const token = await user.getIdToken();
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  // Handle Submit (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const headers = await getAuthHeader();
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        images: formData.images ? formData.images.split(',').map(url => url.trim()) : []
      };

      // PUT uses ?id= query param, POST goes to base URL
      const url = editingId ? `${FUNC_URL}?id=${editingId}` : FUNC_URL;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Operation failed');
      }

      // Reset form (Firestore listener will auto-refresh the list)
      setFormData({ name: '', description: '', price: '', stock: '', category: '', images: '' });
      setEditingId(null);
      alert(editingId ? 'Product Updated!' : 'Product Created!');

    } catch (err) {
      alert(`Error:\n${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const headers = await getAuthHeader();
      const res = await fetch(`${FUNC_URL}?id=${id}`, {
        method: 'DELETE',
        headers
      });
      
      const data = await res.json();
      if (!data.success) {
        alert(data.error || 'Delete failed');
      }
      // Firestore listener auto-refreshes the list
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    }
  };

  // Handle Sign Out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  // Handle Edit Click
  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category || '',
      images: product.images ? product.images.join(', ') : ''
    });
    // Scroll to top to see form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && products.length === 0) {
    return (
      <>
        <Header />
        <div className="admin-dashboard-container">
          <div className="admin-dashboard-content">
            <p>Loading products...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="admin-dashboard-container">
        <div className="admin-dashboard-content">
          <h1>
            Admin Dashboard <span className="admin-badge">Admin</span>
            <div className="header-actions">
              <button onClick={handleSignOut} className="signout-btn">Sign Out</button>
            </div>
          </h1>

        {/* Form Section */}
        <div className="admin-form-container">
          <h2>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="admin-form-group">
              <label>Product Name</label>
              <input 
                className="admin-input"
                type="text" name="name" required 
                value={formData.name} onChange={handleChange} 
                placeholder="Ex: Automatic Watch"
              />
            </div>
            
            <div className="admin-form-group">
              <label>Description</label>
              <textarea 
                className="admin-textarea"
                name="description" required 
                value={formData.description} onChange={handleChange}
                placeholder="Product details..."
              />
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem'}}>
                <div className="admin-form-group">
                <label>Price (€)</label>
                <input 
                    className="admin-input"
                    type="number" step="0.01" name="price" required 
                    value={formData.price} onChange={handleChange}
                />
                </div>

                <div className="admin-form-group">
                <label>Stock</label>
                <input 
                    className="admin-input"
                    type="number" name="stock" required 
                    value={formData.stock} onChange={handleChange}
                />
                </div>

                <div className="admin-form-group">
                <label>Category</label>
                <select className="admin-select" name="category" value={formData.category} onChange={handleChange}>
                    <option value="">Select Category</option>
                    <option value="Dive">Dive</option>
                    <option value="Dress">Dress</option>
                    <option value="Chronograph">Chronograph</option>
                    <option value="Sport">Sport</option>
                    <option value="Field">Field</option>
                </select>
                </div>
            </div>

            <div className="admin-form-group">
              <label>Image URLs (comma separated)</label>
              <input 
                className="admin-input"
                type="text" name="images" 
                value={formData.images} onChange={handleChange}
                placeholder="http://img1.jpg, http://img2.jpg"
              />
            </div>

            <button type="submit" className="admin-submit-btn">
              {editingId ? 'Update Product' : 'Create Product'}
            </button>
            
            {editingId && (
              <button 
                type="button" 
                className="admin-cancel-btn"
                onClick={() => {
                  setEditingId(null);
                  setFormData({name: '', description: '', price: '', stock: '', category: '', images: ''});
                }}
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        {/* List Section */}
        <div className="products-list-container">
          <h3>Current Products ({products.length})</h3>
          <table className="products-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>
                    <div style={{fontWeight: 'bold', color: 'var(--color-text)'}}>{product.name}</div>
                    <div style={{fontSize: '0.8rem', color: '#888'}}>{product.id}</div>
                  </td>
                   <td>{product.category || '-'}</td>
                  <td>€{product.price}</td>
                  <td>
                    <span style={{
                        padding: '0.2rem 0.5rem', 
                        background: product.stock > 0 ? '#def7ec' : '#fde8e8',
                        color: product.stock > 0 ? '#03543f' : '#9b1c1c',
                        borderRadius: '10px',
                        fontSize: '0.85rem'
                    }}>
                        {product.stock}
                    </span>
                  </td>
                  <td>
                    <div className="product-actions">
                      <button onClick={() => handleEdit(product)} className="action-btn edit-btn">Edit</button>
                      <button onClick={() => handleDelete(product.id)} className="action-btn delete-btn">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="5" style={{textAlign: 'center', padding: '2rem', color: '#888'}}>
                    No products found. Start adding some!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
