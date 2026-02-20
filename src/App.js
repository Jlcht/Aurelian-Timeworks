import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import { CartProvider } from './CartContext';
import { WishlistProvider } from './WishlistContext';
import Homepage from './pages/Homepage';
import SignUp from './pages/SignUp';
import Products from './pages/Products';
import Dashboard from './Auth/Dashboard';
import AdminDashboard from './Auth/AdminDashboard';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

// Inline PrivateRoute implementation
const PrivateRoute = ({ children }) => {
    const { isLoggedIn, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/signup" replace />;
    }

    return children;
};

// Route user to correct dashboard based on role
const DashboardRouter = () => {
    const { userRole } = useAuth();
    
    // While loading or if no role yet, you might show a spinner, 
    // but PrivateRoute handles main loading. 
    // If we're here, we are logged in.
    
    if (userRole === 'admin') {
        return <AdminDashboard />;
    }
    return <Dashboard />;
};

const App = () => {
    return (
        <CartProvider>
            <AuthProvider>
                <WishlistProvider>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Homepage />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/products" element={<Products />} />
                            <Route
                                path="/dashboard"
                                element={
                                    <PrivateRoute>
                                        <DashboardRouter />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/cart"
                                element={<Cart />}
                            />
                            <Route
                                path="/wishlist"
                                element={
                                    <PrivateRoute>
                                        <Wishlist />
                                    </PrivateRoute>
                                }
                            />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                        </Routes>
                    </Router>
                </WishlistProvider>
            </AuthProvider>
        </CartProvider>
    );
};

export default App;
