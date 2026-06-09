import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, size, color, qty = 1) => {
    const existing = cartItems.find(i => i._id === product._id && i.size === size);
    if (existing) {
      setCartItems(cartItems.map(i =>
        i._id === product._id && i.size === size
          ? { ...i, qty: i.qty + qty }
          : i
      ));
    } else {
      setCartItems([...cartItems, { ...product, size, color, qty }]);
    }
  };

  const removeFromCart = (id, size) => {
    setCartItems(cartItems.filter(i => !(i._id === id && i.size === size)));
  };

  const updateQty = (id, size, qty) => {
    setCartItems(cartItems.map(i =>
      i._id === id && i.size === size ? { ...i, qty } : i
    ));
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);