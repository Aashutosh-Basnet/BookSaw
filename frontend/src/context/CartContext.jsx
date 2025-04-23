import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartMessage, setCartMessage] = useState('');
  const { user } = useAuth();

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Error parsing stored cart data:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (book) => {
    // Handle null book case (used for unauthenticated users)
    if (!book) {
      setCartMessage('Please log in to add items to your cart');
      return false;
    }
    
    // Check user state directly from localStorage as a backup
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (!user && (!token || !storedUser)) {
      setCartMessage('Please log in to add items to your cart');
      return false;
    }

    setCartItems(prevItems => {
      // Check if the book is already in the cart
      const existingItem = prevItems.find(item => item.id === book.id);
      
      if (existingItem) {
        // Increase quantity if already in cart
        return prevItems.map(item => 
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...book, quantity: 1 }];
      }
    });
    
    setCartMessage('Book added to cart successfully');
    return true;
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const clearMessage = () => {
    setCartMessage('');
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        updateQuantity, 
        removeItem, 
        clearCart,
        cartMessage,
        setCartMessage,
        clearMessage
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext; 