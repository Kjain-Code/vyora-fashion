import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Cart.css';

const initItems = [
  { id:1, name:'Noir Silk Dress', price:8999, size:'M', color:'#1a1a1a', qty:1, img:'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=300&q=80' },
  { id:2, name:'Gold Accent Blazer', price:12499, size:'L', color:'#C9A84C', qty:1, img:'https://images.unsplash.com/photo-1594938298603-c8148c4bef72?w=300&q=80' },
];

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [items, setItems] = useState(initItems);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const updateQty = (id, delta) => setItems(items.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  const removeItem = (id) => setItems(items.filter(i => i.id !== id));
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal > 2000 ? 0 : 199;
  const total = subtotal + shipping - discount;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'VYORA10') setDiscount(Math.round(subtotal * 0.1));
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/dashboard?next=checkout');
      return;
    }

    navigate('/checkout');
  };

  return (
    <div className="cart-page">
      <div className="cart-header">
        <p className="section-eyebrow">YOUR BAG</p>
        <h1 className="cart-title">Shopping <span className="gold-text">Cart</span></h1>
      </div>

      {items.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty</p>
          <Link to="/shop" className="btn-primary">CONTINUE SHOPPING</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.img} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-meta">Size: {item.size}</p>
                  <div className="qty-control">
                    <button onClick={() => updateQty(item.id, -1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, +1)}>+</button>
                  </div>
                </div>
                <div className="cart-item-right">
                  <p className="cart-item-price">₹{(item.price * item.qty).toLocaleString()}</p>
                  <button className="remove-btn" onClick={() => removeItem(item.id)}>✕ REMOVE</button>
                </div>
              </div>
            ))}

            <div className="coupon-row">
              <input className="coupon-input" placeholder="Coupon code (try VYORA10)" value={coupon} onChange={e => setCoupon(e.target.value)} />
              <button className="coupon-btn" onClick={applyCoupon}>APPLY</button>
            </div>
          </div>

          <div className="cart-summary">
            <h3 className="summary-title">ORDER SUMMARY</h3>
            <div className="summary-row"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
            <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
            {discount > 0 && <div className="summary-row gold"><span>Discount</span><span>−₹{discount.toLocaleString()}</span></div>}
            <div className="summary-divider" />
            <div className="summary-row total"><span>TOTAL</span><span>₹{total.toLocaleString()}</span></div>
            <button type="button" className="checkout-btn" onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
            <Link to="/shop" className="continue-btn">CONTINUE SHOPPING</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;