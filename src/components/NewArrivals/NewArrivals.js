import React from 'react';
import { Link } from 'react-router-dom';
import './NewArrivals.css';

const products = [
  { id:1, name:'Noir Silk Dress', price:'₹8,999', tag:'NEW', img:'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?w=500' },
  { id:2, name:'Gold Accent Blazer', price:'₹12,499', tag:'NEW', img:'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?w=500' },
  { id:3, name:'Premium Linen Shirt', price:'₹4,999', tag:'NEW', img:'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?w=500' },
  { id:4, name:'Velvet Evening Gown', price:'₹18,999', tag:'LIMITED', img:'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?w=500' },
];

const NewArrivals = () => (
  <section className="arrivals">
    <div className="section-header">
      <p className="section-eyebrow">JUST IN</p>
      <h2 className="section-title">New <span className="gold-text">Arrivals</span></h2>
    </div>
    <div className="arrivals-grid">
      {products.map(p => (
        <Link to={`/product/${p.id}`} key={p.id} className="product-card">
          <div className="product-img-wrap">
            <img src={p.img} alt={p.name} className="product-img" />
            <span className="product-tag">{p.tag}</span>
            <div className="product-actions">
              <button className="action-btn">♡ WISHLIST</button>
              <button className="action-btn primary">ADD TO CART</button>
            </div>
          </div>
          <div className="product-info">
            <h3 className="product-name">{p.name}</h3>
            <p className="product-price">{p.price}</p>
          </div>
        </Link>
      ))}
    </div>
    <div className="arrivals-cta">
      <Link to="/shop" className="btn-primary">VIEW ALL PRODUCTS</Link>
    </div>
  </section>
);

export default NewArrivals;