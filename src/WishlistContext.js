import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const WishlistContext = createContext();

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    // Load wishlist from Firestore when user changes
    useEffect(() => {
        const loadWishlist = async () => {
            if (currentUser) {
                try {
                    const wishlistRef = doc(db, 'wishlists', currentUser.uid);
                    const wishlistDoc = await getDoc(wishlistRef);
                    
                    if (wishlistDoc.exists()) {
                        setWishlistItems(wishlistDoc.data().items || []);
                    } else {
                        // Create empty wishlist document
                        await setDoc(wishlistRef, { items: [] });
                        setWishlistItems([]);
                    }
                } catch (error) {
                    console.error('Error loading wishlist:', error);
                    setWishlistItems([]);
                }
            } else {
                // User not logged in, use localStorage
                const savedWishlist = localStorage.getItem('wishlist');
                setWishlistItems(savedWishlist ? JSON.parse(savedWishlist) : []);
            }
            setLoading(false);
        };

        loadWishlist();
    }, [currentUser]);

    // Save to localStorage for non-authenticated users
    useEffect(() => {
        if (!currentUser) {
            localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
        }
    }, [wishlistItems, currentUser]);

    const addToWishlist = async (product) => {
        try {
            if (currentUser) {
                // Save to Firestore
                const wishlistRef = doc(db, 'wishlists', currentUser.uid);
                await updateDoc(wishlistRef, {
                    items: arrayUnion(product)
                });
                setWishlistItems(prev => [...prev, product]);
            } else {
                // Save to state (which triggers localStorage save)
                setWishlistItems(prev => [...prev, product]);
            }
        } catch (error) {
            console.error('Error adding to wishlist:', error);
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            if (currentUser) {
                // Remove from Firestore
                const wishlistRef = doc(db, 'wishlists', currentUser.uid);
                const itemToRemove = wishlistItems.find(item => item.id === productId);
                
                if (itemToRemove) {
                    await updateDoc(wishlistRef, {
                        items: arrayRemove(itemToRemove)
                    });
                }
                setWishlistItems(prev => prev.filter(item => item.id !== productId));
            } else {
                // Remove from state (which triggers localStorage save)
                setWishlistItems(prev => prev.filter(item => item.id !== productId));
            }
        } catch (error) {
            console.error('Error removing from wishlist:', error);
        }
    };

    const toggleWishlist = async (product) => {
        const isInWishlist = wishlistItems.some(item => item.id === product.id);
        
        if (isInWishlist) {
            await removeFromWishlist(product.id);
        } else {
            await addToWishlist(product);
        }
    };

    const isInWishlist = (productId) => {
        return wishlistItems.some(item => item.id === productId);
    };

    const clearWishlist = async () => {
        try {
            if (currentUser) {
                const wishlistRef = doc(db, 'wishlists', currentUser.uid);
                await updateDoc(wishlistRef, { items: [] });
            }
            setWishlistItems([]);
        } catch (error) {
            console.error('Error clearing wishlist:', error);
        }
    };

    const value = {
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        loading
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};

export default WishlistContext;
